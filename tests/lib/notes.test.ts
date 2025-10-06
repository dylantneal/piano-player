import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNoteFrequency, getNoteByKeyboardKey, PIANO_NOTES, KEYBOARD_TO_NOTE_MAP } from '@/lib/notes';

describe('Notes Library', () => {
  describe('getNoteFrequency', () => {
    it('should return the correct frequency for A4 (no offset)', () => {
      expect(getNoteFrequency(0)).toBeCloseTo(440, 1);
    });

    it('should return the correct frequency for semitone above A4', () => {
      expect(getNoteFrequency(1)).toBeCloseTo(466.16, 1);
    });

    it('should return the correct frequency for semitone below A4', () => {
      expect(getNoteFrequency(-1)).toBeCloseTo(415.30, 1);
    });

    it('should return the correct frequency for an octave above A4', () => {
      expect(getNoteFrequency(12)).toBeCloseTo(880, 1);
    });

    it('should return the correct frequency for an octave below A4', () => {
      expect(getNoteFrequency(-12)).toBeCloseTo(220, 1);
    });
  });

  describe('PIANO_NOTES', () => {
    it('should have the correct number of notes', () => {
      expect(PIANO_NOTES.length).toBeGreaterThan(0);
    });

    it('should have proper note names', () => {
      const noteNames = PIANO_NOTES.map(note => note.name);
      expect(noteNames).toContain('C4');
      expect(noteNames).toContain('A4');
      expect(noteNames).toContain('E5');
    });

    it('should identify black and white keys correctly', () => {
      const blackKeys = PIANO_NOTES.filter(note => note.isBlack);
      const whiteKeys = PIANO_NOTES.filter(note => !note.isBlack);

      expect(blackKeys.length).toBeGreaterThan(0);
      expect(whiteKeys.length).toBeGreaterThan(0);
      expect(blackKeys.every(note => note.name.includes('#'))).toBe(true);
      expect(whiteKeys.every(note => !note.name.includes('#'))).toBe(true);
    });

    it('should have correct keyboard mappings', () => {
      const cNote = PIANO_NOTES.find(note => note.name === 'C4');
      const aNote = PIANO_NOTES.find(note => note.name === 'A4');

      expect(cNote?.keyboardKey).toBe('z');
      expect(aNote?.keyboardKey).toBe('n');
    });
  });

  describe('KEYBOARD_TO_NOTE_MAP', () => {
    it('should be populated with keyboard mappings', () => {
      expect(KEYBOARD_TO_NOTE_MAP.size).toBeGreaterThan(0);
    });

    it('should correctly map keyboard keys to notes', () => {
      expect(KEYBOARD_TO_NOTE_MAP.get('z')?.name).toBe('C4');
      expect(KEYBOARD_TO_NOTE_MAP.get('n')?.name).toBe('A4');
    });
  });

  describe('getNoteByKeyboardKey', () => {
    it('should return the correct note for a valid keyboard key', () => {
      const note = getNoteByKeyboardKey('z');
      expect(note).toBeDefined();
      expect(note?.name).toBe('C4');
      expect(note?.frequency).toBeCloseTo(261.63, 1);
    });

    it('should handle uppercase keys correctly', () => {
      const note = getNoteByKeyboardKey('Z');
      expect(note).toBeDefined();
      expect(note?.name).toBe('C4');
    });

    it('should return undefined for invalid keyboard keys', () => {
      const note = getNoteByKeyboardKey('q');
      expect(note).toBeUndefined();
    });
  });
});