"use client"
import Input from '@/components/input/Input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, signOut } from 'next-auth/react';

export default function LoginPage() {

    useEffect(() => {
        signOut({
            redirect: false,
        })
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const login = async () => {
        setLoading(true);
        const login = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (login?.ok) {
            toast.success('Login successfully')
            router.push("/home")
        } else if (login?.error) {
            toast.error(login?.error)
        }

        setLoading(false);
    }

    return (
        <div className='h-screen w-full flex items-center justify-center text-center bg-gray-100'>
            <div className="p-10 md:p-5 bg-white rounded-lg shadow-lg w-full md:w-3/4 xl:w-1/4">
                <div className='text-4xl text-center mb-5 font-bold uppercase italic'>Login</div>
                <form className='flex flex-col gap-4'>
                    <Input label='Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                    <Input label='Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} type='password' />
                    <button className='bg-gray-900 hover:bg-gray-800 transition-all duration-200 ease-in py-3 text-white rounded-lg shadow-lg mb-3 cursor-pointer italic' onClick={login} disabled={loading}>Login</button>
                </form>
                <div className='italic'>
                    Dont have an account? <Link href={"/signup"} className='font-bold text-gray-900'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}
