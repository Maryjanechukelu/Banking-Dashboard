import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

type User = {
  email: string;
  password: string;
  username: string;
};

declare interface FooterProps {
  user: User;
  type?: 'mobile' | 'desktop';
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token");
};

// Utility function to clear the stored token
const clearToken = () => {
  localStorage.removeItem("access_token");
};

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const accessToken = getToken();
      if (!accessToken) {
        toast.error("No access token found, please log in.");
        router.push("/sign-in");
        return;
      }

      // Make the logout request
      const response = await fetch("http://127.0.0.1:5000/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`, // Add the actual token
          "Content-Type": "application/json",
        },
      });

      // Handle the response
      if (response.ok) {
        toast.success("Logout successful!");
        clearToken(); // Clear token from local storage
        router.push("/sign-in"); // Redirect after successful logout
      } else {
        const errorData = await response.json();
        toast.error(`Logout failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      toast.error(`Logout failed: ${(error as Error).message}`);
    }
  };

  return (
    <footer className="footer flex items-center justify-between p-4 bg-gray-100 shadow">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.username}</p>
      </div>

      <div className={type === "mobile" ? "footer_email-mobile" : "footer_email"}>
        <h1 className="text-sm truncate text-gray-700 font-semibold">
          {user?.username}
        </h1>
        <p className="text-sm truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div className="footer_image cursor-pointer" onClick={handleLogout}>
        <Image src="/icons/power.svg" width={24} height={24} alt="logout icon" />
      </div>
    </footer>
  );
};

export default Footer;
