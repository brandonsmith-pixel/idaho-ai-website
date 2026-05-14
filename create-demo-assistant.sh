#!/bin/bash

VAPI_KEY=$(grep VAPI_PRIVATE_KEY .env.local | cut -d'=' -f2)

curl -X POST "https://api.vapi.ai/assistant" \
  -H "Authorization: Bearer $VAPI_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Demo Template - Fast",
  "model": {
    "provider": "openai",
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 150,
    "systemPrompt": "You are an AI receptionist demo. Be brief, professional, and helpful. Answer questions naturally."
  },
  "voice": {
    "provider": "11labs",
    "voiceId": "EXAVITQu4vr4xnSDxMaL"
  },
  "firstMessage": "Hi! This is an AI receptionist demo. Go ahead and ask me questions!",
  "endCallFunctionEnabled": false,
  "maxDurationSeconds": 300,
  "serverUrl": "https://tetongroup.ai/api/webhooks/vapi"
}'
