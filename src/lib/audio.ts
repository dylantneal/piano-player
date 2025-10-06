export type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface SoundPreset {
  name: string;
  oscillatorType: OscillatorType;
  attack: number;
  decay: number;
  sustain: number;
  release: number;
  detune?: number;
}

export const SOUND_PRESETS: Record<string, SoundPreset> = {
  'piano': {
    name: 'Piano',
    oscillatorType: 'sine',
    attack: 0.01,
    decay: 0.1,
    sustain: 0.3,
    release: 0.5
  },
  'organ': {
    name: 'Organ',
    oscillatorType: 'sine',
    attack: 0.05,
    decay: 0.2,
    sustain: 0.8,
    release: 0.2
  },
  'synth': {
    name: 'Synth',
    oscillatorType: 'sawtooth',
    attack: 0.02,
    decay: 0.3,
    sustain: 0.5,
    release: 0.8
  },
  'square': {
    name: 'Square Wave',
    oscillatorType: 'square',
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    release: 0.4
  },
  'triangle': {
    name: 'Triangle Wave',
    oscillatorType: 'triangle',
    attack: 0.02,
    decay: 0.1,
    sustain: 0.3,
    release: 0.6
  }
};

export interface AudioEngine {
  playNote: (frequency: number, duration?: number) => void;
  stopAllNotes: () => void;
  setPreset: (presetKey: string) => void;
  getCurrentPreset: () => SoundPreset;
  getAvailablePresets: () => string[];
}

export class WebAudioEngine implements AudioEngine {
  private audioContext: AudioContext | null = null;
  private activeOscillators: Map<number, OscillatorNode> = new Map();
  private activeGainNodes: Map<number, GainNode> = new Map();
  private currentPreset: SoundPreset = SOUND_PRESETS.piano;

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

      // Use the current preset's oscillator type
      oscillator.type = this.currentPreset.oscillatorType;
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      
      // Apply detune if specified in the preset
      if (this.currentPreset.detune) {
        oscillator.detune.setValueAtTime(this.currentPreset.detune, context.currentTime);
      }

      // Apply the envelope from the preset
      const attackTime = this.currentPreset.attack;
      const decayTime = this.currentPreset.decay;
      const sustainLevel = this.currentPreset.sustain;
      const releaseTime = this.currentPreset.release;

      const now = context.currentTime;
      
      // Attack
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(1, now + attackTime);
      
      // Decay to sustain level
      gainNode.gain.linearRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
      
      // Release
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

      oscillator.start(now);
      oscillator.stop(now + duration);

      this.activeOscillators.set(frequency, oscillator);
      this.activeGainNodes.set(frequency, gainNode);

      oscillator.addEventListener('ended', () => {
        this.activeOscillators.delete(frequency);
        this.activeGainNodes.delete(frequency);
      });

    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }
  
  setPreset(presetKey: string): void {
    if (presetKey in SOUND_PRESETS) {
      this.currentPreset = SOUND_PRESETS[presetKey];
      console.log(`Changed sound preset to: ${this.currentPreset.name}`);
    } else {
      console.warn(`Preset "${presetKey}" not found. Using default.`);
    }
  }

  getCurrentPreset(): SoundPreset {
    return this.currentPreset;
  }

  getAvailablePresets(): string[] {
    return Object.keys(SOUND_PRESETS);
  }

  stopNote(frequency: number) {
    const oscillator = this.activeOscillators.get(frequency);
    const gainNode = this.activeGainNodes.get(frequency);
    
    if (oscillator) {
      try {
        // Quick fade out to avoid clicks and pops
        if (gainNode && this.audioContext) {
          const now = this.audioContext.currentTime;
          gainNode.gain.cancelScheduledValues(now);
          gainNode.gain.setValueAtTime(gainNode.gain.value, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
          
          // Stop the oscillator after the fade out
          setTimeout(() => {
            try {
              oscillator.stop();
            } catch (e) {
              // Oscillator might have already stopped
            }
          }, 25);
        } else {
          oscillator.stop();
        }
      } catch (error) {
        // Oscillator might have already stopped
      }
      this.activeOscillators.delete(frequency);
      this.activeGainNodes.delete(frequency);
    }
  }

  stopAllNotes() {
    this.activeOscillators.forEach((oscillator, frequency) => {
      this.stopNote(frequency);
    });
    
    // Cleanup in case any are left
    this.activeOscillators.clear();
    this.activeGainNodes.clear();
  }
}

export const audioEngine = new WebAudioEngine();