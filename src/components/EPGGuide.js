import React, { useState, useEffect } from 'react';
import '../styles/EPGGuide.css';

function EPGGuide({ channel }) {
  const [epgData, setEpgData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEPG();
  }, [channel]);

  const loadEPG = async () => {
    try {
      setLoading(true);
      const guide = await window.electron.getEPG(channel.id);
      setEpgData(guide || []);
    } catch (error) {
      console.error('Error loading EPG:', error);
      setEpgData([]);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentProgram = () => {
    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0');
    const currentMinute = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${currentHour}:${currentMinute}`;

    return epgData.find(program => {
      return program.startTime <= currentTime && program.endTime > currentTime;
    });
  };

  const currentProgram = getCurrentProgram();

  return (
    <div className="epg-guide">
      <h3>Programme Guide</h3>
      
      {loading ? (
        <div className="epg-loading">Loading schedule...</div>
      ) : epgData.length > 0 ? (
        <>
          {currentProgram && (
            <div className="current-program">
              <h4>Now Playing</h4>
              <div className="program-card current">
                <div className="program-time">
                  {currentProgram.startTime} - {currentProgram.endTime}
                </div>
                <div className="program-title">{currentProgram.title}</div>
                <div className="program-description">{currentProgram.description}</div>
              </div>
            </div>
          )}

          <div className="upcoming-programs">
            <h4>Upcoming</h4>
            <div className="programs-list">
              {epgData.map((program, index) => (
                <div
                  key={index}
                  className={`program-card ${
                    currentProgram?.id === program.id ? 'hidden' : ''
                  }`}
                >
                  <div className="program-time">
                    {program.startTime} - {program.endTime}
                  </div>
                  <div className="program-title">{program.title}</div>
                  <div className="program-description">{program.description}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="no-epg">No programme guide available for this channel</div>
      )}
    </div>
  );
}

export default EPGGuide;
