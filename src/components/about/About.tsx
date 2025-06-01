import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function About() {


    type selectedImages = {
        id: number;
        src: string;
        title: string;
        desc: string;
        link: string;
    };


    const selectedImages = [
        {
            id: 1,
            src: "/images/about2.jpg",
            title: "Efficient Inventory Management",
            desc: "Our team ensures that every product is accurately stored, tracked, and managed. With advanced warehouse systems and expert staff, we maintain complete control over inventory logistics to meet your business needs.",
            link: "/about"

        },
        {
            id: 2,
            src: "/images/about1.jpg",
            title: "Seamless Order Processing",
            desc: "From the moment an order is placed to the final delivery, we streamline the entire process with automation and precision. We guarantee quick, error-free fulfillment so your customers receive what they need, when they need it.",
            link: "/about"
        },
        {
            id: 3,
            src: "/images/about3.jpg",
            title: "Smart Logistics & Technology",
            desc: "Using smart barcode scanning and cutting-edge tools, we optimize the packaging and shipping process. Our tech-first approach increases efficiency, reduces errors, and enhances the overall customer experience.",
            link: "/about"
        },
    ];




    return (
        <section className='bg-white py-[60px]'>
            <div className="container max-w-screen-xl mx-auto">
                <div className="flex flex-wrap justify-center">
                    {selectedImages.map((item) => (
                        <div key={item.id} className="lg:w-1/3 md:w-1/2 w-full p-4">
                            <div className="p-4 flex flex-col items-center rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
                                <Image
                                    src={item.src}
                                    alt={`About ${item.id}`}
                                    width={1024}
                                    height={1024}
                                />
                                <div className="text-xl font-bold italic">{item.title}</div>
                                <div className="text-center my-2 text-xs">{item.desc}</div>
                                <Link href={item.link} className='w-full bg-black border border-black text-center py-3 text-white rounded-lg mt-2 italic hover:bg-white hover:text-black transition-all duration-300 ease-in-out'>See More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
