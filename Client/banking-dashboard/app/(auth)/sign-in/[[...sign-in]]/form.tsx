"use client"

import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { signIn } from "next-auth/react"

export const SigninForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState<string>("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    const response = await fetch('http://localhost:3000/api/login', { // Adjust the URL if necessary
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test', password: 'password' }),
    });
    console.log("Res", response)
    if (response.ok) {
      setMessage("Login successful!")
      router.push(callbackUrl)
    } else {
      setError("Invalid email or password")
      setMessage(`Login failed: ${error}`)
    };
};

return (
  <form onSubmit={handleLogin} className="space-y-12 w-full sm:w-[400px]">
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input
        className="w-full"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="email"
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
      />
    </div>
    {error && <Alert>{error}</Alert>}
    <div className="w-full">
      <Button className="w-full bg-blue-700 hover:bg-blue-900" size="lg">
        Login
      </Button>
      {message && <p>{message}</p>}
    </div>
  </form>
);
};
