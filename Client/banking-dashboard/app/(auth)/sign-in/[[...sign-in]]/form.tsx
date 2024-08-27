"use client"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export const SigninForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState<string>("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // setMessage("")
     setLoading(true);
     try {
    const response = await fetch('http://127.0.0.1:5000/auth/login', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (response.ok) {
      toast.success("Login successful!")
      router.push(callbackUrl)
    } else {
      setError("Invalid username or password")
      }
     } catch (error) {      
      setError("An error occurred");
       toast.error(`Login failed: ${error}`);
    }finally {
      setLoading(false) 
    }
    };

return (
  <form onSubmit={handleLogin} className="space-y-12 w-full sm:w-[400px]">
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
        className="w-full bg-indigo-900 hover:bg-indigo-500 text-white"
        size="lg"
      >
        {loading ? <Loader className="animate-spin" /> : "Login"} 
      </Button>
      {/* {message && <p>{message}</p>} */}
    </div>
  </form>
)
};
