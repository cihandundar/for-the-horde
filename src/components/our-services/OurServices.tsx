"use client";

import React, { useState } from "react";
import Image from "next/image";

type Service = {
    title: string;
    description: string;
    image: string;
};

export default function OurServices(): React.ReactElement {

    const services: Service[] = [
        {
            title: "Fast & Secure Delivery",
            description:
                "Your devices are delivered safely and quickly to your doorstep. We work with trusted shipping partners to ensure timely delivery.",
            image: "/images/services1.jpg",
        },
        {
            title: "Certified Technicians",
            description:
                "Our expert team tests and certifies all smartphones before listing. You get devices that are guaranteed to work like new.",
            image: "/images/services2.jpg",
        },
        {
            title: "Quality Control & Packaging",
            description:
                "Each phone is carefully inspected, cleaned, and packaged to meet the highest quality standards before shipment.",
            image: "/images/services3.jpg",
        },
        {
            title: "Phone Repair & Support",
            description:
                "We provide professional repair services and technical support for devices you purchase. Your satisfaction is our priority.",
            image: "/images/services4.jpg",
        },
    ];

    const [selectedService, setSelectedService] = useState<Service>(services[0]);

    return (
        <section className="py-[75px] bg-white sm:px-0 px-2">
            <div className="container max-w-screen-xl mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold mb-2 text-center uppercase">
                        Our Services
                    </div>
                    <div className="mb-10 sm:w-2/3 text-center">
                        We offer fast shipping, secure payment options, and expert customer
                        support to ensure the best shopping experience. Find the latest
                        smartphones at the best prices, all in one place.
                    </div>
                </div>

                <div className="flex flex-col justify-between items-center relative">
                    <Image
                        className="absolute left-0 lg:block hidden"
                        src="/images/arrow.png"
                        alt="arrow"
                        width={400}
                        height={400}
                    />

                    <div className="flex gap-4 justify-center mb-10">
                        {services.map((service: Service, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedService(service)}
                                className={`border rounded-lg overflow-hidden p-1 transition cursor-pointer shadow-lg ${selectedService.title === service.title
                                    ? "ring-2 border-gray-100"
                                    : "opacity-60 hover:opacity-100"
                                    }`}
                            >
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={100}
                                    height={80}
                                    className="object-cover w-[100px] h-[80px]"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col items-center text-center py-5 shadow-lg border-2 border-gray-100 rounded-lg bg-white">
                        <Image
                            src={selectedService.image}
                            alt={selectedService.title}
                            width={400}
                            height={400}
                        />
                        <div className="text-center flex flex-col items-center">
                            <div className="text-2xl font-bold">
                                {selectedService.title}
                            </div>
                            <div className="text-gray-700 leading-relaxed sm:w-1/2">
                                {selectedService.description}
                            </div>
                        </div>
                    </div>

                    <Image
                        className="absolute right-0 lg:block hidden"
                        src="/images/bottom-arrow.png"
                        alt="arrow"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
        </section>
    );
}
