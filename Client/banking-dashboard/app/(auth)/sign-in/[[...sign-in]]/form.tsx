"use client"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const storeToken = (token: string) => {
  localStorage.setItem("access_token", token) // Store under the key 'access_token'
}
//const userRole = (token: string) => {
  //localStorage.setItem("access_token", token) // Store under the key 'access_token'
//}

export const SigninForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get("callbackUrl") || "/userDashboard"
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState<boolean>(false)

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

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your registered email address:")

    if (email) {
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

        if (response.ok) {
          const data = await response.json()
          alert(data.message || "Reset link sent successfully!")
        } else {
          const errorData = await response.json()
          alert(errorData.error || "Failed to send reset link.")
        }
      } catch (error) {
        alert(
          "An error occurred while sending the reset link. Please try again."
        )
      }
    } else {
      alert("Email address is required.")
    }
  }

  return (
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
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-indigo-600 hover:underline"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  )
}

export default SigninForm 