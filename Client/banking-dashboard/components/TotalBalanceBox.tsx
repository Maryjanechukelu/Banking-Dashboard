"use client";
import React, { useEffect, useState } from "react";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

interface Account {
  data: string
  username: string
  account_number: number
  account_balance: number
  last_credited_amount: number
}

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token")
}

const TotalBalanceBox: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const accounts = []; 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accessToken = getToken()

        if (!accessToken) {
          throw new Error("No access token available. Please log in.")
        }

        const response = await fetch("http://127.0.0.1:5000/auth/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Replace with actual token handling logic
          },
        })

        if (!response.ok) {
          // Handle 401 unauthorized error separately
          if (response.status === 401) {
            throw new Error("Unauthorized access. Please log in again.")
          }
          throw new Error("Failed to fetch account details. Please try again.")
        }

        const data = await response.json()
        // If a new token is provided in the response, store it
        if (data.access_token) {
          storeToken(data.access_token)
        }
        setAccounts(data)
        toast.success("Account details fetched successfully")
      } catch (error) {
        toast.error(
          `Error fetching account details: ${(error as Error).message}`
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const totalCurrentBalance = accounts.reduce((acc, account) => acc + account.account_balance,0);
  // const totalBanks = accounts.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader className="animate-spin text-indigo-900" size={40} />
        <p className="ml-4 text-lg text-indigo-900">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <section className="total-balance p-4 bg-white rounded-md shadow-md max-w-2xl mx-auto">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {/* <h2 className="header-2 text-lg font-semibold text-gray-800">
          Bank Accounts: {totalBanks}
        </h2> */}
        <div className="flex flex-col gap-2">
          <p className="total-balance-label text-sm text-gray-600">
            Total Current Balance
          </p>

          <div className="total-balance-amount flex-center gap-2 text-2xl font-bold text-gray-900">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
