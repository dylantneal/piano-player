import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Keyboard, MusicNote, SpeakerHigh } from '@phosphor-icons/react';
import { SoundSelector } from './SoundSelector';
import { Separator } from '@/components/ui/separator';

export function Instructions() {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MusicNote size={24} />
          How to Play
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <SpeakerHigh size={20} className="mt-1 text-primary" />
          <div className="flex-grow">
            <p className="font-medium mb-2">Sound Options</p>
            <SoundSelector />
          </div>
        </div>
        
        <Separator className="my-2" />
        <div className="flex items-start gap-3">
          <Keyboard size={20} className="mt-1 text-primary" />
          <div>
            <p className="font-medium">Keyboard Controls</p>
            <p className="text-sm text-muted-foreground">
              Use your QWERTY keyboard to play piano notes
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-2">White Keys</p>
            <div className="space-y-1 text-muted-foreground">
              <div className="flex justify-between">
                <span>Z</span><span>C4</span>
              </div>
              <div className="flex justify-between">
                <span>X</span><span>D4</span>
              </div>
              <div className="flex justify-between">
                <span>C</span><span>E4</span>
              </div>
              <div className="flex justify-between">
                <span>V</span><span>F4</span>
              </div>
              <div className="flex justify-between">
                <span>B</span><span>G4</span>
              </div>
              <div className="flex justify-between">
                <span>N</span><span>A4</span>
              </div>
              <div className="flex justify-between">
                <span>M</span><span>B4</span>
              </div>
              <div className="flex justify-between">
                <span>,</span><span>C5</span>
              </div>
              <div className="flex justify-between">
                <span>.</span><span>D5</span>
              </div>
              <div className="flex justify-between">
                <span>/</span><span>E5</span>
              </div>
            </div>
          </div>
          
          <div>
            <p className="font-medium mb-2">Black Keys</p>
            <div className="space-y-1 text-muted-foreground">
              <div className="flex justify-between">
                <span>S</span><span>C#4</span>
              </div>
              <div className="flex justify-between">
                <span>D</span><span>D#4</span>
              </div>
              <div className="flex justify-between">
                <span>G</span><span>F#4</span>
              </div>
              <div className="flex justify-between">
                <span>H</span><span>G#4</span>
              </div>
              <div className="flex justify-between">
                <span>J</span><span>A#4</span>
              </div>
              <div className="flex justify-between">
                <span>L</span><span>C#5</span>
              </div>
              <div className="flex justify-between">
                <span>;</span><span>D#5</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Click on piano keys with your mouse or press multiple keyboard keys simultaneously to play chords.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}