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
const userRole = (token: string) => {
  localStorage.setItem("access_token", token) // Store under the key 'access_token'
}

export const SigninForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/userDashboard" // Default to user dashboard
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const accessToken = data.access_token
        
        if (accessToken) {
          storeToken(accessToken) 
          toast.success("Login successful!")
          setRedirecting(true) // Start redirecting loader

          // Determine the redirection path based on user role
          const userRole = data.access_token
          if (userRole === "admin") {
           
            router.push("/adminDashboard")
          } else {
            
            router.push(callbackUrl) 
          }
        } else {
         
          toast.error("Login failed: No token received.")
        }
      } else {
        
        const errorResponse = await response.json()
        toast.error(errorResponse.message || "Invalid username or password")
      }
    } catch (error) {
      
      toast.error(`Login failed: ${(error as Error).message}`)
    } finally {
      setLoading(false)
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
    </form>
  )
}
