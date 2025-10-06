import React, { useState, useEffect } from 'react';
import { PIANO_NOTES, getNoteByKeyboardKey } from '@/lib/notes';
import { audioEngine } from '@/lib/audio';
import { usePressedKeys } from '@/hooks/use-pressed-keys';
import { PianoKey } from './PianoKey';

export function Piano() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const pressedKeys = usePressedKeys();

  useEffect(() => {
    const currentActiveNotes = new Set<string>();

    pressedKeys.forEach(key => {
      const note = getNoteByKeyboardKey(key);
      if (note) {
        currentActiveNotes.add(note.name);
        if (!activeNotes.has(note.name)) {
          audioEngine.playNote(note.frequency, 2.0);
        }
      }
    });

    setActiveNotes(currentActiveNotes);
  }, [pressedKeys]);

  const handleNotePress = (noteName: string, frequency: number) => {
    setActiveNotes(prev => new Set(prev).add(noteName));
    audioEngine.playNote(frequency, 2.0);
  };

  const handleNoteRelease = (noteName: string) => {
    setActiveNotes(prev => {
      const newSet = new Set(prev);
      newSet.delete(noteName);
      return newSet;
    });
  };

  const whiteKeys = PIANO_NOTES.filter(note => !note.isBlack);
  const blackKeys = PIANO_NOTES.filter(note => note.isBlack);

  return (
    <div className="relative">
      <div className="flex gap-0">
        {whiteKeys.map((note) => (
          <PianoKey
            key={note.name}
            note={note}
            isPressed={activeNotes.has(note.name)}
            onPress={() => handleNotePress(note.name, note.frequency)}
            onRelease={() => handleNoteRelease(note.name)}
          />
        ))}
      </div>
      
      <div className="absolute top-0 left-0">
        {blackKeys.map((note) => (
          <PianoKey
            key={note.name}
            note={note}
            isPressed={activeNotes.has(note.name)}
            onPress={() => handleNotePress(note.name, note.frequency)}
            onRelease={() => handleNoteRelease(note.name)}
          />
        ))}
      </div>
    </div>
  );
}