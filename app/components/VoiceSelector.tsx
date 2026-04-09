"use client";

import { useState, useRef } from 'react';
import { Volume2, Play, Pause, Loader2, Mic, Upload } from 'lucide-react';
import { Voice } from '../types/voice';

const AVAILABLE_VOICES: Voice[] = [
  // Female Voices - Professional
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
    id: '11labs-alice',
    name: 'Alice',
    provider: '11labs',
    voiceId: 'Xb7hH8MSUJpSbSDYk0k2',
    gender: 'Female',
    description: 'Clear, engaging educator - British accent, professional',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/d10f7534-11f6-41fe-a012-2de1e482d336.mp3',
  },
  {
    id: '11labs-lily',
    name: 'Lily',
    provider: '11labs',
    voiceId: 'pFZP5JQG7iQjIQuC4Bku',
    gender: 'Female',
    description: 'Velvety British actress - Warm and clear',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/pFZP5JQG7iQjIQuC4Bku/89b68b35-b3dd-4348-a84a-a3c13a3c2b30.mp3',
  },
  
  // Female Voices - Friendly
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
    id: '11labs-laura',
    name: 'Laura',
    provider: '11labs',
    voiceId: 'FGY2WhTYpPnrIDTdsKH5',
    gender: 'Female',
    description: 'Enthusiastic, quirky attitude - Sunny and energetic',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/FGY2WhTYpPnrIDTdsKH5/67341759-ad08-41a5-be6e-de12fe448618.mp3',
  },
  
  // Male Voices - Professional
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
    id: '11labs-george',
    name: 'George',
    provider: '11labs',
    voiceId: 'JBFqnCBsd6RMkjVDRZzb',
    gender: 'Male',
    description: 'Warm, captivating storyteller - British accent',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-4787-aafb-06a6e705cac5.mp3',
  },
  {
    id: '11labs-daniel',
    name: 'Daniel',
    provider: '11labs',
    voiceId: 'onwK4e9ZLuTAKqWW03F9',
    gender: 'Male',
    description: 'Steady broadcaster - Strong and professional',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/onwK4e9ZLuTAKqWW03F9/7eee0236-1a72-4b86-b303-5dcadc007ba9.mp3',
  },
  {
    id: '11labs-bill',
    name: 'Bill',
    provider: '11labs',
    voiceId: 'pqHfZKP75CvOlQylNhV4',
    gender: 'Male',
    description: 'Wise, mature, balanced - Friendly and comforting',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/pqHfZKP75CvOlQylNhV4/d782b3ff-84ba-4029-848c-acf01285524d.mp3',
  },
  
  // Male Voices - Casual
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
    id: '11labs-will',
    name: 'Will',
    provider: '11labs',
    voiceId: 'bIHbv24MWmeRgasZH58o',
    gender: 'Male',
    description: 'Relaxed optimist - Conversational and laid back',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/bIHbv24MWmeRgasZH58o/8caf8f3d-ad29-4980-af41-53f20c72d7a4.mp3',
  },
  {
    id: '11labs-liam',
    name: 'Liam',
    provider: '11labs',
    voiceId: 'TX3LPaxmHKxFdv7VOQHJ',
    gender: 'Male',
    description: 'Energetic, social media creator - Young and confident',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/TX3LPaxmHKxFdv7VOQHJ/63148076-6363-42db-aea8-31424308b92c.mp3',
  },
  {
    id: '11labs-charlie',
    name: 'Charlie',
    provider: '11labs',
    voiceId: 'IKne3meq5aSn9XLyUdCD',
    gender: 'Male',
    description: 'Deep, confident, energetic - Australian accent',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/IKne3meq5aSn9XLyUdCD/102de6f2-22ed-43e0-a1f1-111fa75c5481.mp3',
  },
  {
    id: '11labs-roger',
    name: 'Roger',
    provider: '11labs',
    voiceId: 'CwhRBWXzGAHq8TQ4Fs17',
    gender: 'Male',
    description: 'Laid-back, casual, resonant - Easy going',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/CwhRBWXzGAHq8TQ4Fs17/58ee3ff5-f6f2-4628-93b8-e38eb31806b0.mp3',
  },
  
  // Neutral
  {
    id: '11labs-river',
    name: 'River',
    provider: '11labs',
    voiceId: 'SAz9YHcvj6GT2YYXdXww',
    gender: 'Neutral',
    description: 'Relaxed, neutral, informative - Calm and versatile',
    previewUrl: 'https://storage.googleapis.com/eleven-public-prod/premade/voices/SAz9YHcvj6GT2YYXdXww/e6c95f0b-2227-491a-b3d7-2249240decb7.mp3',
  },
];

interface VoiceSelectorProps {
  selectedVoice: Voice | null;
  onSelectVoice: (voice: Voice) => void;
  onVoiceClone?: (audioFile: File) => void;
}

export default function VoiceSelector({ selectedVoice, onSelectVoice, onVoiceClone }: VoiceSelectorProps) {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [loadingVoice, setLoadingVoice] = useState<string | null>(null);
  const [showCloneOption, setShowCloneOption] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePlayPreview = (voice: Voice) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingVoice === voice.id) {
      setPlayingVoice(null);
      return;
    }

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onVoiceClone) {
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        alert('Please upload an audio file (MP3, WAV, etc.)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Audio file must be less than 10MB');
        return;
      }

      onVoiceClone(file);
      setShowCloneOption(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Choose Your AI Voice</h3>
        <p className="text-gray-600">
          Select from 18 professional voices or clone your own
        </p>
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-lg mt-3 text-sm">
          <Volume2 className="w-4 h-4" />
          ElevenLabs professional voices - the best in the industry!
        </div>
      </div>

      {/* Voice Clone Option */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-600 rounded-xl">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">Clone Your Own Voice</h4>
            <p className="text-gray-700 mb-4">
              Want to use YOUR voice as the AI receptionist? Upload a 30-second audio sample and we'll clone it instantly!
            </p>
            <button
              type="button"
              onClick={() => setShowCloneOption(!showCloneOption)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              {showCloneOption ? 'Cancel' : 'Upload Voice Sample'}
            </button>
            
            {showCloneOption && (
              <div className="mt-4 p-4 bg-white rounded-xl border-2 border-purple-200">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Tips for best results:</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 mb-4 list-disc list-inside">
                  <li>Record 30-60 seconds of clear speech</li>
                  <li>Use a quiet environment</li>
                  <li>Speak naturally and clearly</li>
                  <li>MP3 or WAV format, max 10MB</li>
                </ul>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">OR choose from our professional voices below</div>

      {/* Professional Voices Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {AVAILABLE_VOICES.map((voice) => (
          <button
            key={voice.id}
            type="button"
            onClick={() => onSelectVoice(voice)}
            className={`relative p-4 rounded-xl border-2 transition text-left ${
              selectedVoice?.id === voice.id
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-gray-300 hover:border-blue-400 bg-white'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold">{voice.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    voice.gender === 'Female' ? 'bg-pink-100 text-pink-800' : 
                    voice.gender === 'Male' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {voice.gender}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{voice.description}</p>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPreview(voice);
                }}
                disabled={loadingVoice === voice.id}
                className={`ml-2 p-2 rounded-full transition disabled:opacity-50 flex-shrink-0 ${
                  playingVoice === voice.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-blue-100 text-gray-700'
                }`}
              >
                {loadingVoice === voice.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : playingVoice === voice.id ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
            </div>

            {selectedVoice?.id === voice.id && (
              <div className="mt-2 pt-2 border-t border-blue-300">
                <div className="flex items-center gap-1 text-blue-700 font-semibold text-xs">
                  <Volume2 className="w-3 h-3" />
                  <span>Selected</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedVoice && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-800 font-semibold">
            ✓ Demo will use <strong>{selectedVoice.name}</strong> voice
          </p>
        </div>
      )}
    </div>
  );
}
