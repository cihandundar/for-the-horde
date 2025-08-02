import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    return NextResponse.json({
      stripeConfigured: !!stripeKey,
      publishableKeyConfigured: !!publishableKey,
      stripeKeyLength: stripeKey ? stripeKey.length : 0,
      publishableKeyLength: publishableKey ? publishableKey.length : 0,
      stripeKeyPrefix: stripeKey ? stripeKey.substring(0, 7) : 'Not set',
      publishableKeyPrefix: publishableKey ? publishableKey.substring(0, 7) : 'Not set',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to check Stripe configuration' },
      { status: 500 }
    );
  }
} 