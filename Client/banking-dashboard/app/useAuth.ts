"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Set mounted state when the component mounts
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      // Redirect to login if no token is found
      router.push('/sign-in');
    }
  }, [isMounted, router]);

  return null;
};

export default useAuth;
