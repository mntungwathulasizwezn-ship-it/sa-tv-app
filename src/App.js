import React, { useState, useEffect } from 'react';
import './App.css';
import ChannelList from './components/ChannelList';
import VideoPlayer from './components/VideoPlayer';
import EPGGuide from './components/EPGGuide';

function App() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChannels();
  }, []);

  const loadChannels = async () => {
    try {
      setLoading(true);
      const channelData = await window.electron.getChannels();
      setChannels(channelData);
      if (channelData.length > 0) {
        setSelectedChannel(channelData[0]);
      }
    } catch (error) {
      console.error('Error loading channels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  if (loading) {
    return (
      <div className="app loading">
        <div className="spinner">Loading SA TV App...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🇿🇦 SA TV App - Live Streaming</h1>
        <p>Free-to-Air & DStv Channels</p>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <ChannelList 
            channels={channels} 
            selectedChannel={selectedChannel}
            onChannelSelect={handleChannelSelect}
          />
        </aside>

        <main className="main-content">
          {selectedChannel ? (
            <>
              <VideoPlayer channel={selectedChannel} />
              <EPGGuide channel={selectedChannel} />
            </>
          ) : (
            <div className="no-channel">Select a channel to start watching</div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
