"use client"
import Input from '@/components/input/Input'
import axios from 'axios';
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function SignUpPage() {

    useEffect(() => {
        signOut({
            redirect: false,
        })
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const register = async () => {
        setLoading(true);

        try {
            axios.post("/api/auth/register", {
                email, password
            })

            toast.success('Registered successfully')

            router.push("/signin")

        } catch (error) {
            console.log(error)
            toast.error('error?.response?.data')
        } finally {
            setLoading(false);
        }

    }



    return (
        <div className='h-screen w-full flex items-center justify-center text-center bg-gray-100'>
            <div className="p-10 md:p-5 bg-white rounded-lg shadow-lg w-full md:w-3/4 xl:w-1/4">
                <div className='text-2xl text-center mb-5 font-bold uppercase'>Register</div>
                <form className='flex flex-col gap-4'>
                    <Input label='Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                    <Input label='Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} type='password' />
                    <button className='bg-gray-900 hover:bg-gray-800 transition-all duration-200 ease-in py-3 text-white rounded-lg shadow-lg mb-3 cursor-pointer' onClick={register} disabled={loading}>Register</button>
                </form>
                <div>
                    Already have an account? <Link href={"/signin"} className='font-bold text-gray-900'>Sign in</Link>
                </div>
            </div>
        </div>
    )
}
