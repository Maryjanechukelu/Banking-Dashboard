"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import BackButton from '@/components/backButton';

const DebitUserPage: React.FC = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/debit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
       },
        body: JSON.stringify({ accountNumber, amount }),
    });

      if (!response.ok) {
        throw new Error("Failed to debit user. Please try again.");
      }

      toast.success("User debited successfully");
    } catch (error) {
      toast.error(`Error debiting user: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <div className="flex justify-between p-4">
        <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-900">
        Debit Users
      </h1>
      </div>
      <div>
        <BackButton text='Go Back' link='/Settings' />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto px-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Account Number
          </Label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Amount
          </Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-900 text-white rounded-md w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" size={20} /> : "Debit User"}
        </Button>
      </form>
    </>
  );
};

export default DebitUserPage;
