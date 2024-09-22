"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Ellipsis } from "lucide-react"
import LoadingOverlay from "@/components/LoadingOverlay"

const TaxOtpModal = ({ closeModal }: { closeModal: () => void }) => {
  const [open, setOpen] = useState(true)
  const path = usePathname()
  const [passkey, setPasskey] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCloseModal = () => {
    setOpen(false)
    router.push("/userTransfer")
  }

  const validatePasskey = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    // Clear previous error if any
    setError("")

    try {
      const response = await fetch("/api/validate-passkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passkey }),
      })

      const data = await response.json()

      if (response.ok && data.valid) {
        setOpen(false)
        router.push("/userTransfer")
      } else {
        setError(data.message || "Invalid Passkey. Please try again.")
      }
    } catch (error) {
      setError(
        "There was an error validating the passkey. Please try again later."
      )
    } finally {
      setIsLoading(false) // End loading state
    }
  }

  const loaderIcon = <Ellipsis className="animate-bounce" />

  return (
    <>
      <LoadingOverlay
        isLoading={isLoading}
        icon={loaderIcon}
        message="Validating your passkey..."
      />
      <AlertDialog open={true} onOpenChange={handleCloseModal}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
              Admin Access Verification
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
              To access the admin page, please enter the passkey.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            <InputOTP
              maxLength={6}
              value={passkey}
              onChange={(value) => setPasskey(value)}
            >
              <InputOTPGroup className="shad-otp">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <p className="shad-error text-14-regular mt-4 flex justify-center">
                {error}
              </p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              className="shad-primary-btn w-full"
              onClick={validatePasskey}
            >
              Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TaxOtpModal
