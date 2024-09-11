// useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.replace('/sign-in');
    }
  }, [router]);
};

export default useAuth;
