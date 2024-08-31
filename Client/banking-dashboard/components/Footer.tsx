import React, { useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

  type User = {
    email: string;
    password: string;
    username: string;
  };

declare interface FooterProps {
  user: User;
  type?: 'mobile' | 'desktop'
}


const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();
 
  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": "Bearer",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
 
       if (response.ok) {
          toast.success("Logout successful!");
       }
      router.push("/sign-in");
    } catch (error) {
      toast.error(`Logout failed: ${error}`)
 }
   };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.username}</p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.username}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogout}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  )
}

export default Footer