

import React from "react";
import Image from "next/image";

type Service = {
    title: string;
    description: string;
    image: string;
};

export default function OurServices(): React.ReactElement {

    const services: Service[] = [
        {
            title: "Customer Service Agent",
            description:
                "Our friendly and professional agents are available to assist you with real-time support, offering personalized help tailored to your needs.",
            image: "/images/our-services3.png",
        },
        {
            title: "Customer Service",
            description:
                "We provide technical assistance and solutions to ensure your systems and tools function smoothly. Our dedicated support team is always ready to help you stay on track.",
            image: "/images/our-services1.png",
        },

        {
            title: "Certified Technicians",
            description:
                "We prioritize your satisfaction with friendly and professional assistance, addressing your needs with attention to detail and empathy.",
            image: "/images/our-services2.png",
        },

    ];


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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {services?.map((item) => (
                        <div key={item.title} className="col-span-1 flex flex-col items-center justify-center text-center shadow-xl rounded-lg bg-white p-5 border-1 border-gray-300">
                            <Image
                                src={item?.image}
                                alt={item?.title}
                                width={100}
                                height={80}
                                className="object-contain w-[80px] h-[80px] "
                            />
                            <div className="text-lg py-3 font-bold">{item?.title}</div>
                            <div className="font-thin">{item?.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
