import { loadStripe } from '@stripe/stripe-js';

// Stripe instance'ını yükle
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Payment initiation function
export const initiatePayment = async (amount: number, description: string = 'Product Payment', items?: any[]) => {
  try {
    console.log('Initiating payment with:', { amount, description, items });
    
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'usd',
        description,
        items,
      }),
    });

    const responseData = await response.json();
    console.log('Stripe API response:', responseData);

    if (!response.ok) {
      const errorMessage = responseData.error || responseData.details || 'Failed to create payment session';
      throw new Error(errorMessage);
    }

    if (!responseData.sessionId) {
      throw new Error('No session ID received from payment service');
    }

    return responseData.sessionId;
  } catch (error) {
    console.error('Payment initiation error:', error);
    throw error;
  }
};

// Redirect to Stripe Checkout
export const redirectToCheckout = async (sessionId: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Checkout redirect error:', error);
    throw error;
  }
}; 