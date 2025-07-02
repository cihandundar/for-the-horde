"use client"

import { useState } from "react"

type AccordionItem = {
    title: string
    content: string
}

const accordionData: AccordionItem[] = [
    {
        title: "Are the smartphones you sell brand new and original?",
        content: "Yes, all the smartphones we offer are 100% brand new, sealed, and sourced directly from authorized distributors or manufacturers."
    },
    {
        title: "Do your phones come with a warranty?",
        content: "Absolutely. Every device comes with an official manufacturer warranty, typically ranging from 12 to 24 months, depending on the brand."
    },
    {
        title: "Do you ship internationally?",
        content: "Yes, we offer international shipping to many countries. Shipping costs and delivery times vary depending on the destination."
    },
    {
        title: "How long does it take to receive my order?",
        content: "Orders are usually processed within 24 hours and delivered within 3–7 business days, depending on your location."
    },
    {
        title: "Can I return or exchange a phone if I’m not satisfied?",
        content: "Yes, we offer a 14-day return and exchange policy, as long as the product is unused and in its original packaging."
    },
    {
        title: "Are your prices inclusive of taxes?",
        content: "Prices displayed do not include taxes or customs duties. Any applicable charges will be calculated at checkout or upon delivery, based on your location."
    },
    {
        title: "Can I pay in installments?",
        content: "Yes, we support installment payments through select payment providers during checkout, depending on your country and eligibility."
    },
    {
        title: "Do you sell refurbished phones?",
        content: "We specialize in brand new devices, but we occasionally offer certified refurbished phones with detailed condition descriptions."
    },
    {
        title: "How can I track my order?",
        content: "Once your order is shipped, you will receive a tracking number via email or SMS to follow the delivery progress."
    },
    {
        title: "Is it safe to shop on your website?",
        content: "Yes, our website uses secure encryption and trusted payment gateways to ensure your personal and payment information is protected."
    }
]

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index))
    }

    return (

        <section className="py-[75px] bg-white sm:px-0 px-2">
            <div className="text-4xl text-center font-bold mb-5">
                FAQ
            </div>

            <div className="grid grid-cols-12 gap-4 max-w-screen-xl mx-auto mt-10">
                {accordionData.map((item, index) => (
                    <div key={index} className="col-span-12 md:col-span-6 border border-gray-300 rounded-lg overflow-hidden ">
                        <button
                            onClick={() => toggle(index)}
                            className="w-full text-left py-4 px-6 font-semibold flex justify-between items-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            {item.title}
                            <span className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                                ▼
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 px-6 ${openIndex === index ? "max-h-40 py-2" : "max-h-0"
                                }`}
                        >
                            <p className="text-gray-700">{item.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
