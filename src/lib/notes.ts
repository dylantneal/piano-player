export interface Note {
  name: string;
  frequency: number;
  keyboardKey?: string;
  isBlack: boolean;
}

const A4_FREQUENCY = 440;

export function getNoteFrequency(semitoneOffset: number): number {
  return A4_FREQUENCY * Math.pow(2, semitoneOffset / 12);
}

export const PIANO_NOTES: Note[] = [
  // Starting from C4 (middle C) - proper chromatic scale
  { name: 'C4', frequency: getNoteFrequency(-9), keyboardKey: 'z', isBlack: false },
  { name: 'C#4', frequency: getNoteFrequency(-8), keyboardKey: 's', isBlack: true },
  { name: 'D4', frequency: getNoteFrequency(-7), keyboardKey: 'x', isBlack: false },
  { name: 'D#4', frequency: getNoteFrequency(-6), keyboardKey: 'd', isBlack: true },
  { name: 'E4', frequency: getNoteFrequency(-5), keyboardKey: 'c', isBlack: false },
  { name: 'F4', frequency: getNoteFrequency(-4), keyboardKey: 'v', isBlack: false },
  { name: 'F#4', frequency: getNoteFrequency(-3), keyboardKey: 'g', isBlack: true },
  { name: 'G4', frequency: getNoteFrequency(-2), keyboardKey: 'b', isBlack: false },
  { name: 'G#4', frequency: getNoteFrequency(-1), keyboardKey: 'h', isBlack: true },
  { name: 'A4', frequency: getNoteFrequency(0), keyboardKey: 'n', isBlack: false },
  { name: 'A#4', frequency: getNoteFrequency(1), keyboardKey: 'j', isBlack: true },
  { name: 'B4', frequency: getNoteFrequency(2), keyboardKey: 'm', isBlack: false },
  { name: 'C5', frequency: getNoteFrequency(3), keyboardKey: ',', isBlack: false },
  { name: 'C#5', frequency: getNoteFrequency(4), keyboardKey: 'l', isBlack: true },
  { name: 'D5', frequency: getNoteFrequency(5), keyboardKey: '.', isBlack: false },
  { name: 'D#5', frequency: getNoteFrequency(6), keyboardKey: ';', isBlack: true },
  { name: 'E5', frequency: getNoteFrequency(7), keyboardKey: '/', isBlack: false },
];

export const KEYBOARD_TO_NOTE_MAP = new Map<string, Note>();
PIANO_NOTES.forEach(note => {
  if (note.keyboardKey) {
    KEYBOARD_TO_NOTE_MAP.set(note.keyboardKey.toLowerCase(), note);
  }
});

export function getNoteByKeyboardKey(key: string): Note | undefined {
  return KEYBOARD_TO_NOTE_MAP.get(key.toLowerCase());
}