export interface AudioEngine {
  playNote: (frequency: number, duration?: number) => void;
  stopAllNotes: () => void;
}

export class WebAudioEngine implements AudioEngine {
  private audioContext: AudioContext | null = null;
  private activeOscillators: Map<number, OscillatorNode> = new Map();

  private async ensureAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
    }
    return this.audioContext;
  }

  async playNote(frequency: number, duration: number = 0.5) {
    try {
      const context = await this.ensureAudioContext();
      
      this.stopNote(frequency);

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);

      gainNode.gain.setValueAtTime(0, context.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);

      this.activeOscillators.set(frequency, oscillator);

      oscillator.addEventListener('ended', () => {
        this.activeOscillators.delete(frequency);
      });

    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  stopNote(frequency: number) {
    const oscillator = this.activeOscillators.get(frequency);
    if (oscillator) {
      try {
        oscillator.stop();
      } catch (error) {
        
      }
      this.activeOscillators.delete(frequency);
    }
  }

  stopAllNotes() {
    this.activeOscillators.forEach((oscillator, frequency) => {
      try {
        oscillator.stop();
      } catch (error) {
        
      }
    });
    this.activeOscillators.clear();
  }
}

export const audioEngine = new WebAudioEngine();