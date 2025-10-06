import React from 'react';
import { Note } from '@/lib/notes';
import { cn } from '@/lib/utils';

interface PianoKeyProps {
  note: Note;
  isPressed: boolean;
  onPress: () => void;
  onRelease: () => void;
}

export function PianoKey({ note, isPressed, onPress, onRelease }: PianoKeyProps) {
  const handleMouseDown = () => {
    onPress();
  };

  const handleMouseUp = () => {
    onRelease();
  };

  const handleMouseLeave = () => {
    onRelease();
  };

  if (note.isBlack) {
    return (
      <button
        className={cn(
          "absolute w-8 h-24 rounded-b-md border border-gray-800 transition-all duration-75 transform-gpu",
          "shadow-lg hover:shadow-xl select-none touch-manipulation",
          "flex flex-col items-center justify-end p-2 text-xs font-medium",
          isPressed
            ? "bg-[var(--color-piano-black-key-active)] scale-95 shadow-md"
            : "bg-[var(--color-piano-black-key)] hover:bg-gray-800"
        )}
        style={{
          left: getBlackKeyPosition(note.name),
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <span className="text-white text-xs font-medium mb-1">
          {note.keyboardKey?.toUpperCase()}
        </span>
      </button>
    );
  }

  return (
    <button
      className={cn(
        "w-12 h-40 rounded-b-md border border-gray-300 transition-all duration-75 transform-gpu",
        "shadow-md hover:shadow-lg select-none touch-manipulation",
        "flex flex-col items-center justify-end p-3 text-sm font-medium",
        isPressed
          ? "bg-[var(--color-piano-white-key-active)] scale-95 shadow-sm"
          : "bg-[var(--color-piano-white-key)] hover:bg-gray-50"
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <span className="text-gray-700 text-sm font-medium">
        {note.keyboardKey?.toUpperCase()}
      </span>
    </button>
  );
}

function getBlackKeyPosition(noteName: string): string {
  const positions: Record<string, string> = {
    'C#4': '2rem',
    'D#4': '6rem',
    'F#4': '14rem',
    'G#4': '18rem',
    'A#4': '22rem',
    'C#5': '30rem',
    'D#5': '34rem',
  };
  return positions[noteName] || '0px';
}