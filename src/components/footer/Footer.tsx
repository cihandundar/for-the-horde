import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <footer className='bg-gray-100 py-[75px]'>
                <div className='container max-w-screen-xl mx-auto'>

                    <div className="grid grid-cols-12 lg:gap-28 md:gap-10 lg:px-0 px-4">
                        <div className="flex flex-col gap-5 lg:col-span-3 col-span-12  lg:mb-0 mb-5">
                            <Link href={"/"}>
                                <Image
                                    src="/images/logo.png"
                                    alt="Logo"
                                    width={75}
                                    height={75}
                                />
                            </Link>
                            <div >
                                Warcraft - Your trusted partner in smartphones, accessories and tech gadgets.
                            </div>

                            <div className="flex gap-4 items-center text-2xl">
                                <Link href={"/"} >
                                    <FaFacebook />
                                </Link>
                                <Link href={"/"}>
                                    <FaInstagram />
                                </Link>
                                <Link href={"/"}>
                                    <FaSquareXTwitter />
                                </Link>
                                <Link href={"/"}>
                                    <FaTiktok />
                                </Link>

                            </div>

                            <Image src={"/images/payment-logo.png"} alt="PaymentLogo" width={300} height={100} />

                        </div>
                        <div className="flex flex-col lg:flex-row justify-between flex-wrap lg:col-span-5 col-span-12">
                            <div className="flex flex-col">
                                <div className="text-xl italic font-bold mb-5">Shop</div>
                                <ul className="flex flex-col gap-3 text-sm">
                                    <li>
                                        <Link href={"/"}>Smartphones</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Accessories</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Tablets</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Deals</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col my-5 lg:my-0">
                                <div className="text-xl italic font-bold mb-5">Support</div>
                                <ul className="flex flex-col gap-3 text-sm">
                                    <li>
                                        <Link href={"/"}>FAQ</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Shipping & Returns</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Warranty Policy</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Track My Order</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col  mb-5 lg:mb-0">
                                <div className="text-xl italic font-bold mb-5">Company</div>
                                <ul className="flex flex-col gap-3 text-sm">
                                    <li>
                                        <Link href={"/"}>About Us</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Blog / News</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href={"/"}>Terms of Service</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3005.2923866964675!2d-117.76699!3d33.658297!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dcde82907fe8bb%3A0xcb7104743d635730!2sBlizzard%20Entertainment!5e1!3m2!1str!2sus!4v1751053897312!5m2!1str!2sus"
                                className="w-full h-full rounded-lg shadow-lg"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps - Blizzard Entertainment"
                            />

                        </div>

                    </div >

                </div >

            </footer >
            <div className="bg-black">
                <div className="py-4 text-center">
                    <div className="text-white">
                        © 2025 Warcarft. All rights reserved.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer