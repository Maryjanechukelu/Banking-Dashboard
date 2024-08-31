"use client"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader } from "lucide-react"
import BackButton from '@/components/backButton';

const storeToken = (token: string) => {
  localStorage.setItem("jwt_token", token)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("jwt_token")
}
const CreateAdminAccountPage: React.FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = getToken() 
      const response = await fetch("http://127.0.0.1:5000/auth/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) {
        throw new Error("Failed to create admin account. Please try again.")
      }
        const data = await response.json()

        // If a new token is provided in the response, store it
        if (data.token) {
          storeToken(data.token)
        }   
      toast.success("Admin account created successfully")
    } catch (error) {
      toast.error(`Error creating admin account: ${(error as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-900">
        Create Admin Account
      </h1>
      </div>
      <div>
        <BackButton text='Go Back' link='/Settings' />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto px-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Username
          </Label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-900 text-white rounded-md w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            "Create Admin"
          )}
        </Button>
      </form>
    </>
  )
}

export default CreateAdminAccountPage
