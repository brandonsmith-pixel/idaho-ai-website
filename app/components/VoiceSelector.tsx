"use client";

import { useState } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';

interface Voice {
  id: string;
  name: string;
  provider: 'openai' | '11labs';
  gender: string;
  description: string;
  previewUrl?: string;
  voiceId: string;
}

const AVAILABLE_VOICES: Voice[] = [
  // OpenAI Voices (always available)
  {
    id: 'openai-nova',
    name: 'Nova',
    provider: 'openai',
    voiceId: 'nova',
    gender: 'Female',
    description: 'Friendly and upbeat - great for customer service',
    previewUrl: 'https://cdn.openai.com/API/docs/audio/nova.wav',
  },
  {
    id: 'openai-alloy',
    name: 'Alloy',
    provider: 'openai',
    voiceId: 'alloy',
    gender: 'Neutral',
    description: 'Versatile and balanced - professional tone',
    previewUrl: 'https://cdn.openai.com/API/docs/audio/alloy.wav',
  },
  {
    id: 'openai-echo',
    name: 'Echo',
    provider: 'openai',
    voiceId: 'echo',
    gender: 'Male',
    description: 'Clear and articulate - confident delivery',
    previewUrl: 'https://cdn.openai.com/API/docs/audio/echo.wav',
  },
  {
    id: 'openai-fable',
    name: 'Fable',
    provider: 'openai',
    voiceId: 'fable',
    gender: 'Male',
    description: 'Warm and engaging - storytelling style',
    previewUrl: 'https://cdn.openai.com/API/docs/audio/fable.wav',
  },
  {
    id: 'openai-onyx',
    name: 'Onyx',
    provider: 'openai',
    voiceId: 'onyx',
    gender: 'Male',
    description: 'Deep and authoritative - professional presence',
    previewUrl: 'https://cdn.openai.com/API/docs/audio/onyx.wav',
  },
  {
    id: 'openai-shimmer',
    name: 'Shimmer',
    provider: 'openai',
    voiceId: 'shimmer',
    gender: 'Female',
    description: 'Bright and energetic - enthusiastic tone',
    previewUrl: 'https://cdn.openai.com/API/docs/audio/shimmer.wav',
  },
];

interface VoiceSelectorProps {
  selectedVoice: Voice | null;
  onSelectVoice: (voice: Voice) => void;
}

export default function VoiceSelector({ selectedVoice, onSelectVoice }: VoiceSelectorProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});

  const handlePlayPreview = (voice: Voice) => {
    // Stop any currently playing audio
    Object.values(audioElements).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    if (playingVoice === voice.id) {
      setPlayingVoice(null);
      return;
    }

    // For OpenAI voices, we'll use text-to-speech synthesis
    // In production, you'd call your API to generate preview audio
    // For now, we'll simulate with a notification
    if (voice.provider === 'openai') {
      // Create a simple beep or use Web Speech API
      const utterance = new SpeechSynthesisUtterance(
        `Hi, I'm ${voice.name}. I'll be your AI receptionist. How can I help you today?`
      );
      
      // Try to match the voice characteristics
      if (voice.gender === 'Female') {
        utterance.pitch = 1.2;
        utterance.rate = 1.0;
      } else if (voice.gender === 'Male') {
        utterance.pitch = 0.8;
        utterance.rate = 0.95;
      } else {
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
      }

      setPlayingVoice(voice.id);
      
      utterance.onend = () => {
        setPlayingVoice(null);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Choose Your AI Voice</h3>
        <p className="text-gray-600">
          Click the play button to preview each voice, then select your favorite
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {AVAILABLE_VOICES.map((voice) => (
          <button
            key={voice.id}
            type="button"
            onClick={() => onSelectVoice(voice)}
            className={`relative p-6 rounded-xl border-2 transition text-left ${
              selectedVoice?.id === voice.id
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-gray-300 hover:border-blue-400 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-bold">{voice.name}</h4>
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                    {voice.gender}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{voice.description}</p>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPreview(voice);
                }}
                className={`ml-4 p-3 rounded-full transition ${
                  playingVoice === voice.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                }`}
              >
                {playingVoice === voice.id ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>
            </div>

            {selectedVoice?.id === voice.id && (
              <div className="mt-3 pt-3 border-t border-blue-300">
                <div className="flex items-center gap-2 text-blue-700 font-semibold">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm">Selected for your demo</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedVoice && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 font-semibold">
            ✓ Your demo call will use the <strong>{selectedVoice.name}</strong> voice
          </p>
        </div>
      )}
    </div>
  );
}
