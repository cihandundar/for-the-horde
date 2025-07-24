"use client"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <button className="bg-red-800 py-3 px-10 rounded-lg text-white shadow-xl cursor-pointer" onClick={handleLogout}>
            Logout
        </button>
    )
}
