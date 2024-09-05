"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import BackButton from '@/components/backButton';

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken)
}

// Utility function to get the stored token
const getToken = () => {
  return localStorage.getItem("access_token")
}

const EditUserDataPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

       try {
      const accessToken = getToken()
      if (!accessToken) {
        throw new Error("No access token available. Please log in.")
      }
      const response = await fetch(
        "http://127.0.0.1:5000/auth/admin/edit_user",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ username, email }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update user info. Please try again.")
      }
        const data = await response.json()

        // Store the token if provided
        if (data[0]?.data) {
          storeToken(data[0].data)
        }
      toast.success("User information updated successfully")
    } catch (error) {
      toast.error(`Error updating user info: ${(error as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
       <div className="flex justify-between p-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-900">
           Update User
          </h1>
        </div>
        <div>
          <BackButton text="Go Back" link="/Settings" />
        </div>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg sm:max-w-xl lg:max-w-2xl w-full mx-auto px-4"
      >
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
            New Username
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
            New Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            "Update User"
          )}
        </Button>
      </form>
    </>
  )
};

export default EditUserDataPage;
