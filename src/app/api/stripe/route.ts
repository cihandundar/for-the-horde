import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', description = 'Payment', items } = await request.json();

    console.log('Stripe API Request:', { amount, currency, description, items });

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // Check if Stripe key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured');
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      locale: 'en', // Set language to English
      line_items: items && items.length > 0 ? items.map((item: any) => {
        // Handle different price fields
        let unitAmount;
        if (typeof item.price === 'number') {
          unitAmount = Math.round(item.price * 100);
        } else if (typeof item.isPriceRange === 'number') {
          unitAmount = Math.round(item.isPriceRange * 100);
        } else {
          unitAmount = Math.round(amount * 100);
        }
        
        console.log('Processing item:', { 
          name: item.name, 
          price: item.price, 
          isPriceRange: item.isPriceRange,
          unitAmount 
        });
        
        return {
          price_data: {
            currency: currency,
            product_data: {
              name: item.name || item.title || 'Product',
              images: item.image || item.coverImage ? [item.image || item.coverImage] : undefined,
            },
            unit_amount: unitAmount,
          },
          quantity: item.quantity || 1,
        };
      }) : [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
    });

    console.log('Stripe session created:', session.id);
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error details:', error);
    
    // More detailed error handling
    let errorMessage = 'Failed to create payment session';
    let errorDetails = 'Unknown error';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || 'No stack trace';
    } else if (typeof error === 'object' && error !== null) {
      errorDetails = JSON.stringify(error);
    }
    
    console.error('Full error object:', error);
    console.error('Error message:', errorMessage);
    console.error('Error details:', errorDetails);
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details: errorDetails,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 