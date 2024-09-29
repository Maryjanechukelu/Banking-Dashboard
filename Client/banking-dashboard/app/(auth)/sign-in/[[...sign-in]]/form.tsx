"use client"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

// Assuming you are using a modal from Shadcn UI or similar
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"

const storeToken = (token: string) => {
  localStorage.setItem("access_token", token) // Store under the key 'access_token'
}

export const SigninForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState<boolean>(false)

  const [isModalOpen, setIsModalOpen] = useState(false) // Control modal visibility
  const [email, setEmail] = useState("") // Email state for the forgot password form

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(
        "https://swiss-ultra-api-2.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        const accessToken = data.access_token

        if (accessToken) {
          storeToken(accessToken)
          toast.success("Login successful!")
          setRedirecting(true)
          if (data.user && typeof data.user.is_admin !== "undefined") {
            const isAdmin = data.user.is_admin

            if (isAdmin === true) {
              router.push("/adminDashboard")
            } else {
              router.push("/userDashboard")
            }
          } else {
            toast.error("Login failed: User data is not available.")
          }
        } else {
          toast.error("Login failed: No token received.")
        }
      } else {
        toast.error("Login failed: Invalid credentials.")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An error occurred during login.")
    } finally {
      setLoading(false)
    }
  }

  // Updated forgot password handler to use modal form submission
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("Email address is required.")
      return
    }

    try {
      const response = await fetch(
        "https://swiss-ultra-api-2.onrender.com/auth/forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || "Reset link sent successfully!")
        setEmail("") // Clear email after submission
        setIsModalOpen(false) // Close modal after successful submission
      } else {
        toast.error(data.error || "Failed to send reset link.")
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending the reset link. Please try again."
      )
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="space-y-12 w-full sm:w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            className="w-full"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Enter Username"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            className="w-full"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="w-full">
          <Button
            disabled={loading}
            className="w-full bg-indigo-900 hover:bg-indigo-500 text-white"
            size="lg"
          >
            {loading ? <Loader className="animate-spin" /> : "Login"}
          </Button>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {/* Forgot Password Modal */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="bg-indigo-900 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Forgot Password</AlertDialogTitle>
            <AlertDialogDescription>
              Enter your registered email address to receive a password reset
              link.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-900"
                required
              />
            </div>

            <AlertDialogFooter className="flex justify-between">
              <Button
                type="submit"
                disabled={!email || loading}
                className="bg-green-400 text-black"
              >
                {loading ? <Loader className="animate-spin" /> : "Send Reset Link"}
              </Button>

              {/* Close Button */}
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)} // Close modal on click
                className="bg-red-400 text-black"
              >
                Close
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default SigninForm
