import React from 'react';
import '../styles/ChannelList.css';

function ChannelList({ channels, selectedChannel, onChannelSelect }) {
  const categorizeChannels = () => {
    const categorized = {
      'Free-to-Air': [],
      'DStv': [],
      'DStv Premium': [],
      'DStv Sports': [],
      'DStv News': [],
    };

    channels.forEach(channel => {
      if (categorized[channel.category]) {
        categorized[channel.category].push(channel);
      }
    });

    return categorized;
  };

  const categorized = categorizeChannels();

  return (
    <div className="channel-list">
      <div className="list-header">
        <h2>Channels</h2>
        <span className="channel-count">{channels.length}</span>
      </div>

      {Object.entries(categorized).map(([category, categoryChannels]) =>
        categoryChannels.length > 0 ? (
          <div key={category} className="channel-category">
            <h3 className="category-title">{category}</h3>
            <ul className="channels">
              {categoryChannels.map(channel => (
                <li
                  key={channel.id}
                  className={`channel-item ${
                    selectedChannel?.id === channel.id ? 'active' : ''
                  }`}
                  onClick={() => onChannelSelect(channel)}
                >
                  <div className="channel-logo-small">
                    <img src={channel.logo} alt={channel.name} />
                  </div>
                  <div className="channel-info-small">
                    <span className="channel-name">{channel.name}</span>
                    {channel.requiresSubscription && (
                      <span className="badge-small">Premium</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      )}
    </div>
  );
}

export default ChannelList;
