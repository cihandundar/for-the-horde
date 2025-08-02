'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/redux/features/cardSlice';
import { RootState } from '@/redux/store';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    // You can verify payment status if session ID exists
    if (sessionId) {
      console.log('Payment session ID:', sessionId);
      
      // Get cart items from Redux store before clearing
      const currentCartItems = [...cartItems];
      
      // Clear cart after successful payment
      dispatch(clearCart());
      
              // Save order to localStorage for profile page
        const order = {
          id: sessionId,
          orderId: sessionId.substring(0, 8) + '****',
          date: new Date().toISOString(),
          status: 'completed',
          amount: currentCartItems.reduce((total: number, item: any) => {
            const price = item.source === 'mongo' ? item.price : item.isPriceRange;
            return total + (price * item.quantity);
          }, 0),
          items: currentCartItems,
          totalItems: currentCartItems.reduce((total: number, item: any) => total + item.quantity, 0)
        };
      
      // Get existing orders
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.unshift(order); // Add new order at the beginning
      
      // Keep only last 10 orders
      const recentOrders = existingOrders.slice(0, 10);
      localStorage.setItem('orders', JSON.stringify(recentOrders));
    }
    setLoading(false);
  }, [sessionId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Your payment has been completed successfully. Thank you!
          </p>
          
          {sessionId && (
            <p className="text-sm text-gray-500 mb-6">
              Order ID: {sessionId.substring(0, 8)}****
            </p>
          )}
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Home
            </Link>
            
            <Link
              href="/profile"
              className="block w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 