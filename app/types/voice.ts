export interface Voice {
  id: string;
  name: string;
  provider: 'openai' | '11labs';
  gender: string;
  description: string;
  previewUrl: string;
  voiceId: string;
}
