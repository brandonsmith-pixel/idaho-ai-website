// Generate natural-sounding sample calls using ElevenLabs
// Free tier: 10,000 characters/month (plenty for our 4 calls)
// Get your API key at: https://elevenlabs.io (sign up free)

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// PUT YOUR ELEVENLABS API KEY HERE (get free at elevenlabs.io)
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || 'YOUR_API_KEY_HERE';

const OUTPUT_DIR = path.join(__dirname, 'public', 'audio');

// Professional ElevenLabs voices (these are free tier compatible)
const VOICES = {
  sarah: 'EXAVITQu4vr4xnSDxMaL',   // Professional female - perfect for AI receptionist
  eric: 'cjVigY5qzO86Huf0OWal',    // Smooth, trustworthy male
  jessica: 'cgSgspJ2msm6clMCkdW9', // Warm, friendly female  
  brian: 'nPczCjzI2devNBz1zQrb',   // Deep, comforting male
};

const CALLS = [
  {
    name: 'law-firm-consultation',
    messages: [
      { voice: 'sarah', text: 'Thank you for calling Thompson and Associates Law Firm. This is Sarah, how may I help you today?' },
      { voice: 'eric', text: 'Hi, I was in a car accident last week and I need to speak with someone about my options.' },
      { voice: 'sarah', text: 'I\'m sorry to hear about your accident. I\'d be happy to help you schedule a consultation with one of our personal injury attorneys. Can I get your name please?' },
      { voice: 'eric', text: 'Yes, it\'s Michael Rodriguez.' },
      { voice: 'sarah', text: 'Thank you Michael. And what\'s the best phone number to reach you?' },
      { voice: 'eric', text: 'It\'s five five five, zero one two three.' },
      { voice: 'sarah', text: 'Perfect. Our attorneys are available for consultations Monday through Friday. Would you prefer morning or afternoon?' },
      { voice: 'eric', text: 'Afternoon works better for me.' },
      { voice: 'sarah', text: 'Great. I have Thursday at 2 PM or Friday at 3 PM available. Which works best for you?' },
      { voice: 'eric', text: 'Thursday at 2 PM sounds good.' },
      { voice: 'sarah', text: 'Excellent. I\'ve scheduled your consultation with Attorney Thompson for this Thursday at 2 PM. You\'ll receive a confirmation text. Is there anything else I can help you with today?' },
      { voice: 'eric', text: 'No, that\'s all. Thank you.' },
      { voice: 'sarah', text: 'You\'re welcome Michael. We\'ll see you Thursday. Have a great day.' },
    ]
  },
  {
    name: 'medical-appointment',
    messages: [
      { voice: 'sarah', text: 'Good morning, Riverside Family Medicine. This is Emma speaking. How can I assist you?' },
      { voice: 'jessica', text: 'Hi, I need to schedule my annual physical.' },
      { voice: 'sarah', text: 'I\'d be happy to help with that. May I have your name and date of birth please?' },
      { voice: 'jessica', text: 'Jennifer Park, May 15th, 1985.' },
      { voice: 'sarah', text: 'Thank you Ms. Park. I see you\'re an existing patient. Are you experiencing any specific health concerns, or is this just your routine checkup?' },
      { voice: 'jessica', text: 'Just routine, but I\'d also like to discuss some bloodwork results.' },
      { voice: 'sarah', text: 'Understood. For a physical with lab review, I recommend scheduling a 30-minute appointment. We have availability next Tuesday at 9 AM or Wednesday at 1:30 PM. Which works better?' },
      { voice: 'jessica', text: 'Wednesday at 1:30 works perfectly.' },
      { voice: 'sarah', text: 'Perfect. I\'ve scheduled you for Wednesday at 1:30 PM with Dr. Martinez. Please arrive 10 minutes early. You\'ll receive a reminder the day before. Anything else I can help with?' },
      { voice: 'jessica', text: 'No, that\'s everything. Thank you.' },
      { voice: 'sarah', text: 'You\'re very welcome, Ms. Park. We\'ll see you Wednesday. Take care.' },
    ]
  },
  {
    name: 'restaurant-reservation',
    messages: [
      { voice: 'brian', text: 'Thank you for calling Bella Vista Italian Restaurant. This is Tony. How may I help you this evening?' },
      { voice: 'jessica', text: 'Hi, I\'d like to make a reservation for dinner tonight.' },
      { voice: 'brian', text: 'Absolutely, I\'d be happy to help with that. What time were you thinking?' },
      { voice: 'jessica', text: 'Around 7 PM if possible.' },
      { voice: 'brian', text: 'And how many guests will be joining you?' },
      { voice: 'jessica', text: 'It\'ll be four people.' },
      { voice: 'brian', text: 'Perfect. We have a table for four available at 7 PM this evening. May I have a name for the reservation?' },
      { voice: 'jessica', text: 'Yes, it\'s Anderson.' },
      { voice: 'brian', text: 'Wonderful. And a phone number in case we need to reach you?' },
      { voice: 'jessica', text: 'Five five five, seven eight nine zero.' },
      { voice: 'brian', text: 'Perfect. I have you down for a party of four at 7 PM tonight under Ms. Anderson. We\'re featuring our spring menu with fresh seafood specials. Anything else I can help with?' },
      { voice: 'jessica', text: 'Actually, do you have outdoor seating available?' },
      { voice: 'brian', text: 'We do have a patio, and I can certainly request that for you. It\'s first-come-first-served, but I\'ll make a note on your reservation.' },
      { voice: 'jessica', text: 'That sounds great, thank you.' },
      { voice: 'brian', text: 'You\'re welcome. We look forward to seeing you at 7 PM. Have a wonderful day.' },
    ]
  },
  {
    name: 'home-services-hvac',
    messages: [
      { voice: 'sarah', text: 'Good afternoon, All Seasons Heating and Cooling. This is Lisa. How can I help you today?' },
      { voice: 'eric', text: 'Hi, my air conditioner isn\'t working and it\'s getting really hot in the house.' },
      { voice: 'sarah', text: 'I\'m sorry to hear that. Let me get some information and see how quickly we can get someone out to you. First, what\'s your address?' },
      { voice: 'eric', text: 'Seven forty two Oak Street.' },
      { voice: 'sarah', text: 'Thank you. And your name please?' },
      { voice: 'eric', text: 'David Chen.' },
      { voice: 'sarah', text: 'Thanks Mr. Chen. Can you describe what\'s happening? Is it making unusual sounds, or just not turning on?' },
      { voice: 'eric', text: 'It\'s running but not blowing cold air. Just warm air coming out.' },
      { voice: 'sarah', text: 'That could be a refrigerant issue. We have a technician available this afternoon between 2 and 4 PM, or tomorrow morning. Which works better?' },
      { voice: 'eric', text: 'This afternoon would be great if possible.' },
      { voice: 'sarah', text: 'Perfect. I\'ll have Mike out between 2 and 4 PM today. Our service call fee is 89 dollars. Mike will provide a quote before any repairs. What\'s your phone number?' },
      { voice: 'eric', text: 'Five five five, four five six seven.' },
      { voice: 'sarah', text: 'Excellent. You\'ll receive a text 30 minutes before Mike arrives. Anything else I can help with?' },
      { voice: 'eric', text: 'No, that\'s all. Thank you so much.' },
      { voice: 'sarah', text: 'You\'re very welcome, Mr. Chen. Stay cool, and we\'ll see you this afternoon.' },
    ]
  }
];

async function generateSpeech(text, voiceId) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: text,
      model_id: 'eleven_turbo_v2',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    });

    const options = {
      hostname: 'api.elevenlabs.io',
      port: 443,
      path: `/v1/text-to-speech/${voiceId}`,
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(chunks));
        } else {
          reject(new Error(`API returned ${res.statusCode}: ${Buffer.concat(chunks).toString()}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateCall(call) {
  console.log(`\n📞 Generating: ${call.name}`);
  const tempFiles = [];

  for (let i = 0; i < call.messages.length; i++) {
    const msg = call.messages[i];
    const voiceId = VOICES[msg.voice];
    
    process.stdout.write(`  ${i + 1}/${call.messages.length} `);
    
    try {
      const audioBuffer = await generateSpeech(msg.text, voiceId);
      const tempFile = path.join(OUTPUT_DIR, `${call.name}-${i}.mp3`);
      fs.writeFileSync(tempFile, audioBuffer);
      tempFiles.push(tempFile);
      console.log('✓');
      
      // Delay to avoid rate limiting
      await delay(500);
    } catch (error) {
      console.error(`✗ Failed: ${error.message}`);
      if (error.message.includes('401')) {
        console.error('\n❌ Invalid API key! Get yours at: https://elevenlabs.io');
        console.error('   Then set it: export ELEVENLABS_API_KEY=your_key_here');
        process.exit(1);
      }
      throw error;
    }
  }

  // Combine clips
  console.log(`  Combining ${tempFiles.length} clips...`);
  const listFile = path.join(OUTPUT_DIR, `${call.name}-list.txt`);
  const fileList = tempFiles.map(f => `file '${path.basename(f)}'`).join('\n');
  fs.writeFileSync(listFile, fileList);

  try {
    execSync(`ffmpeg -f concat -safe 0 -i "${listFile}" -c copy "${path.join(OUTPUT_DIR, call.name)}.mp3" -y`, {
      stdio: 'ignore'
    });
    console.log(`  ✅ Created: ${call.name}.mp3`);
  } catch (error) {
    console.error(`  ✗ FFmpeg failed`);
    throw error;
  }

  // Cleanup
  tempFiles.forEach(f => fs.unlinkSync(f));
  fs.unlinkSync(listFile);
}

async function main() {
  if (ELEVENLABS_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('❌ Please set your ElevenLabs API key!');
    console.error('');
    console.error('Get a free API key at: https://elevenlabs.io/sign-up');
    console.error('Then run: export ELEVENLABS_API_KEY=your_key_here');
    console.error('Or edit this file and paste it at the top.');
    process.exit(1);
  }

  console.log('🎙️  Generating professional sample calls with ElevenLabs...\n');
  
  for (const call of CALLS) {
    try {
      await generateCall(call);
      await delay(1000); // Extra delay between calls
    } catch (error) {
      console.error(`Failed to generate ${call.name}:`, error.message);
      process.exit(1);
    }
  }

  console.log('\n✅ All sample calls generated successfully!');
  console.log(`📁 Files saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Test the calls at: http://localhost:3000/ai-receptionist#sample-calls');
  console.log('2. Deploy: npm run build && git push && vercel --prod');
}

main().catch(console.error);
