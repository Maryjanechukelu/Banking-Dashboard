'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import BackButton from "@/components/backButton"
import useAuth from "@/app/useAuth"
import OtpModal from '@/components/OtpModal';
import { Dispatch, SetStateAction } from "react"

interface TransferFormProps {
  closeModal: () => void
  otpCode: number
  setOtpCode: Dispatch<SetStateAction<number>>
  handleOtpSubmit: () => void
  otpLoading: boolean
}

const TransferForm: React.FC<TransferFormProps> = ({}) => {
  useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    accountNumber: "",
    recipientBank: "",
    recipientName: "",
    swiftCode: "",
    amount: "",
    description: "",
  })

  const [loading, setLoading] = useState(false)
  const [isOtpModalOpen, setOtpModalOpen] = useState(false)
  const [otpCode, setOtpCode] = useState("") // OTP Code state
  const [otpLoading, setOtpLoading] = useState(false) // For OTP submission loading state

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Simulate the start of a transfer, and open the OTP modal
    setTimeout(() => {
      setLoading(false)
      setOtpModalOpen(true) // Open OTP modal here
    }, 1000)
  }

  const handleOtpSubmit = () => {
    setOtpLoading(true)

    // Simulate OTP validation
    setTimeout(() => {
      if (otpCode === "1234") {
        // Replace this with actual OTP validation logic
        toast({
          title: "Success",
          description: "Funds transferred successfully!",
        })

        // Clear form data
        setFormData({
          accountNumber: "",
          recipientName: "",
          recipientBank: "",
          swiftCode: "",
          amount: "",
          description: "",
        })

        setOtpModalOpen(false) // Close OTP modal after successful submission
      } else {
        toast({
          title: "Error",
          description: "Invalid OTP. Please try again.",
        })
      }
      setOtpLoading(false)
    }, 1500) // Simulate delay for OTP validation
  }

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
                value={formData.recipientBank}
                onChange={handleChange}
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
                value={formData.recipientName}
                onChange={handleChange}
                id="recipientName"
                required
                placeholder="Enter recipient's name"
                className="w-2/3"
              />
            </div>

            {/* Account Number */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="accountNumber" className="w-1/3 text-right">
                {"Recipient's"} Account Number
              </Label>
              <Input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                id="accountNumber"
                required
                placeholder="Enter recipient's account number"
                className="w-2/3"
              />
            </div>

            {/* SWIFT CODE/NUMBER */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="swiftCode" className="w-1/3 text-right">
                SWIFT/ABA Routing Number
              </Label>
              <Input
                type="number"
                name="swiftCode"
                value={formData.swiftCode}
                onChange={handleChange}
                id="swiftCode"
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
                value={formData.amount}
                onChange={handleChange}
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
          otpCode={otpCode}
          setOtpCode={setOtpCode} // Pass the OTP code setter to the modal
          handleOtpSubmit={handleOtpSubmit} // Handle OTP submission
          otpLoading={otpLoading}
        />
      )}
    </>
  )
}

export default TransferForm;
