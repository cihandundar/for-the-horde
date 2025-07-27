"use client"
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdExit } from "react-icons/io";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
    };

    return (
        <button className="bg-gray-900 py-3 px-10 rounded-lg text-white shadow-xl cursor-pointer flex items-center gap-2" onClick={handleLogout}>
            Logout<IoMdExit className='text-white mt-1 text-xl' />
        </button>
    )
}
