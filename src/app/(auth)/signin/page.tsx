"use client"
import Input from '@/components/input/Input'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn, signOut } from 'next-auth/react';

export default function LoginPage() {

    useEffect(()  => {
        signOut({
            redirect: false,
        })
    },[])

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
        <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
            <div className="p-10 bg-white rounded-lg shadow-lg w-full sm:w-3/4">
                <div>Login</div>
                <form action="" className='flex flex-col gap-4'>
                    <Input label='Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                    <Input label='Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} type='password' />
                    <button onClick={login} disabled={loading}>Login</button>
                </form>
                <div>
                    Dont have an account? <Link href={"/signup"}>Sign up</Link>
                </div>
            </div>
        </div>
    )
}
