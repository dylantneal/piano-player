import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PianoKey } from '@/components/PianoKey';

vi.mock('@/lib/audio', () => ({
  audioEngine: {
    playNote: vi.fn(),
    stopNote: vi.fn(),
    stopAllNotes: vi.fn()
  }
}));

describe('PianoKey Component', () => {
  const mockNote = {
    name: 'C4',
    frequency: 261.63,
    keyboardKey: 'z',
    isBlack: false
  };

  const defaultProps = {
    note: mockNote,
    isPressed: false,
    onPress: vi.fn(),
    onRelease: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with the note name', () => {
    render(<PianoKey {...defaultProps} />);
    expect(screen.getByText('C4')).toBeInTheDocument();
  });

  it('applies the correct style for white keys', () => {
    const { container } = render(<PianoKey {...defaultProps} />);
    const keyElement = container.firstChild;
    expect(keyElement).toHaveClass('bg-white');
    expect(keyElement).not.toHaveClass('bg-black');
  });

  it('applies the correct style for black keys', () => {
    const blackNote = { ...mockNote, isBlack: true, name: 'C#4' };
    const { container } = render(<PianoKey {...defaultProps} note={blackNote} />);
    const keyElement = container.firstChild;
    expect(keyElement).toHaveClass('bg-black');
    expect(keyElement).not.toHaveClass('bg-white');
  });

  it('applies pressed style when isPressed is true', () => {
    const { container } = render(<PianoKey {...defaultProps} isPressed={true} />);
    const keyElement = container.firstChild;
    expect(keyElement).toHaveClass('translate-y-1');
  });

  it('calls onPress when clicked', () => {
    render(<PianoKey {...defaultProps} />);
    fireEvent.click(screen.getByText('C4'));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('calls onPress on mouseDown and onRelease on mouseUp', () => {
    render(<PianoKey {...defaultProps} />);
    
    const keyElement = screen.getByText('C4');
    
    // Simulate mouse down
    fireEvent.mouseDown(keyElement);
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
    
    // Simulate mouse up
    fireEvent.mouseUp(keyElement);
    expect(defaultProps.onRelease).toHaveBeenCalledTimes(1);
  });

  it('displays the keyboard key if available', () => {
    render(<PianoKey {...defaultProps} />);
    expect(screen.getByText('z')).toBeInTheDocument();
  });

  it('has appropriate ARIA attributes for accessibility', () => {
    render(<PianoKey {...defaultProps} />);
    const keyElement = screen.getByRole('button');
    expect(keyElement).toHaveAttribute('aria-pressed', 'false');
    expect(keyElement).toHaveAttribute('aria-label', 'Piano key C4');
  });

  it('updates aria-pressed when isPressed changes', () => {
    const { rerender } = render(<PianoKey {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    
    rerender(<PianoKey {...defaultProps} isPressed={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});