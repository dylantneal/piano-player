import React from 'react';
import { audioEngine, SOUND_PRESETS } from '@/lib/audio';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function SoundSelector() {
  const [currentPreset, setCurrentPreset] = React.useState(() => {
    return audioEngine.getCurrentPreset().name;
  });

  const handlePresetChange = (value: string) => {
    audioEngine.setPreset(value);
    setCurrentPreset(SOUND_PRESETS[value].name);
  };

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="sound-preset">Sound</Label>
      <Select 
        defaultValue="piano" 
        onValueChange={handlePresetChange}
      >
        <SelectTrigger id="sound-preset" className="w-[180px]">
          <SelectValue placeholder="Select a sound" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SOUND_PRESETS).map(([key, preset]) => (
            <SelectItem key={key} value={key}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}