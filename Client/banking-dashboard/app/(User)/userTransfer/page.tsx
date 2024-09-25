'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from "react-toastify"
import BackButton from "@/components/backButton"
import useAuth from "@/app/useAuth"
import OtpModal from '@/components/OtpModal';
import { Dispatch, SetStateAction } from "react"
import { useRouter, useSearchParams } from "next/navigation"


const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token")
}


const TransferForm: React.FC = () => {
  useAuth();
  const router = useRouter()
  const [recipientBank, setRecipientBank] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [routingNumber, setRoutingNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOtpModalOpen, setOtpModalOpen] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setOtpModalOpen(true)
    setError("");

  const accessToken = getToken()
      if (!accessToken) {
        throw new Error("No access token available. Please log in.")
      }
    try {
      const response = await fetch(
        "https://swiss-ultra-api-2.onrender.com/auth/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            receiver_bank: recipientBank,
            receiver_name: recipientName,
            receiver_account_number: accountNumber,
            routing_number: routingNumber,
            amount: parseFloat(amount),
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
         console.error("Error Response:", data)
        const accessToken = data.access_token

        if (accessToken) {
          storeToken(accessToken)
          // setOtpModalOpen(true)
          // router.push("/OtpModal")
        }
         setOtpModalOpen(true) 
        setRecipientBank(""),
          setRecipientName(""),
          setAccountNumber(""),
          setRoutingNumber(""),
          setAmount("")
       
      } else {
        const data = await response.json();
        toast.error(data.message || "Transfer failed. Please try again.")
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`There was an error processing the transfer: ${error.message}`)
      } else {
        setError("There was an unknown error processing the transfer.")
      }
    } finally {
      setLoading(false)
    }
};


  return (
    <>
      {/* Blur the background content when the modal is open */}
      <div className={`${isOtpModalOpen ? "blur-sm" : ""}`}>
        <div className="flex justify-between p-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-900">
              Transfer
            </h1>
          </div>
          <div>
            <BackButton text="Go Back" link="/userDashboard" />
          </div>
        </div>

        <div className="px-6">
          <h1 className="text-lg font-bold p-4 text-white mb-4 bg-indigo-900 rounded-lg shadow-lg border border-gray-200">
            Please fill in the form to make transfer
          </h1>
        </div>

        <div className="flex justify-start items-start p-4 w-full pb-[100px]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-2xl sm:max-w-xl lg:max-w-2xl w-full px-4"
          >
            {/* Recipient Bank */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="recipientBank" className="w-1/3 text-right">
                {"Recipient's"} Bank
              </Label>
              <Input
                type="text"
                name="recipientBank"
                value={recipientBank}
                onChange={(e) => setRecipientBank(e.target.value)}
                id="recipientBank"
                required
                placeholder="Enter recipient's bank"
                className="w-2/3"
              />
            </div>

            {/* Recipient Name */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="recipientName" className="w-1/3 text-right">
                {"Recipient's"} Name
              </Label>
              <Input
                type="text"
                name="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                id="recipientName"
                required
                placeholder="Enter recipient's name"
                className="w-2/3"
              />
            </div>

            {/* Account Number */}
            <div className="flex items-center space-x-4">
              <Label
                htmlFor="accountNumber"
                className="w-1/3 text-right"
              >
                {"Recipient's"} Account Number
              </Label>
              <Input
                type="text"
                name="accountNumber"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                id="accountNumber"
                required
                placeholder="Enter recipient's account number"
                className="w-2/3"
              />
            </div>

            {/* SWIFT CODE/NUMBER */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="routingNumber" className="w-1/3 text-right">
                SWIFT/ABA Routing Number
              </Label>
              <Input
                type="number"
                name="routingNumber"
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                id="routingNumber"
                required
                placeholder="Enter SWIFT/ABA routing number"
                className="w-2/3"
              />
            </div>

            {/* Amount */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="amount" className="w-1/3 text-right">
                Amount to Transfer $
              </Label>
              <Input
                type="number"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                id="amount"
                required
                placeholder="Enter amount"
                className="w-2/3"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full">
              <Button
                type="submit"
                className="px-4 py-2 bg-indigo-900 text-white rounded-md w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? "Processing..." : "Transfer Funds"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <OtpModal
          closeModal={() => setOtpModalOpen(false)}
        />
      )}
    </>
  )
}

export default TransferForm;
