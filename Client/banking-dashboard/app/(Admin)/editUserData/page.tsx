"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

const EditUserDataPage: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/edit-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, username, email }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user data. Please try again.");
      }
      toast.success("User data updated successfully");
    } catch (error) {
      toast.error(`Error updating user data: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 p-4 text-indigo-900">Edit User Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto px-4">
        <div>
          <Label className="block text-sm font-medium text-gray-700">
            User ID
          </Label>
          <Input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
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
        <Button
          type="submit"
          className="px-4 py-2 bg-indigo-900 text-white rounded-md w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" size={20} /> : "Update User"}
        </Button>
      </form>
    </>
  );
};

export default EditUserDataPage;
