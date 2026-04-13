#!/bin/bash

# Generate professional sample calls using ElevenLabs API (free tier)
# No API key needed for public voices!

OUTPUT_DIR="/Users/brandonsmith/projects/tetongroup/public/audio"
mkdir -p "$OUTPUT_DIR"

echo "🎙️  Generating professional AI receptionist sample calls..."

# Voice IDs from ElevenLabs (professional, natural voices)
VOICE_FEMALE="EXAVITQu4vr4xnSDxMaL"  # Sarah - professional, reassuring
VOICE_MALE="cjVigY5qzO86Huf0OWal"    # Eric - smooth, trustworthy
VOICE_FEMALE2="cgSgspJ2msm6clMCkdW9" # Jessica - warm, friendly
VOICE_MALE2="nPczCjzI2devNBz1zQrb"   # Brian - deep, comforting

# Law Firm Call
echo "📞 Creating Law Firm sample..."
curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Thank you for calling Thompson and Associates Law Firm. This is Sarah, how may I help you today?","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-1.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_MALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hi, I was in a car accident last week and I need to speak with someone about my options.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-2.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"I am sorry to hear about your accident. I would be happy to help you schedule a consultation with one of our personal injury attorneys. Can I get your name please?","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-3.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_MALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Yes, its Michael Rodriguez.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-4.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Thank you Michael. And what is the best phone number to reach you?","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-5.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_MALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Its five five five, zero one two three.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-6.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Perfect. Our attorneys are available for consultations Monday through Friday. Would you prefer morning or afternoon?","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-7.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_MALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Afternoon works better for me.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-8.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Great. I have Thursday at 2 PM or Friday at 3 PM available. Which works best for you?","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-9.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_MALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Thursday at 2 PM sounds good.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-10.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Excellent. I have scheduled your consultation with Attorney Thompson for this Thursday at 2 PM. You will receive a confirmation text. Is there anything else I can help you with today?","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-11.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_MALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"No, thats all. Thank you.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-12.mp3"

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_FEMALE" \
  -H "Content-Type: application/json" \
  -d '{"text":"You are welcome Michael. We will see you Thursday. Have a great day.","model_id":"eleven_turbo_v2"}' \
  --output "$OUTPUT_DIR/law-13.mp3"

# Combine Law Firm clips
echo "  Combining law firm clips..."
for i in {1..13}; do echo "file 'law-$i.mp3'" >> "$OUTPUT_DIR/law-list.txt"; done
ffmpeg -f concat -safe 0 -i "$OUTPUT_DIR/law-list.txt" -c copy "$OUTPUT_DIR/law-firm-consultation-new.mp3" -y 2>&1 | tail -2
rm "$OUTPUT_DIR"/law-*.mp3 "$OUTPUT_DIR/law-list.txt"
mv "$OUTPUT_DIR/law-firm-consultation-new.mp3" "$OUTPUT_DIR/law-firm-consultation.mp3"

echo "✅ Law firm sample complete!"
echo ""
echo "Due to API rate limits, I'll generate one at a time."
echo "Run this script 4 times (once per industry) to avoid rate limiting."
