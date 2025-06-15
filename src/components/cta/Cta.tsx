import Image from 'next/image'
import React from 'react'
import { FaTruckFast } from "react-icons/fa6";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import Link from 'next/link';


export default function Cta(): React.ReactElement {
    return (
        <section className="py-[75px] sm:px-0 px-2">
            <div className="container max-w-screen-xl mx-auto">
                <div className="flex items-center lg:flex-row flex-col justify-around shadow-lg rounded-lg py-10 border border-gray-100 bg-white">
                    <Image src={"/images/cta-image.png"} alt="cta-image" width={500} height={250} />
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="text-4xl font-thin uppercase">Ready for an upgrade?</div>
                        <div className="text-4xl">Discover the Latest Smartphones</div>
                        <div className=" text-4xl font-thin">Powerful. Stylish. Affordable.</div>
                        <div className="flex flex-wrap justify-center my-3 gap-3">
                            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 py-5 shadow-xl rounded-lg flex flex-col items-center border border-gray-100 sm:mb-0 mb-5">
                                <FaTruckFast className='text-2xl mb-2' />
                                <span>Fast Shipping</span>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 py-5 shadow-xl rounded-lg flex flex-col items-center border border-gray-100 sm:mb-0 mb-5">
                                <RiGitRepositoryPrivateFill className='text-2xl mb-2' />
                                <span>Secure Payment</span>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 py-5 shadow-xl rounded-lg flex flex-col items-center border border-gray-100 sm:mb-0 mb-5">
                                <FaUsers className='text-2xl mb-2' />
                                <span>Customer Satisfaction</span>
                            </div>
                            <div className="w-full sm:w-1/2 lg:w-1/3 px-2 py-5 shadow-xl rounded-lg flex flex-col items-center border border-gray-100 sm:mb-0 mb-5">
                                <MdOutlineSupportAgent className='text-2xl mb-2' />
                                <span>24/7 Support</span>
                            </div>
                        </div>
                        <Link href="/products" className='bg-blue-400 py-5 px-20 text-center rounded-lg font-bold shadow-lg hover:bg-blue-300'>Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
