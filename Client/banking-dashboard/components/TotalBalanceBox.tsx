"use client";
import React, { useEffect, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

interface Account {
  data: string;
  username: string;
  account_number: number;
  account_balance: number;
  last_credited_amount: number;
}

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token");
};

const TotalBalanceBox: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const accessToken = getToken();

        if (!accessToken) {
          throw new Error("No access token available. Please log in.");
        }

        const response = await fetch("https://swiss-ultra-api-2.onrender.com/auth/account", {
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

        const data: Account = await response.json(); // Fetch data as an object

        // Store new token if available
        if (data.data) {
          storeToken(data.data);
        }

        setAccount(data);
        // toast.success("Account details fetched successfully");
      } catch (error) {
        setError((error as Error).message);
        toast.error(`Error fetching account details: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Image
          src="/logo.svg" // Replace with your logo path
          alt="Logo"
          width={20}
          height={20}
          className="w-24 h-24 animate-pulse"
        />
      </div>
    )
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!account) {
    return <p className="text-red-500 text-center">No account data available.</p>;
  }

  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart account={[account]} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Username: {account.username}</h2>
        <h1 className="header-2">Account Number: {account.account_number}</h1>
        <div className="flex flex-col gap-2">
          <h1 className="total-balance-label">
            Last Credited Amount: $ {account.last_credited_amount.toFixed(2)}
          </h1>
          <h1 className="total-balance-label mt-3">
            Total Balance: $ {account.account_balance.toFixed(2)}
          </h1>

          {/* <div className="total-balance-amount flex-center gap-2">
            <AnimatedCounter account={account.account_balance} />
          </div> */}
        </div>
        <div></div>
      </div>
    </section>
  )
};

export default TotalBalanceBox;

