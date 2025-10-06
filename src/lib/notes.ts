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
  { name: 'C4', frequency: getNoteFrequency(-9), keyboardKey: 'a', isBlack: false },
  { name: 'C#4', frequency: getNoteFrequency(-8), keyboardKey: '2', isBlack: true },
  { name: 'D4', frequency: getNoteFrequency(-7), keyboardKey: 's', isBlack: false },
  { name: 'D#4', frequency: getNoteFrequency(-6), keyboardKey: '3', isBlack: true },
  { name: 'E4', frequency: getNoteFrequency(-5), keyboardKey: 'd', isBlack: false },
  { name: 'F4', frequency: getNoteFrequency(-4), keyboardKey: 'f', isBlack: false },
  { name: 'F#4', frequency: getNoteFrequency(-3), keyboardKey: '5', isBlack: true },
  { name: 'G4', frequency: getNoteFrequency(-2), keyboardKey: 'g', isBlack: false },
  { name: 'G#4', frequency: getNoteFrequency(-1), keyboardKey: '6', isBlack: true },
  { name: 'A4', frequency: getNoteFrequency(0), keyboardKey: 'h', isBlack: false },
  { name: 'A#4', frequency: getNoteFrequency(1), keyboardKey: '7', isBlack: true },
  { name: 'B4', frequency: getNoteFrequency(2), keyboardKey: 'j', isBlack: false },
  { name: 'C5', frequency: getNoteFrequency(3), keyboardKey: 'k', isBlack: false },
  { name: 'C#5', frequency: getNoteFrequency(4), keyboardKey: '9', isBlack: true },
  { name: 'D5', frequency: getNoteFrequency(5), keyboardKey: 'l', isBlack: false },
  { name: 'D#5', frequency: getNoteFrequency(6), keyboardKey: '0', isBlack: true },
  { name: 'E5', frequency: getNoteFrequency(7), keyboardKey: ';', isBlack: false },
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