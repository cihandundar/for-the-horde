"use client"
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Input from '@/components/input/Input'
import Image from 'next/image'
import React, { useState } from 'react'

export default function ContactUs() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    return (
        <>
            <Breadcrumb />

            <section className='py-[75px] bg-white sm:px-0 px-2'>
                <div className="container max-w-screen-xl mx-auto">
                    <div className="flex gap-5 items-center flex-col-reverse lg:flex-row justify-between lg:px-0 px-4">
                        <Image src="/images/contact.jpg" alt="ContactUs" width={500} height={500} />
                        <form action="" method="POST" className="flex flex-col gap-5 shadow-xl p-5 rounded-lg w-full">
                            <Input value={name} onChange={(e) => setName(e.target.value)} label="Name" />
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email" />
                            <Input value={message} onChange={(e) => setMessage(e.target.value)} label="Message" />
                            <button className='bg-blue-500 hover:bg-blue-400 transition-all duration-200 ease-in py-3 text-white rounded-lg shadow-lg mb-3 cursor-pointer italic'>Send</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
