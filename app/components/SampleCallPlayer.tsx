"use client";

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface Message {
  role: 'ai' | 'caller';
  text: string;
  timestamp: number; // When this message should appear (in seconds)
}

interface SampleCallPlayerProps {
  industry: string;
  scenario: string;
  duration: string;
  audioUrl: string;
  transcript: Message[];
}

export default function SampleCallPlayer({ 
  industry, 
  scenario, 
  duration, 
  audioUrl, 
  transcript 
}: SampleCallPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowTranscript(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  // Auto-scroll transcript as messages appear
  useEffect(() => {
    if (transcriptRef.current && showTranscript) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [currentTime, showTranscript]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      setShowTranscript(true);
    }
    setIsPlaying(!isPlaying);
  };

  // Get messages that should be visible at current time
  const visibleMessages = transcript.filter(msg => msg.timestamp <= currentTime);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{industry}</h3>
            <p className="text-gray-600 text-sm">{scenario}</p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Volume2 className="w-4 h-4" />
            {duration}
          </span>
        </div>
      </div>

      {/* Transcript Area */}
      {showTranscript && (
        <div 
          ref={transcriptRef}
          className="h-64 overflow-y-auto p-4 bg-gray-50 space-y-3"
        >
          {visibleMessages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'ai' ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'ai'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Play Button */}
      <div className="p-6">
        <button
          onClick={togglePlay}
          className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            isPlaying
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              Playing...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              {showTranscript ? 'Resume' : 'Play Sample Call'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
