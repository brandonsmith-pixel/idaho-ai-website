import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.STRIPE_SECRET_KEY;
  const keyPrefix = process.env.STRIPE_SECRET_KEY?.substring(0, 10) || 'missing';
  const keyLength = process.env.STRIPE_SECRET_KEY?.length || 0;
  
  return NextResponse.json({
    hasKey,
    keyPrefix,
    keyLength,
    message: hasKey ? 'Key is present' : 'Key is missing!',
  });
}
