"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader } from "lucide-react"

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to simulate the loader
    const timer = setTimeout(() => {
      setLoading(false);
      // Redirect to the sign-up page
      router.push("/sign-in");
    }, 1500); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center">
          {/* Logo and animation */}
          <Image
            src="/logo.svg" // Replace with your logo path
            alt="Logo"
            width={20}
            height={20}
            className="w-24 h-24 animate-pulse"
          />
        </div>
      ) : (
       <Loader className="animate-spin" />
      )}
    </div>
  );
}
