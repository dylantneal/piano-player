import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Piano } from '@/components/Piano';

// Mock dependencies
vi.mock('@/lib/audio', () => ({
  audioEngine: {
    playNote: vi.fn(),
    stopNote: vi.fn(),
    stopAllNotes: vi.fn()
  }
}));

vi.mock('@/hooks/use-pressed-keys', () => ({
  usePressedKeys: () => new Set(['z']) // Simulate 'z' key being pressed (maps to C4)
}));

vi.mock('@/lib/notes', () => ({
  PIANO_NOTES: [
    { name: 'C4', frequency: 261.63, keyboardKey: 'z', isBlack: false },
    { name: 'C#4', frequency: 277.18, keyboardKey: 's', isBlack: true },
    { name: 'D4', frequency: 293.66, keyboardKey: 'x', isBlack: false }
  ],
  getNoteByKeyboardKey: (key: string) => {
    if (key === 'z') return { name: 'C4', frequency: 261.63, keyboardKey: 'z', isBlack: false };
    if (key === 's') return { name: 'C#4', frequency: 277.18, keyboardKey: 's', isBlack: true };
    if (key === 'x') return { name: 'D4', frequency: 293.66, keyboardKey: 'x', isBlack: false };
    return undefined;
  }
}));

describe('Piano Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders white and black keys', () => {
    render(<Piano />);
    // Check for white keys
    expect(screen.getByText('C4')).toBeInTheDocument();
    expect(screen.getByText('D4')).toBeInTheDocument();
    
    // Check for black keys
    expect(screen.getByText('C#4')).toBeInTheDocument();
  });

  it('highlights keys that are pressed via keyboard', () => {
    const { container } = render(<Piano />);
    
    // Since we mocked usePressedKeys to return 'z' (C4) as pressed,
    // the C4 key should be highlighted
    const cKey = screen.getByText('C4').closest('div');
    expect(cKey).toHaveAttribute('aria-pressed', 'true');
    
    // Other keys should not be highlighted
    const dKey = screen.getByText('D4').closest('div');
    expect(dKey).toHaveAttribute('aria-pressed', 'false');
  });

  it('plays a note when a key is clicked', () => {
    const { audioEngine } = require('@/lib/audio');
    render(<Piano />);
    
    // Click on the D4 key
    fireEvent.mouseDown(screen.getByText('D4'));
    
    // Check if the audioEngine.playNote was called with the correct frequency
    expect(audioEngine.playNote).toHaveBeenCalledWith(293.66, expect.any(Number));
  });

  it('stops playing a note when a key is released', () => {
    render(<Piano />);
    
    // Press and release the D4 key
    const dKey = screen.getByText('D4');
    fireEvent.mouseDown(dKey);
    fireEvent.mouseUp(dKey);
    
    // The key should no longer be highlighted after release
    expect(dKey.closest('div')).toHaveAttribute('aria-pressed', 'false');
  });

  it('handles multiple keys being pressed simultaneously', () => {
    // Update our mock to simulate multiple keys pressed
    vi.mocked(require('@/hooks/use-pressed-keys')).usePressedKeys = () => new Set(['z', 'x']);
    
    const { audioEngine } = require('@/lib/audio');
    render(<Piano />);
    
    // Both C4 and D4 should be highlighted
    expect(screen.getByText('C4').closest('div')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('D4').closest('div')).toHaveAttribute('aria-pressed', 'true');
    
    // The audio engine should have been called for each note
    expect(audioEngine.playNote).toHaveBeenCalledTimes(2);
  });
});