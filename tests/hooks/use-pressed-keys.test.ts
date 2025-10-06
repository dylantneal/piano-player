import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePressedKeys } from '@/hooks/use-pressed-keys';

describe('usePressedKeys', () => {
  // Setup and cleanup
  let keyDownMap: Record<string, (e: Partial<KeyboardEvent>) => void> = {};
  let keyUpMap: Record<string, (e: Partial<KeyboardEvent>) => void> = {};
  let blurMap: Record<string, () => void> = {};

  beforeEach(() => {
    keyDownMap = {};
    keyUpMap = {};
    blurMap = {};

    // Mock event listeners
    document.addEventListener = vi.fn((event, callback) => {
      if (event === 'keydown') {
        keyDownMap[event] = callback as (e: Partial<KeyboardEvent>) => void;
      }
      if (event === 'keyup') {
        keyUpMap[event] = callback as (e: Partial<KeyboardEvent>) => void;
      }
    });

    document.removeEventListener = vi.fn();

    window.addEventListener = vi.fn((event, callback) => {
      if (event === 'blur') {
        blurMap[event] = callback as () => void;
      }
    });

    window.removeEventListener = vi.fn();
  });

  it('should initialize with an empty set of pressed keys', () => {
    const { result } = renderHook(() => usePressedKeys());
    expect(result.current.size).toBe(0);
  });

  it('should add a key to the set when keydown event is fired', () => {
    const { result } = renderHook(() => usePressedKeys());

    act(() => {
      keyDownMap['keydown']({ key: 'a' });
    });

    expect(result.current.has('a')).toBe(true);
    expect(result.current.size).toBe(1);
  });

  it('should add multiple keys when multiple keydown events are fired', () => {
    const { result } = renderHook(() => usePressedKeys());

    act(() => {
      keyDownMap['keydown']({ key: 'a' });
      keyDownMap['keydown']({ key: 'b' });
    });

    expect(result.current.has('a')).toBe(true);
    expect(result.current.has('b')).toBe(true);
    expect(result.current.size).toBe(2);
  });

  it('should remove a key from the set when keyup event is fired', () => {
    const { result } = renderHook(() => usePressedKeys());

    act(() => {
      keyDownMap['keydown']({ key: 'a' });
      keyDownMap['keydown']({ key: 'b' });
      keyUpMap['keyup']({ key: 'a' });
    });

    expect(result.current.has('a')).toBe(false);
    expect(result.current.has('b')).toBe(true);
    expect(result.current.size).toBe(1);
  });

  it('should convert keys to lowercase', () => {
    const { result } = renderHook(() => usePressedKeys());

    act(() => {
      keyDownMap['keydown']({ key: 'A' });
    });

    expect(result.current.has('a')).toBe(true);
    expect(result.current.has('A')).toBe(false);
  });

  it('should ignore repeated keydown events', () => {
    const { result } = renderHook(() => usePressedKeys());

    act(() => {
      keyDownMap['keydown']({ key: 'a', repeat: true });
    });

    expect(result.current.size).toBe(0);
  });

  it('should clear all keys when window blur event is fired', () => {
    const { result } = renderHook(() => usePressedKeys());

    act(() => {
      keyDownMap['keydown']({ key: 'a' });
      keyDownMap['keydown']({ key: 'b' });
      blurMap['blur']();
    });

    expect(result.current.size).toBe(0);
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => usePressedKeys());
    unmount();

    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
  });
});