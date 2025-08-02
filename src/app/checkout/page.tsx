'use client';

import React, { useState } from 'react';
import { initiatePayment, redirectToCheckout } from '@/lib/stripe';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100); // Default $100

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const sessionId = await initiatePayment(amount, 'Product Payment');
      await redirectToCheckout(sessionId);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Checkout
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Payment Amount ($)
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100"
                min="1"
              />
            </div>
            
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay $${amount}`}
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Secure payment powered by Stripe</p>
          </div>
        </div>
      </div>
    </div>
  );
}
