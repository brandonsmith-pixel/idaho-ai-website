#!/bin/bash

# Generate sample call recordings for AI Receptionist demo
# Uses macOS text-to-speech with different voices

OUTPUT_DIR="/Users/brandonsmith/projects/tetongroup/public/audio"
mkdir -p "$OUTPUT_DIR"

echo "🎙️  Generating sample call recordings..."

# Call 1: Law Firm
echo "📞 Creating Law Firm sample call..."

say -v Samantha -r 160 "Thank you for calling Thompson and Associates Law Firm. This is Sarah, how may I help you today?" -o "$OUTPUT_DIR/law-1.aiff"
say -v Daniel -r 165 "Hi, I was in a car accident last week and I need to speak with someone about my options." -o "$OUTPUT_DIR/law-2.aiff"
say -v Samantha -r 160 "I'm sorry to hear about your accident. I'd be happy to help you schedule a consultation with one of our personal injury attorneys. Can I get your name please?" -o "$OUTPUT_DIR/law-3.aiff"
say -v Daniel -r 165 "Yes, it's Michael Rodriguez." -o "$OUTPUT_DIR/law-4.aiff"
say -v Samantha -r 160 "Thank you Michael. And what's the best phone number to reach you?" -o "$OUTPUT_DIR/law-5.aiff"
say -v Daniel -r 165 "It's 555-0123." -o "$OUTPUT_DIR/law-6.aiff"
say -v Samantha -r 160 "Perfect. Our attorneys are available for consultations Monday through Friday. Would you prefer morning or afternoon?" -o "$OUTPUT_DIR/law-7.aiff"
say -v Daniel -r 165 "Afternoon works better for me." -o "$OUTPUT_DIR/law-8.aiff"
say -v Samantha -r 160 "Great. I have Thursday at 2 PM or Friday at 3 PM available. Which works best for you?" -o "$OUTPUT_DIR/law-9.aiff"
say -v Daniel -r 165 "Thursday at 2 PM sounds good." -o "$OUTPUT_DIR/law-10.aiff"
say -v Samantha -r 160 "Excellent. I've scheduled your consultation with Attorney Thompson for this Thursday at 2 PM. You'll receive a confirmation text. Is there anything else I can help you with today?" -o "$OUTPUT_DIR/law-11.aiff"
say -v Daniel -r 165 "No, that's all. Thank you." -o "$OUTPUT_DIR/law-12.aiff"
say -v Samantha -r 160 "You're welcome Michael. We'll see you Thursday. Have a great day." -o "$OUTPUT_DIR/law-13.aiff"

# Call 2: Medical Practice
echo "📞 Creating Medical Practice sample call..."

say -v Samantha -r 160 "Good morning, Riverside Family Medicine. This is Emma speaking. How can I assist you?" -o "$OUTPUT_DIR/medical-1.aiff"
say -v Karen -r 165 "Hi, I need to schedule my annual physical." -o "$OUTPUT_DIR/medical-2.aiff"
say -v Samantha -r 160 "I'd be happy to help with that. May I have your name and date of birth please?" -o "$OUTPUT_DIR/medical-3.aiff"
say -v Karen -r 165 "Jennifer Park, May 15th, 1985." -o "$OUTPUT_DIR/medical-4.aiff"
say -v Samantha -r 160 "Thank you Ms. Park. I see you're an existing patient. Are you experiencing any specific health concerns, or is this just your routine checkup?" -o "$OUTPUT_DIR/medical-5.aiff"
say -v Karen -r 165 "Just routine, but I'd also like to discuss some bloodwork results." -o "$OUTPUT_DIR/medical-6.aiff"
say -v Samantha -r 160 "Understood. For a physical with lab review, I recommend scheduling a 30-minute appointment. We have availability next Tuesday at 9 AM or Wednesday at 1:30 PM. Which works better?" -o "$OUTPUT_DIR/medical-7.aiff"
say -v Karen -r 165 "Wednesday at 1:30 works perfectly." -o "$OUTPUT_DIR/medical-8.aiff"
say -v Samantha -r 160 "Perfect. I've scheduled you for Wednesday at 1:30 PM with Dr. Martinez. Please arrive 10 minutes early. You'll receive a reminder the day before. Anything else I can help with?" -o "$OUTPUT_DIR/medical-9.aiff"
say -v Karen -r 165 "No, that's everything. Thank you." -o "$OUTPUT_DIR/medical-10.aiff"
say -v Samantha -r 160 "You're very welcome, Ms. Park. We'll see you Wednesday. Take care." -o "$OUTPUT_DIR/medical-11.aiff"

# Call 3: Restaurant
echo "📞 Creating Restaurant sample call..."

say -v Alex -r 165 "Thank you for calling Bella Vista Italian Restaurant. This is Tony. How may I help you this evening?" -o "$OUTPUT_DIR/restaurant-1.aiff"
say -v Karen -r 165 "Hi, I'd like to make a reservation for dinner tonight." -o "$OUTPUT_DIR/restaurant-2.aiff"
say -v Alex -r 165 "Absolutely, I'd be happy to help with that. What time were you thinking?" -o "$OUTPUT_DIR/restaurant-3.aiff"
say -v Karen -r 165 "Around 7 PM if possible." -o "$OUTPUT_DIR/restaurant-4.aiff"
say -v Alex -r 165 "And how many guests will be joining you?" -o "$OUTPUT_DIR/restaurant-5.aiff"
say -v Karen -r 165 "It'll be four people." -o "$OUTPUT_DIR/restaurant-6.aiff"
say -v Alex -r 165 "Perfect. We have a table for four available at 7 PM this evening. May I have a name for the reservation?" -o "$OUTPUT_DIR/restaurant-7.aiff"
say -v Karen -r 165 "Yes, it's Anderson." -o "$OUTPUT_DIR/restaurant-8.aiff"
say -v Alex -r 165 "Wonderful. And a phone number in case we need to reach you?" -o "$OUTPUT_DIR/restaurant-9.aiff"
say -v Karen -r 165 "555-7890." -o "$OUTPUT_DIR/restaurant-10.aiff"
say -v Alex -r 165 "Perfect. I have you down for a party of four at 7 PM tonight under Ms. Anderson. We're featuring our spring menu with fresh seafood specials. Anything else I can help with?" -o "$OUTPUT_DIR/restaurant-11.aiff"
say -v Karen -r 165 "Actually, do you have outdoor seating available?" -o "$OUTPUT_DIR/restaurant-12.aiff"
say -v Alex -r 165 "We do have a patio, and I can certainly request that for you. It's first-come-first-served, but I'll make a note on your reservation." -o "$OUTPUT_DIR/restaurant-13.aiff"
say -v Karen -r 165 "That sounds great, thank you." -o "$OUTPUT_DIR/restaurant-14.aiff"
say -v Alex -r 165 "You're welcome. We look forward to seeing you at 7 PM. Have a wonderful day." -o "$OUTPUT_DIR/restaurant-15.aiff"

# Call 4: Home Services
echo "📞 Creating Home Services sample call..."

say -v Samantha -r 160 "Good afternoon, All Seasons Heating and Cooling. This is Lisa. How can I help you today?" -o "$OUTPUT_DIR/hvac-1.aiff"
say -v Daniel -r 165 "Hi, my air conditioner isn't working and it's getting really hot in the house." -o "$OUTPUT_DIR/hvac-2.aiff"
say -v Samantha -r 160 "I'm sorry to hear that. Let me get some information and see how quickly we can get someone out to you. First, what's your address?" -o "$OUTPUT_DIR/hvac-3.aiff"
say -v Daniel -r 165 "742 Oak Street." -o "$OUTPUT_DIR/hvac-4.aiff"
say -v Samantha -r 160 "Thank you. And your name please?" -o "$OUTPUT_DIR/hvac-5.aiff"
say -v Daniel -r 165 "David Chen." -o "$OUTPUT_DIR/hvac-6.aiff"
say -v Samantha -r 160 "Thanks Mr. Chen. Can you describe what's happening? Is it making unusual sounds, or just not turning on?" -o "$OUTPUT_DIR/hvac-7.aiff"
say -v Daniel -r 165 "It's running but not blowing cold air. Just warm air coming out." -o "$OUTPUT_DIR/hvac-8.aiff"
say -v Samantha -r 160 "That could be a refrigerant issue. We have a technician available this afternoon between 2 and 4 PM, or tomorrow morning. Which works better?" -o "$OUTPUT_DIR/hvac-9.aiff"
say -v Daniel -r 165 "This afternoon would be great if possible." -o "$OUTPUT_DIR/hvac-10.aiff"
say -v Samantha -r 160 "Perfect. I'll have Mike out between 2 and 4 PM today. Our service call fee is 89 dollars. Mike will provide a quote before any repairs. What's your phone number?" -o "$OUTPUT_DIR/hvac-11.aiff"
say -v Daniel -r 165 "555-4567." -o "$OUTPUT_DIR/hvac-12.aiff"
say -v Samantha -r 160 "Excellent. You'll receive a text 30 minutes before Mike arrives. Anything else I can help with?" -o "$OUTPUT_DIR/hvac-13.aiff"
say -v Daniel -r 165 "No, that's all. Thank you so much." -o "$OUTPUT_DIR/hvac-14.aiff"
say -v Samantha -r 160 "You're very welcome, Mr. Chen. Stay cool, and we'll see you this afternoon." -o "$OUTPUT_DIR/hvac-15.aiff"

echo "✓ All sample calls generated!"
echo "📁 Files saved to: $OUTPUT_DIR"
