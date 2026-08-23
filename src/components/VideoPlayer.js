import React, { useState, useEffect, useRef } from 'react';
import HLS from 'hls.js';
import '../styles/VideoPlayer.css';

function VideoPlayer({ channel }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (channel && videoRef.current) {
      loadStream();
    }
  }, [channel]);

  const loadStream = async () => {
    try {
      setError(null);
      const video = videoRef.current;

      // Handle HLS streams
      if (channel.streamUrl.includes('.m3u8')) {
        if (HLS.isSupported()) {
          const hls = new HLS();
          hls.loadSource(channel.streamUrl);
          hls.attachMedia(video);
          hls.on(HLS.Events.MANIFEST_PARSED, () => {
            video.play().catch(err => {
              setError('Autoplay blocked. Click play to start streaming.');
            });
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = channel.streamUrl;
          video.play().catch(err => {
            setError('Autoplay blocked. Click play to start streaming.');
          });
        }
      } else {
        // Handle regular video streams
        video.src = channel.streamUrl;
        video.play().catch(err => {
          setError('Autoplay blocked. Click play to start streaming.');
        });
      }

      setIsPlaying(true);
    } catch (err) {
      setError(`Error loading stream: ${err.message}`);
      console.error('Stream loading error:', err);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="video-player">
      <div className="player-container">
        <video
          ref={videoRef}
          className="video-element"
          controls
          crossOrigin="anonymous"
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="channel-info">
        <img src={channel.logo} alt={channel.name} className="channel-logo" />
        <div className="channel-details">
          <h2>{channel.name}</h2>
          <p className="category">{channel.category}</p>
          <p className="language">Language: {channel.language}</p>
          {channel.requiresSubscription && (
            <span className="badge premium">DStv Required</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
