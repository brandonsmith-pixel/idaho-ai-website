"use client";

import { useState, useRef } from 'react';
import { Volume2, Play, Pause, Loader2 } from 'lucide-react';
import { Voice } from '../types/voice';

const AVAILABLE_VOICES: Voice[] = [
  {
    id: '11labs-sarah',
    name: 'Sarah',
    provider: '11labs',
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    gender: 'Female',
    description: 'Mature, reassuring, confident - Perfect for professional reception',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/01a3e33c-6e99-4ee7-8543-ff2216a32186.mp3',
  },
  {
    id: '11labs-jessica',
    name: 'Jessica',
    provider: '11labs',
    voiceId: 'cgSgspJ2msm6clMCkdW9',
    gender: 'Female',
    description: 'Playful, bright, warm - Friendly and approachable',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/cgSgspJ2msm6clMCkdW9/56a97bf8-b69b-448f-846c-c3a11683d45a.mp3',
  },
  {
    id: '11labs-alice',
    name: 'Alice',
    provider: '11labs',
    voiceId: 'Xb7hH8MSUJpSbSDYk0k2',
    gender: 'Female',
    description: 'Clear, engaging educator - British accent, professional',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/d10f7534-11f6-41fe-a012-2de1e482d336.mp3',
  },
  {
    id: '11labs-bella',
    name: 'Bella',
    provider: '11labs',
    voiceId: 'hpp4J3VqNfWAUOO0d1Us',
    gender: 'Female',
    description: 'Professional, bright, warm - Polished and engaging',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/hpp4J3VqNfWAUOO0d1Us/dab0f5ba-3aa4-48a8-9fad-f138fea1126d.mp3',
  },
  {
    id: '11labs-matilda',
    name: 'Matilda',
    provider: '11labs',
    voiceId: 'XrExE9yKIg1WjnnlVkGX',
    gender: 'Female',
    description: 'Knowledgeable, professional - Upbeat and competent',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/XrExE9yKIg1WjnnlVkGX/b930e18d-6b4d-466e-bab2-0ae97c6d8535.mp3',
  },
  {
    id: '11labs-eric',
    name: 'Eric',
    provider: '11labs',
    voiceId: 'cjVigY5qzO86Huf0OWal',
    gender: 'Male',
    description: 'Smooth, trustworthy - Perfect for agentic AI use',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/cjVigY5qzO86Huf0OWal/d098fda0-6456-4030-b3d8-63aa048c9070.mp3',
  },
  {
    id: '11labs-brian',
    name: 'Brian',
    provider: '11labs',
    voiceId: 'nPczCjzI2devNBz1zQrb',
    gender: 'Male',
    description: 'Deep, resonant, comforting - Great for narrations',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/nPczCjzI2devNBz1zQrb/2dd3e72c-4fd3-42f1-93ea-abc5d4e5aa1d.mp3',
  },
  {
    id: '11labs-chris',
    name: 'Chris',
    provider: '11labs',
    voiceId: 'iP95p4xoKVk53GoZ742B',
    gender: 'Male',
    description: 'Charming, down-to-earth - Natural and relatable',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/iP95p4xoKVk53GoZ742B/3f4bde72-cc48-40dd-829f-57fbf906f4d7.mp3',
  },
  {
    id: '11labs-george',
    name: 'George',
    provider: '11labs',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    gender: 'Male',
    description: 'Warm, captivating storyteller - British accent',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-4787-aafb-06a6e705cac5.mp3',
  },
  {
    id: '11labs-will',
    name: 'Will',
    provider: '11labs',
    voiceId: 'bIHbv24MWmeRgasZH58o',
    gender: 'Male',
    description: 'Relaxed optimist - Conversational and laid back',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/bIHbv24MWmeRgasZH58o/8caf8f3d-ad29-4980-af41-53f20c72d7a4.mp3',
  },
];

interface VoiceSelectorProps {
  selectedVoice: Voice | null;
  onSelectVoice: (voice: Voice) => void;
}

export default function VoiceSelector({ selectedVoice, onSelectVoice }: VoiceSelectorProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [loadingVoice, setLoadingVoice] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPreview = (voice: Voice) => {
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // If clicking the same voice, just stop
    if (playingVoice === voice.id) {
      setPlayingVoice(null);
      return;
    }

    // Play new audio
    setLoadingVoice(voice.id);
    const audio = new Audio(voice.previewUrl);
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => {
      setLoadingVoice(null);
      setPlayingVoice(voice.id);
      audio.play();
    });

    audio.addEventListener('ended', () => {
      setPlayingVoice(null);
      audioRef.current = null;
    });

    audio.addEventListener('error', () => {
      setLoadingVoice(null);
      setPlayingVoice(null);
      audioRef.current = null;
      alert('Failed to load audio preview. Please try again.');
    });

    audio.load();
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Choose Your AI Voice</h3>
        <p className="text-gray-600">
          Click the play button to hear each voice, then select your favorite
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg mt-3 text-sm">
          <Volume2 className="w-4 h-4" />
          These are professional ElevenLabs voices - the best in the industry!
        </div>
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
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    voice.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                  }`}>
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
                disabled={loadingVoice === voice.id}
                className={`ml-4 p-3 rounded-full transition disabled:opacity-50 ${
                  playingVoice === voice.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                }`}
              >
                {loadingVoice === voice.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : playingVoice === voice.id ? (
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
            ✓ Your demo call will use the <strong>{selectedVoice.name}</strong> voice from ElevenLabs
          </p>
        </div>
      )}
    </div>
  );
}
