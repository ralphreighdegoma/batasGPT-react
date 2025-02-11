'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';


export default function VerifyEmailNavbar() {
  const [isResending, setIsResending] = useState(false);
  const { authToken, user, login } = useAuth();

  

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Verification email resent successfully');
      } else {
        toast.error('Failed to resend verification email');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsResending(false);
    }
  };


  if(!authToken || user.email_verified_at) {
    return null;
  }

  return (
    <div className="w-full bg-yellow-50 border-b border-yellow-200 fixed top-0 z-[60] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="ml-3 text-sm text-yellow-700">
              Please verify your email address to access all features
            </p>
          </div>
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="ml-4 px-4 py-1.5 rounded-md bg-yellow-100 text-yellow-800 text-sm font-medium hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}
