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

const TotalBalanceBox: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const accounts = []; 

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/account", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer your_jwt_token`, // Replace with actual token handling logic
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch account details. Please try again.");
        }

        const data = await response.json();
        setAccounts(data.accounts); // Adjust according to your actual response structure
        toast.success("Accounts fetched successfully");
      } catch (error) {
        setError((error as Error).message);
        toast.error(`Error fetching accounts: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

   fetchAccounts()
  }, []);

  const totalCurrentBalance = accounts.reduce((acc, account) => acc + account.account_balance, 0);
  const totalBanks = accounts.length;

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
        <h2 className="header-2 text-lg font-semibold text-gray-800">
          Bank Accounts: {totalBanks}
        </h2>
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
