"use client";
import React, { useEffect, useState } from "react";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { toast } from "react-toastify";

// Define the Account interface as per your backend response
interface Account {
  data: string;
  username: string;
  account_number: number;
  account_balance: number;
  last_credited_amount: number;
}

// Define a User interface that matches the expected props for RightSidebar
interface User {
  username: string;
  email: string;
}

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token");
};

const Home: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined); // User state for RightSidebar

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accessToken = getToken();
        console.log(accessToken)

        if (!accessToken) {
          throw new Error("No access token available. Please log in.");
        }

        const response = await fetch("http://127.0.0.1:5000/auth/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.");
          }
          throw new Error("Failed to fetch account details. Please try again.");
        }

        const data: Account = await response.json();

        // Log the fetched data for debugging purposes
        console.log("Fetched Data:", data);

        // Store the token if provided
        if (data.data) {
          storeToken(data.data);
        }

        // Set the account details
        setAccount(data);

        // Map Account data to User data
        setUser({
          username: data.username,
          email: "user@example.com", // Assign a placeholder email or fetch it if available
        });

        toast.success("Account details fetched successfully");
      } catch (error) {
        toast.error(
          `Error fetching account details: ${(error as Error).message}`
        );
      }
    };

    fetchAccountDetails();
  }, []);

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={user?.username}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox />
        </header>
      </div>

      {/* Pass the mapped user data to RightSidebar */}
      <RightSidebar user={user} />
    </section>
  );
};

export default Home;
