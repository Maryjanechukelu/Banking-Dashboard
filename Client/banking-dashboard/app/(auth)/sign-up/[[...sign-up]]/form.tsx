"use client"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export const SignupForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/sign-in"
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const [message, setMessage] = useState<string>("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    // setMessage("")
    setLoading(true)
    try {
      const response = await fetch ("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), 
      })

      if (response.ok) {
        toast.success("User registered successful!")
        router.push("/sign-in")
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      setError("Username already taken")
      toast.error(`Signup failed: ${error}`)
    } finally {
      setLoading(false) 
    }
  }

  return (
    <form onSubmit={handleSignup} className="space-y-12 w-full sm:w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Username</Label>
        <Input
          className="w-full"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          type="username"
          placeholder="Enter Username"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          className="w-full"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
          placeholder="Enter Email"
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
      {error && <Alert>{error}</Alert>}
      <div className="w-full">
        <Button
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-900"
          size="lg"
        >
          {loading ? <Loader className="animate-spin" /> : "Register"}
        </Button>
        {/* {message && <p>{message}</p>} */}
      </div>
    </form>
  )
}
