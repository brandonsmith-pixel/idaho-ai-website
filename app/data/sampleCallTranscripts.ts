interface Message {
  role: 'ai' | 'caller';
  text: string;
  timestamp: number;
}

export interface SampleCall {
  industry: string;
  scenario: string;
  duration: string;
  audioUrl: string;
  transcript: Message[];
}

export const SAMPLE_CALLS: SampleCall[] = [
  {
    industry: "Law Firm",
    scenario: "New client inquiry about consultation",
    duration: "1:00",
    audioUrl: "/audio/law-firm-consultation.mp3",
    transcript: [
      { role: 'ai', text: "Thank you for calling Thompson & Associates Law Firm. This is Sarah, how may I help you today?", timestamp: 0 },
      { role: 'caller', text: "Hi, I was in a car accident last week and I need to speak with someone about my options.", timestamp: 5 },
      { role: 'ai', text: "I'm sorry to hear about your accident. I'd be happy to help you schedule a consultation with one of our personal injury attorneys. Can I get your name please?", timestamp: 11 },
      { role: 'caller', text: "Yes, it's Michael Rodriguez.", timestamp: 20 },
      { role: 'ai', text: "Thank you Michael. And what's the best phone number to reach you?", timestamp: 23 },
      { role: 'caller', text: "It's 555-0123.", timestamp: 27 },
      { role: 'ai', text: "Perfect. Our attorneys are available for consultations Monday through Friday. Would you prefer morning or afternoon?", timestamp: 29 },
      { role: 'caller', text: "Afternoon works better for me.", timestamp: 36 },
      { role: 'ai', text: "Great. I have Thursday at 2 PM or Friday at 3 PM available. Which works best for you?", timestamp: 39 },
      { role: 'caller', text: "Thursday at 2 PM sounds good.", timestamp: 45 },
      { role: 'ai', text: "Excellent. I've scheduled your consultation with Attorney Thompson for this Thursday at 2 PM. You'll receive a confirmation text. Is there anything else I can help you with today?", timestamp: 48 },
      { role: 'caller', text: "No, that's all. Thank you.", timestamp: 57 },
      { role: 'ai', text: "You're welcome Michael. We'll see you Thursday. Have a great day.", timestamp: 59 },
    ]
  },
  {
    industry: "Medical Practice",
    scenario: "Patient scheduling appointment",
    duration: "0:59",
    audioUrl: "/audio/medical-appointment.mp3",
    transcript: [
      { role: 'ai', text: "Good morning, Riverside Family Medicine. This is Emma speaking. How can I assist you?", timestamp: 0 },
      { role: 'caller', text: "Hi, I need to schedule my annual physical.", timestamp: 5 },
      { role: 'ai', text: "I'd be happy to help with that. May I have your name and date of birth please?", timestamp: 8 },
      { role: 'caller', text: "Jennifer Park, May 15th, 1985.", timestamp: 13 },
      { role: 'ai', text: "Thank you Ms. Park. I see you're an existing patient. Are you experiencing any specific health concerns, or is this just your routine checkup?", timestamp: 16 },
      { role: 'caller', text: "Just routine, but I'd also like to discuss some bloodwork results.", timestamp: 24 },
      { role: 'ai', text: "Understood. For a physical with lab review, I recommend scheduling a 30-minute appointment. We have availability next Tuesday at 9 AM or Wednesday at 1:30 PM. Which works better?", timestamp: 29 },
      { role: 'caller', text: "Wednesday at 1:30 works perfectly.", timestamp: 40 },
      { role: 'ai', text: "Perfect. I've scheduled you for Wednesday at 1:30 PM with Dr. Martinez. Please arrive 10 minutes early. You'll receive a reminder the day before. Anything else I can help with?", timestamp: 43 },
      { role: 'caller', text: "No, that's everything. Thank you.", timestamp: 54 },
      { role: 'ai', text: "You're very welcome, Ms. Park. We'll see you Wednesday. Take care.", timestamp: 56 },
    ]
  },
  {
    industry: "Restaurant",
    scenario: "Reservation and menu questions",
    duration: "0:58",
    audioUrl: "/audio/restaurant-reservation.mp3",
    transcript: [
      { role: 'ai', text: "Thank you for calling Bella Vista Italian Restaurant. This is Tony. How may I help you this evening?", timestamp: 0 },
      { role: 'caller', text: "Hi, I'd like to make a reservation for dinner tonight.", timestamp: 5 },
      { role: 'ai', text: "Absolutely, I'd be happy to help with that. What time were you thinking?", timestamp: 9 },
      { role: 'caller', text: "Around 7 PM if possible.", timestamp: 13 },
      { role: 'ai', text: "And how many guests will be joining you?", timestamp: 15 },
      { role: 'caller', text: "It'll be four people.", timestamp: 18 },
      { role: 'ai', text: "Perfect. We have a table for four available at 7 PM this evening. May I have a name for the reservation?", timestamp: 20 },
      { role: 'caller', text: "Yes, it's Anderson.", timestamp: 27 },
      { role: 'ai', text: "Wonderful. And a phone number in case we need to reach you?", timestamp: 29 },
      { role: 'caller', text: "555-7890.", timestamp: 33 },
      { role: 'ai', text: "Perfect. I have you down for a party of four at 7 PM tonight under Ms. Anderson. We're featuring our spring menu with fresh seafood specials. Anything else I can help with?", timestamp: 35 },
      { role: 'caller', text: "Actually, do you have outdoor seating available?", timestamp: 45 },
      { role: 'ai', text: "We do have a patio, and I can certainly request that for you. It's first-come-first-served, but I'll make a note on your reservation.", timestamp: 48 },
      { role: 'caller', text: "That sounds great, thank you.", timestamp: 55 },
      { role: 'ai', text: "You're welcome. We look forward to seeing you at 7 PM. Have a wonderful day.", timestamp: 57 },
    ]
  },
  {
    industry: "Home Services",
    scenario: "HVAC service request and scheduling",
    duration: "1:09",
    audioUrl: "/audio/home-services-hvac.mp3",
    transcript: [
      { role: 'ai', text: "Good afternoon, All Seasons Heating and Cooling. This is Lisa. How can I help you today?", timestamp: 0 },
      { role: 'caller', text: "Hi, my air conditioner isn't working and it's getting really hot in the house.", timestamp: 5 },
      { role: 'ai', text: "I'm sorry to hear that. Let me get some information and see how quickly we can get someone out to you. First, what's your address?", timestamp: 10 },
      { role: 'caller', text: "742 Oak Street.", timestamp: 17 },
      { role: 'ai', text: "Thank you. And your name please?", timestamp: 19 },
      { role: 'caller', text: "David Chen.", timestamp: 21 },
      { role: 'ai', text: "Thanks Mr. Chen. Can you describe what's happening? Is it making unusual sounds, or just not turning on?", timestamp: 23 },
      { role: 'caller', text: "It's running but not blowing cold air. Just warm air coming out.", timestamp: 29 },
      { role: 'ai', text: "That could be a refrigerant issue. We have a technician available this afternoon between 2 and 4 PM, or tomorrow morning. Which works better?", timestamp: 34 },
      { role: 'caller', text: "This afternoon would be great if possible.", timestamp: 43 },
      { role: 'ai', text: "Perfect. I'll have Mike out between 2 and 4 PM today. Our service call fee is $89. Mike will provide a quote before any repairs. What's your phone number?", timestamp: 46 },
      { role: 'caller', text: "555-4567.", timestamp: 57 },
      { role: 'ai', text: "Excellent. You'll receive a text 30 minutes before Mike arrives. Anything else I can help with?", timestamp: 59 },
      { role: 'caller', text: "No, that's all. Thank you so much.", timestamp: 65 },
      { role: 'ai', text: "You're very welcome, Mr. Chen. Stay cool, and we'll see you this afternoon.", timestamp: 67 },
    ]
  }
];
