"use client"
import { useState, useEffect } from 'react';
import AdminLayout from '@/app/Layouts/Admin/layout';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Profile = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      const response = await fetch('/api/user'); // Replace with your actual API endpoint
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Update user data on the backend
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    // Handle response, show notification on success
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
        <form onSubmit={handleUpdate} className="mt-6">
          <div className="mb-4">
            <Label className="block text-gray-700">Name</Label>
            <Input             
              type="text"
               value={userData.name}
              onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })}
              className="mt-1 p-2 w-full border rounded"
              
            />
          </div>
          <div className="mb-4">
            <Label className="block text-gray-700">Email</Label>
            <Input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>
    </AdminLayout>
  )
};

export default Profile;
