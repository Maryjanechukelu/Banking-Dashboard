"use client"

import React, { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Ellipsis } from "lucide-react"
import LoadingOverlay from "@/components/LoadingOverlay"
import { toast } from "react-toastify"

// Utility function to get the stored token
const getToken = () => localStorage.getItem("access_token")

const OtpModal = ({ closeModal }: { closeModal: () => void }) => {
  const [open, setOpen] = useState(true) // Modal open state
  const [passkey, setPasskey] = useState("") // OTP input value
  const [error, setError] = useState("") // Error message
  const [message, setMessage] = useState("") // Success message
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [transactionPhase, setTransactionPhase] = useState(1) // Current phase (1 to 4)
  const router = useRouter()

  // Close the modal handler
  const handleCloseModal = () => {
    setOpen(false)
    closeModal()
  }

    useEffect(() => {
    setIsLoading(true); // Show the loading overlay
    setTimeout(() => {
      setIsLoading(false); // Hide the loading overlay after 2 seconds
    }, 2000); // Simulate a 2-second loading period for testing
  }, []);

  // Move to the next phase or finish the transaction
  const handleNextPhase = () => {
    if (transactionPhase < 4) {
      setTransactionPhase(transactionPhase + 1)
      setPasskey("") // Reset OTP input for the next phase
      setError("") // Reset error
    } else {
      setOpen(false) // Close the final modal
      toast("Transaction Successful!")
      setTimeout(() => router.push("/success-page"), 2000) // Navigate to success page
    }
  }

  // Validate OTP for different phases (phase 1, 2, 3)
  const validatePasskey = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const accessToken = getToken()
    if (!accessToken) {
      setError("No access token available. Please log in.")
      return
    }

    try {
      // Dynamic endpoint based on the phase
       const endpointMap: { [key: number]: { url: string; key: string } } = {
    1: {
      url: "https://swiss-ultra-api-2.onrender.com/auth/verify_auth_code",
      key: "auth_code",
    },
    2: {
      url: "https://swiss-ultra-api-2.onrender.com/auth/save_tin",
      key: "tax_verification_code",
    },
    3: {
      url: "https://swiss-ultra-api-2.onrender.com/auth/complete_transfer",
      key: "final_auth_code",
    },
  }

      const currentEndpoint = endpointMap[transactionPhase]
      
      const response = await fetch(currentEndpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ [currentEndpoint.key]: parseInt(passkey, 10) }),
      })

      const data = await response.json()

      if (response.ok) {
        // Show success message
        toast(data.message || "Authentication code verified.")
        setMessage(data.message)

        // Move to the next phase after a delay
        setTimeout(() => handleNextPhase(), 1000)
      } else {
        // Display error message if OTP is invalid
        setError(data.error || "Invalid Pin. Please try again.")
      }
    } catch (error) {
      setError("There was an error validating the pin. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const loaderIcon = <Ellipsis className="animate-bounce w-20 h-20" />

  const otpSlotCount: Record<number, number> = {
    1: 3,
    2: 6, 
    3: 4, 
  }

  // Using the correct count for the current transaction phase
  const numberOfSlots = otpSlotCount[transactionPhase] || 0 // Default to 0 if not found

  return (
    <>
      <LoadingOverlay
        isLoading={isLoading}
        icon={loaderIcon}
        message="Validating your pin..."
      />

      {/* Phase 1, 2, 3: OTP Modals */}
      {transactionPhase <= 3 && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-start justify-between">
                {transactionPhase === 1
                  ? "3 Digit Authourization Pin"
                  : transactionPhase === 2
                  ? "Tax Clearance Verification Code "
                  : "Final Authourization Code"}
                <Image
                  src="/icons/x.svg"
                  alt="close"
                  width={20}
                  height={20}
                  onClick={handleCloseModal}
                  className="cursor-pointer"
                />
              </AlertDialogTitle>
              <AlertDialogDescription>
                {transactionPhase === 1
                  ? "Enter the 3-digit authorization pin sent to your registered email."
                  : transactionPhase === 2
                  ? "Enter the Tax Clearance Verification Code"
                  : "Enter the Tax Authorization Code sent to your registered email."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="shad-otp-container h-full">
              <InputOTP
                maxLength={Math.max(...Object.values(otpSlotCount))}
                value={passkey}
                onChange={(value) => setPasskey(value)}
              >
                <InputOTPGroup className="shad-otp">
                  {[...Array(Number(otpSlotCount[transactionPhase]))].map(
                    (_, index) => (
                      <InputOTPSlot
                        key={index}
                        className="shad-otp-slot"
                        index={index}
                      />
                    )
                  )}
                </InputOTPGroup>
              </InputOTP>
              <div className="mt-4 w-full text-center">
                {error && (
                  <p className="shad-error text-red-600 text-sm mt-2 block">
                    {error}
                  </p>
                )}
                {message && (
                  <p className="text-green-600 text-sm mt-2 block">{message}</p>
                )}
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogAction
                className="shad-primary-btn w-full"
                onClick={validatePasskey}
              >
                Enter Pin
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Phase 4: Transaction Successful Modal */}
      {transactionPhase === 4 && (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent className="shad-alert-dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>Transaction Successful</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Your transaction has been successfully completed.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogAction
                className="shad-primary-btn w-full"
                onClick={handleCloseModal}
              >
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

export default OtpModal
