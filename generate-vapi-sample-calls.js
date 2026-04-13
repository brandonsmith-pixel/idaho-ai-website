// Generate sample call recordings using Vapi TTS
// Run with: node generate-vapi-sample-calls.js

const fs = require('fs');
const path = require('path');
const https = require('https');

const VAPI_API_KEY = 'b41635ff-59d9-45aa-8274-c086cfda104d';
const OUTPUT_DIR = path.join(__dirname, 'public', 'audio');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Sample call scripts with voice selections
const calls = [
  {
    name: 'law-firm-consultation',
    messages: [
      { text: "Thank you for calling Thompson and Associates Law Firm. This is Sarah, how may I help you today?", voice: 'jennifer', isAI: true },
      { text: "Hi, I was in a car accident last week and I need to speak with someone about my options.", voice: 'matthew', isAI: false },
      { text: "I'm sorry to hear about your accident. I'd be happy to help you schedule a consultation with one of our personal injury attorneys. Can I get your name please?", voice: 'jennifer', isAI: true },
      { text: "Yes, it's Michael Rodriguez.", voice: 'matthew', isAI: false },
      { text: "Thank you Michael. And what's the best phone number to reach you?", voice: 'jennifer', isAI: true },
      { text: "It's five five five, zero one two three.", voice: 'matthew', isAI: false },
      { text: "Perfect. Our attorneys are available for consultations Monday through Friday. Would you prefer morning or afternoon?", voice: 'jennifer', isAI: true },
      { text: "Afternoon works better for me.", voice: 'matthew', isAI: false },
      { text: "Great. I have Thursday at 2 PM or Friday at 3 PM available. Which works best for you?", voice: 'jennifer', isAI: true },
      { text: "Thursday at 2 PM sounds good.", voice: 'matthew', isAI: false },
      { text: "Excellent. I've scheduled your consultation with Attorney Thompson for this Thursday at 2 PM. You'll receive a confirmation text. Is there anything else I can help you with today?", voice: 'jennifer', isAI: true },
      { text: "No, that's all. Thank you.", voice: 'matthew', isAI: false },
      { text: "You're welcome Michael. We'll see you Thursday. Have a great day.", voice: 'jennifer', isAI: true },
    ]
  },
  {
    name: 'medical-appointment',
    messages: [
      { text: "Good morning, Riverside Family Medicine. This is Emma speaking. How can I assist you?", voice: 'jennifer', isAI: true },
      { text: "Hi, I need to schedule my annual physical.", voice: 'michelle', isAI: false },
      { text: "I'd be happy to help with that. May I have your name and date of birth please?", voice: 'jennifer', isAI: true },
      { text: "Jennifer Park, May 15th, 1985.", voice: 'michelle', isAI: false },
      { text: "Thank you Ms. Park. I see you're an existing patient. Are you experiencing any specific health concerns, or is this just your routine checkup?", voice: 'jennifer', isAI: true },
      { text: "Just routine, but I'd also like to discuss some bloodwork results.", voice: 'michelle', isAI: false },
      { text: "Understood. For a physical with lab review, I recommend scheduling a 30-minute appointment. We have availability next Tuesday at 9 AM or Wednesday at 1:30 PM. Which works better?", voice: 'jennifer', isAI: true },
      { text: "Wednesday at 1:30 works perfectly.", voice: 'michelle', isAI: false },
      { text: "Perfect. I've scheduled you for Wednesday at 1:30 PM with Dr. Martinez. Please arrive 10 minutes early. You'll receive a reminder the day before. Anything else I can help with?", voice: 'jennifer', isAI: true },
      { text: "No, that's everything. Thank you.", voice: 'michelle', isAI: false },
      { text: "You're very welcome, Ms. Park. We'll see you Wednesday. Take care.", voice: 'jennifer', isAI: true },
    ]
  },
  {
    name: 'restaurant-reservation',
    messages: [
      { text: "Thank you for calling Bella Vista Italian Restaurant. This is Tony. How may I help you this evening?", voice: 'andrew', isAI: true },
      { text: "Hi, I'd like to make a reservation for dinner tonight.", voice: 'michelle', isAI: false },
      { text: "Absolutely, I'd be happy to help with that. What time were you thinking?", voice: 'andrew', isAI: true },
      { text: "Around 7 PM if possible.", voice: 'michelle', isAI: false },
      { text: "And how many guests will be joining you?", voice: 'andrew', isAI: true },
      { text: "It'll be four people.", voice: 'michelle', isAI: false },
      { text: "Perfect. We have a table for four available at 7 PM this evening. May I have a name for the reservation?", voice: 'andrew', isAI: true },
      { text: "Yes, it's Anderson.", voice: 'michelle', isAI: false },
      { text: "Wonderful. And a phone number in case we need to reach you?", voice: 'andrew', isAI: true },
      { text: "Five five five, seven eight nine zero.", voice: 'michelle', isAI: false },
      { text: "Perfect. I have you down for a party of four at 7 PM tonight under Ms. Anderson. We're featuring our spring menu with fresh seafood specials. Anything else I can help with?", voice: 'andrew', isAI: true },
      { text: "Actually, do you have outdoor seating available?", voice: 'michelle', isAI: false },
      { text: "We do have a patio, and I can certainly request that for you. It's first-come-first-served, but I'll make a note on your reservation.", voice: 'andrew', isAI: true },
      { text: "That sounds great, thank you.", voice: 'michelle', isAI: false },
      { text: "You're welcome. We look forward to seeing you at 7 PM. Have a wonderful day.", voice: 'andrew', isAI: true },
    ]
  },
  {
    name: 'home-services-hvac',
    messages: [
      { text: "Good afternoon, All Seasons Heating and Cooling. This is Lisa. How can I help you today?", voice: 'jennifer', isAI: true },
      { text: "Hi, my air conditioner isn't working and it's getting really hot in the house.", voice: 'matthew', isAI: false },
      { text: "I'm sorry to hear that. Let me get some information and see how quickly we can get someone out to you. First, what's your address?", voice: 'jennifer', isAI: true },
      { text: "Seven forty two Oak Street.", voice: 'matthew', isAI: false },
      { text: "Thank you. And your name please?", voice: 'jennifer', isAI: true },
      { text: "David Chen.", voice: 'matthew', isAI: false },
      { text: "Thanks Mr. Chen. Can you describe what's happening? Is it making unusual sounds, or just not turning on?", voice: 'jennifer', isAI: true },
      { text: "It's running but not blowing cold air. Just warm air coming out.", voice: 'matthew', isAI: false },
      { text: "That could be a refrigerant issue. We have a technician available this afternoon between 2 and 4 PM, or tomorrow morning. Which works better?", voice: 'jennifer', isAI: true },
      { text: "This afternoon would be great if possible.", voice: 'matthew', isAI: false },
      { text: "Perfect. I'll have Mike out between 2 and 4 PM today. Our service call fee is 89 dollars. Mike will provide a quote before any repairs. What's your phone number?", voice: 'jennifer', isAI: true },
      { text: "Five five five, four five six seven.", voice: 'matthew', isAI: false },
      { text: "Excellent. You'll receive a text 30 minutes before Mike arrives. Anything else I can help with?", voice: 'jennifer', isAI: true },
      { text: "No, that's all. Thank you so much.", voice: 'matthew', isAI: false },
      { text: "You're very welcome, Mr. Chen. Stay cool, and we'll see you this afternoon.", voice: 'jennifer', isAI: true },
    ]
  }
];

// ElevenLabs voice mapping (Vapi uses 11Labs voices)
const voiceIds = {
  'jennifer': '21m00Tcm4TlvDq8ikWAM', // Rachel - professional female
  'matthew': 'yoZ06aMxZJJ28mfd3POQ', // Sam - confident male
  'michelle': 'jsCqWAovK2LkecY7zXl4', // Freya - friendly female
  'andrew': 'onwK4e9ZLuTAKqWW03F9', // Daniel - warm male
};

async function downloadAudio(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function generateSpeech(text, voiceId) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: text,
      voice: {
        provider: '11labs',
        voiceId: voiceId
      }
    });

    const options = {
      hostname: 'api.vapi.ai',
      port: 443,
      path: '/tts',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(body);
          resolve(response.audioUrl);
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function generateCall(call) {
  console.log(`\n📞 Generating: ${call.name}`);
  const tempFiles = [];

  // Generate each message
  for (let i = 0; i < call.messages.length; i++) {
    const msg = call.messages[i];
    const voiceId = voiceIds[msg.voice];
    
    process.stdout.write(`  ${i + 1}/${call.messages.length} `);
    
    try {
      const audioUrl = await generateSpeech(msg.text, voiceId);
      const tempFile = path.join(OUTPUT_DIR, `${call.name}-${i}.mp3`);
      await downloadAudio(audioUrl, tempFile);
      tempFiles.push(tempFile);
      console.log('✓');
    } catch (error) {
      console.error(`✗ Failed: ${error.message}`);
      throw error;
    }
  }

  // Combine all clips using ffmpeg
  console.log(`  Combining ${tempFiles.length} clips...`);
  const listFile = path.join(OUTPUT_DIR, `${call.name}-list.txt`);
  const fileList = tempFiles.map(f => `file '${path.basename(f)}'`).join('\n');
  fs.writeFileSync(listFile, fileList);

  const { execSync } = require('child_process');
  const outputFile = path.join(OUTPUT_DIR, `${call.name}.mp3`);
  
  try {
    execSync(`ffmpeg -f concat -safe 0 -i "${listFile}" -c copy "${outputFile}" -y`, {
      stdio: 'ignore'
    });
    console.log(`  ✓ Created: ${call.name}.mp3`);
  } catch (error) {
    console.error(`  ✗ FFmpeg failed: ${error.message}`);
    throw error;
  }

  // Cleanup
  tempFiles.forEach(f => fs.unlinkSync(f));
  fs.unlinkSync(listFile);
}

async function main() {
  console.log('🎙️  Generating professional sample calls using Vapi/11Labs...\n');
  
  for (const call of calls) {
    try {
      await generateCall(call);
    } catch (error) {
      console.error(`Failed to generate ${call.name}:`, error);
      process.exit(1);
    }
  }

  console.log('\n✅ All sample calls generated successfully!');
  console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
