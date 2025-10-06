import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebAudioEngine, SOUND_PRESETS } from '@/lib/audio';

// Create a mock AudioContext for testing
class MockAudioContext {
  currentTime = 0;
  state = 'running';
  destination = {};

  constructor() {
    // Constructor implementation
  }

  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: vi.fn()
      },
      detune: {
        setValueAtTime: vi.fn()
      },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      addEventListener: vi.fn()
    };
  }

  createGain() {
    return {
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
        value: 0
      },
      connect: vi.fn()
    };
  }

  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
}

// Mock the global AudioContext
vi.stubGlobal('AudioContext', MockAudioContext);

describe('WebAudioEngine', () => {
  let audioEngine: WebAudioEngine;
  
  beforeEach(() => {
    audioEngine = new WebAudioEngine();
    vi.spyOn(window, 'setTimeout');
  });

  describe('constructor', () => {
    it('should initialize with piano preset by default', () => {
      expect(audioEngine.getCurrentPreset().name).toBe('Piano');
    });

    it('should have no active oscillators initially', () => {
      // Using a workaround to test private property
      // @ts-ignore accessing private property for testing
      expect(audioEngine['activeOscillators'].size).toBe(0);
    });
  });

  describe('playNote', () => {
    it('should create oscillator and gain nodes when playing a note', async () => {
      await audioEngine.playNote(440);
      
      // @ts-ignore accessing private property for testing
      const oscillator = audioEngine['activeOscillators'].get(440);
      expect(oscillator).toBeDefined();
    });

    it('should use the preset oscillator type', async () => {
      audioEngine.setPreset('synth');
      await audioEngine.playNote(440);
      
      // @ts-ignore accessing private property for testing
      const oscillator = audioEngine['activeOscillators'].get(440);
      expect(oscillator?.type).toBe('sawtooth');
    });

    it('should apply attack, decay and sustain from preset', async () => {
      await audioEngine.playNote(440);
      
      // @ts-ignore accessing private property for testing
      const gainNode = audioEngine['activeGainNodes'].get(440);
      expect(gainNode?.gain.linearRampToValueAtTime).toHaveBeenCalledTimes(2);
    });
  });

  describe('stopNote', () => {
    it('should stop an active note', async () => {
      await audioEngine.playNote(440);
      audioEngine.stopNote(440);
      
      // @ts-ignore accessing private property for testing
      expect(audioEngine['activeOscillators'].has(440)).toBe(false);
    });

    it('should do nothing if the note is not active', () => {
      audioEngine.stopNote(999);
      // Should not throw any errors
    });
  });

  describe('stopAllNotes', () => {
    it('should stop all active notes', async () => {
      await audioEngine.playNote(440);
      await audioEngine.playNote(880);
      audioEngine.stopAllNotes();
      
      // @ts-ignore accessing private property for testing
      expect(audioEngine['activeOscillators'].size).toBe(0);
      // @ts-ignore accessing private property for testing
      expect(audioEngine['activeGainNodes'].size).toBe(0);
    });
  });

  describe('setPreset', () => {
    it('should change the current preset', () => {
      audioEngine.setPreset('synth');
      expect(audioEngine.getCurrentPreset().name).toBe('Synth');
    });

    it('should keep the current preset if invalid preset key is provided', () => {
      audioEngine.setPreset('piano');
      audioEngine.setPreset('invalid_preset');
      expect(audioEngine.getCurrentPreset().name).toBe('Piano');
    });
  });

  describe('getAvailablePresets', () => {
    it('should return all available preset keys', () => {
      const presets = audioEngine.getAvailablePresets();
      expect(presets).toContain('piano');
      expect(presets).toContain('synth');
      expect(presets).toContain('organ');
    });

    it('should match the number of presets in SOUND_PRESETS', () => {
      const presets = audioEngine.getAvailablePresets();
      expect(presets.length).toBe(Object.keys(SOUND_PRESETS).length);
    });
  });
});