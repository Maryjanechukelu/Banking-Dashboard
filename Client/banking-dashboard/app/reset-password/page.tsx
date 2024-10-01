"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"


// Utility function to get the stored token
const getToken = () => localStorage.getItem("access_token")

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Extract token from the URL query params
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Ensure token is available before proceeding
    if (!token) {
      setError("Invalid or missing token")
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const accessToken = getToken()
    if (!accessToken) {
      setError("No access token available. Please log in.")
      return
    }

    // Password validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await fetch(
        `https://swiss-ultra-api-2.onrender.com/auth/reset_password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ new_password: newPassword }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        toast(data.message)
        setMessage(data.message)
        setError("")

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/sign-in") // Redirect to the login page
        }, 2000)
      } else {
        setError(data.error || "An error occurred")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-full mx-auto pt-6 px-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-2xl sm:max-w-xl lg:max-w-2xl w-full px-4"
      >
        <div className="mb-4">
          <Label htmlFor="password">New Password</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="password"
            required
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmpassword"
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-indigo-900 text-white"
          disabled={loading}
        >
          {loading ? "Reset..." : "Reset Password"}
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm;
