"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
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

const TransferSuccessModal = ({ closeModal }: { closeModal: () => void }) => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const handleCloseModal = () => {
    setOpen(false)
    closeModal() // Notify parent component that modal is closed
  }

  const handleViewDetails = () => {
    setOpen(false)
    router.push("/transactionDetails") // Redirect to transaction details page
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={handleCloseModal}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
              Transfer Successful
              <Image
                src="/icons/circle-check.svg" // Add an appropriate icon
                alt="success"
                width={20}
                height={20}
                className="ml-2"
              />
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
              Your transfer was successful! You can view the transaction details
              or return to your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="shad-primary-btn w-full"
              onClick={handleViewDetails}
            >
              View Transaction Details
            </AlertDialogAction>
            <AlertDialogAction
              className="shad-secondary-btn w-full"
              onClick={handleCloseModal}
            >
              Return to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default TransferSuccessModal
