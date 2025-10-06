# 🎹 Piano Player

An interactive virtual piano that lets you play music using your computer keyboard. This web application maps QWERTY keyboard keys to piano notes, creating an intuitive and responsive musical experience right in your browser.

## 🚀 Features

- **Virtual Piano Keyboard**: A full visual piano interface with standard white and black keys
- **Keyboard Mapping**: Play piano notes using your computer keyboard (QWERTY row for white keys, number row for black keys)
- **Audio Synthesis**: High-quality piano sound generation for authentic musical experience
- **Visual Feedback**: Keys visually respond to being played for intuitive interaction
- **Responsive Design**: Works on various screen sizes and supports both keyboard and mouse/touch input
- **Polyphonic Playback**: Play multiple notes simultaneously for chord creation

## 🛠️ Tech Stack

- **React 19** for the UI components and state management
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for styling and responsive design
- **Vite** for fast development and optimized builds
- **Web Audio API** for high-quality sound synthesis

## 🧑‍💻 Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser to the local server URL (typically http://localhost:5000)

## 🎮 How to Use

1. Click on piano keys with your mouse or use your computer keyboard
2. The QWERTY row of your keyboard maps to white keys (A-L)
3. The number row maps to black keys (1-0)
4. Press multiple keys at once to create chords

## 📋 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally
- `npm run optimize` - Optimize the application assets
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🧪 Testing

The application includes comprehensive unit tests for the core functionality:

### Core Libraries
- **audio.ts**: Tests for the `WebAudioEngine` class, sound presets, and audio manipulation functions
- **notes.ts**: Tests for note frequency calculations, keyboard mapping, and piano note generation

### Hooks
- **use-pressed-keys.ts**: Tests for keyboard event handling, key state management, and cleanup

### Components
- **PianoKey.tsx**: Tests for rendering, styling, interaction events, and accessibility attributes
- **Piano.tsx**: Tests for component rendering, keyboard input, mouse interactions, and audio playback

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.


