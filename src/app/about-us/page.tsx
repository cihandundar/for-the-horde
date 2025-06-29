import React from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import Image from 'next/image'
import { FaRegSmile } from "react-icons/fa";

export default function AboutUs() {
    return (
        <>
            <Breadcrumb />
            <section className='py-[75px] bg-white sm:px-0 px-2'>
                <div className="container max-w-screen-xl mx-auto">
                    <div className="flex items-center flex-col-reverse lg:flex-row  justify-between lg-px-0 px-4">
                        <Image src="/images/about1.jpg" alt="AboutUs" width={500} height={500} />
                        <div className="text-xl shadow-xl p-5 rounded-lg">
                            Welcome to <b>Warcarft</b>, your trusted destination for the latest smartphones, mobile accessories, and unbeatable deals in mobile technology.
                            At <b>Warcarft</b>, we believe that technology should be accessible, reliable, and exciting. Founded with a passion for innovation and customer satisfaction, our mission is to empower individuals with cutting-edge mobile devices that enhance their everyday lives. Whether you are a tech enthusiast, a business professional, or someone simply looking for a reliable phone to stay connected, we’ve got the right product for you.
                        </div>
                    </div>
                    <div className="flex items-center flex-col lg:flex-row  justify-between lg-px-0 px-4">
                        <div className="text-xl shadow-xl p-5 rounded-lg">
                            <div className="text-4xl font-bold mb-5 border-b-3 pb-2  w-100">
                                Our Journey
                            </div>
                            Since our inception, we’ve grown from a small team of tech lovers into a leading online retailer in the mobile market. Our growth is powered by a relentless commitment to quality, value, and outstanding customer service. Over the years, we ve partnered with some of the world’s top mobile brands including Apple, Samsung, Xiaomi, OnePlus, and more — ensuring that our customers have access to the newest devices and innovations as soon as they hit the market.
                        </div>
                        <Image src="/images/about2.jpg" alt="AboutUs" width={500} height={500} />
                    </div>
                    <div className="flex items-center flex-col lg:flex-row justify-between lg-px-0 px-4">
                        <Image src="/images/about3.jpg" alt="AboutUs" width={500} height={500} />
                        <div className="shadow-xl p-5 rounded-lg">
                            <div className="text-4xl font-bold mb-5 border-b-3 pb-2  w-100">
                                What We Offer
                            </div>
                            <ul className='text-xl flex flex-col gap-5'>
                                <li>
                                    <strong>Latest Smartphones:</strong> From flagship models to budget-friendly choices, we offer a wide range of smartphones tailored to every need and lifestyle.
                                </li>
                                <li>
                                    <strong>Authentic Accessories:</strong> Chargers, cases, headphones, and more — all carefully selected for performance and compatibility.
                                </li>
                                <li>
                                    <strong>Exclusive Deals:</strong> Regular promotions, flash sales, and seasonal offers designed to bring you the best value.
                                </li>
                                <li>
                                    <strong>Expert Support:</strong> Our knowledgeable team is always ready to help — whether it’s product recommendations, order inquiries, or after-sales assistance.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=" shadow-xl p-5 rounded-lg mb-5">
                        <div className="text-4xl font-bold mb-5 border-b-3 pb-2  w-100">
                            Why Choose Us?
                        </div>
                        <ul className="text-xl flex flex-col gap-5 ">
                            <li><strong>Trusted Quality:</strong> Every product we sell is 100% original and thoroughly inspected for quality and performance.</li>
                            <li><strong>Fast & Secure Shipping:</strong> We deliver quickly and safely, right to your doorstep.</li>
                            <li><strong>Customer-First Approach:</strong> Your satisfaction is our top priority. We are here to ensure your shopping experience is smooth and enjoyable.</li>
                            <li><strong>Easy Returns & Warranty:</strong> Shop with confidence knowing that we stand behind every product we sell.</li>
                        </ul>
                    </div>

                    <div className="shadow-xl p-5 rounded-lg mb-10">
                        <div className="text-4xl font-bold mb-5 border-b-3 pb-2  w-100">
                            Our Vision
                        </div>
                        <div className="text-xl">
                            To become the leading online platform for mobile technology, recognized for excellence in product curation, customer experience, and digital convenience. We envision a world where everyone has easy access to the devices they need to communicate, create, and grow.
                        </div>
                    </div>



                    <div className="shadow-xl p-5 rounded-lg bg-black">
                        <div className="text-4xl font-bold flex items-center gap-3 justify-center text-white">
                            - Thank you for choosing Warcarft <FaRegSmile /> -
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
