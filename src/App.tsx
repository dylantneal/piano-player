import React, { useEffect } from 'react';
import { Piano } from '@/components/Piano';
import { Instructions } from '@/components/Instructions';
import { audioEngine } from '@/lib/audio';

function App() {
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        await audioEngine.playNote(440, 0.01);
      } catch (error) {
        console.log('Audio initialization will happen on first user interaction');
      }
    };

    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      audioEngine.stopAllNotes();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Piano Player
          </h1>
          <p className="text-xl text-muted-foreground">
            Play piano using your computer keyboard
          </p>
        </header>

        <Instructions />

        <div className="flex justify-center">
          <Piano />
        </div>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>
            Press any mapped key or click on the piano keys to start playing.
            Hold keys for sustained notes, press multiple keys for chords.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;