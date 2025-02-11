'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';


export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('Verifying your email...');
  const { authToken, user, updateUser } = useAuth();


  const verifyUrl = searchParams.get('verifyUrl');
  if (!verifyUrl) {
    setVerificationStatus('Invalid verification link');
    return;
  }
  
  useEffect(() => {
    if (!authToken) {
      return;
    }

    verifyEmail();
  }, [authToken]);


  

  const getUser = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      updateUser(data.user);
  }

  const verifyEmail = async () => {
    try {
      const response = await fetch(verifyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
      });

      if (response.ok) {
        setVerificationStatus('Email verified successfully!');
        // Redirect to login after 2 seconds
        getUser();

        setTimeout(() => {
            //redirect to news feed not router
           window.location.href = '/news-feed';
        }, 2000);
      } else {
        setVerificationStatus('Verification failed. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('An error occurred during verification.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <h1 className="text-2xl font-semibold mt-4">{verificationStatus}</h1>
      </div>
    </div>
  );
}
