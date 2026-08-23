# SA TV App - South African Television Streaming

🇿🇦 A desktop application for streaming South African TV channels including free-to-air and DStv channels.

## Features

✨ **Live Streaming**
- Stream free-to-air channels (SABC 1, SABC 2, SABC 3, eTV)
- Stream DStv channels (Premium, Compact, Sports, News)
- HLS/MPEG-TS streaming support
- High-quality video playback

📺 **Channel Management**
- Browse all available channels
- Organized by category (Free-to-Air, DStv, Premium, Sports, News)
- Channel information and logos
- Search and filter functionality

📅 **Electronic Program Guide (EPG)**
- View current and upcoming programs
- Program descriptions and schedules
- Real-time program information

🎨 **Modern UI**
- Clean, intuitive interface
- Dark theme optimized for TV viewing
- Responsive design
- Fast channel switching

## Tech Stack

- **Frontend**: React 18.2.0
- **Desktop Framework**: Electron 27.0.0
- **Video Player**: HLS.js 1.4.12
- **Styling**: CSS3 with custom themes
- **Build Tool**: Electron Builder

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/mntungwathulasizwezn-ship-it/sa-tv-app.git
cd sa-tv-app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The app will open automatically with the Electron window.

## Development

### Available Scripts

- `npm run dev` - Start development mode with hot reload
- `npm start` - Start Electron app
- `npm run react-start` - Start React development server
- `npm run react-build` - Build React app for production
- `npm run electron-build` - Build Electron application
- `npm run build` - Build production bundle

## Project Structure

```
sa-tv-app/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── components/
│   │   ├── ChannelList.js   # Channel sidebar component
│   │   ├── VideoPlayer.js   # Video player with HLS support
│   │   └── EPGGuide.js      # Electronic Program Guide
│   ├── styles/
│   │   ├── ChannelList.css
│   │   ├── VideoPlayer.css
│   │   └── EPGGuide.css
│   ├── App.js               # Main app component
│   ├── App.css
│   ├── index.js
│   └── index.css
├── main/
│   ├── data/
│   │   ├── channels.json    # Channel configuration
│   │   └── epg.json        # Program guide data
├── main.js                  # Electron main process
├── preload.js               # Electron preload script
└── package.json
```

## Channel Configuration

Channels are defined in `main/data/channels.json`. Each channel has:

```json
{
  "id": "channel_id",
  "name": "Channel Name",
  "category": "Free-to-Air|DStv",
  "logo": "https://...",
  "streamUrl": "https://...",
  "country": "South Africa",
  "language": "English",
  "requiresSubscription": false
}
```

## EPG Configuration

Program guide data is stored in `main/data/epg.json`:

```json
{
  "channel_id": [
    {
      "id": "1",
      "title": "Program Title",
      "startTime": "HH:MM",
      "endTime": "HH:MM",
      "description": "Program description"
    }
  ]
}
```

## Usage

1. Launch the application
2. Browse channels in the left sidebar
3. Click a channel to start streaming
4. View program information in the EPG guide
5. Use the video player controls to play/pause or adjust volume
6. Full-screen mode available in video player

## Streaming Requirements

- Working internet connection
- Stream URLs must be accessible
- For DStv channels, valid authentication required

## Security

- Secure IPC communication between processes
- Context isolation enabled
- No remote module access
- Content Security Policy enabled

## Future Enhancements

- [ ] User authentication for DStv channels
- [ ] Favorite channels management
- [ ] Watch history
- [ ] Notifications for program reminders
- [ ] Multi-language support
- [ ] Recording functionality
- [ ] Mobile app version
- [ ] Cloud sync for settings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please visit the [GitHub Issues](https://github.com/mntungwathulasizwezn-ship-it/sa-tv-app/issues) page.

## Disclaimer

This app is for educational purposes. Users are responsible for ensuring they have proper access rights to stream content. DStv is a subscription service - users must have valid subscriptions to access restricted channels.

---

Made with ❤️ for South African TV lovers
