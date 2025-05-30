"use client"
import Input from '@/components/input/Input'
import axios from 'axios';
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function SignUpPage() {

    useEffect(()  => {
        signOut({
            redirect: false,
        })
    },[])

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
        <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
            <div className="p-10 bg-white rounded-lg shadow-lg w-full sm:w-3/4">
                <div>Register</div>
                <form action="" className='flex flex-col gap-4'>
                    <Input label='Email' value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
                    <Input label='Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} type='password' />
                    <button onClick={register}>Register</button>
                </form>
                <div>
                    Already have an account? <Link href={"/signin"}>Sign in</Link>
                </div>
            </div>
        </div>
    )
}
