import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// Mock the Web Audio API
class MockAudioContext {
  currentTime = 0;
  state = 'running';
  destination = {};

  constructor() {}

  createOscillator() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: {
        setValueAtTime: vi.fn()
      },
      detune: {
        setValueAtTime: vi.fn()
      },
      type: 'sine',
      addEventListener: vi.fn((event, callback) => {
        if (event === 'ended') {
          // Store callback to call it later if needed
          this._endedCallback = callback;
        }
      }),
      _endedCallback: null
    };
  }

  createGain() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        cancelScheduledValues: vi.fn(),
        value: 0
      }
    };
  }

  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
}

global.AudioContext = MockAudioContext;

// Clean up after each test
afterEach(() => {
  cleanup();
});