"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "@/redux/features/cardSlice";
import { RootState } from "@/redux/store";

const coupons = [
    { code: "SPIN5", discountPercent: 5 },
    { code: "SPIN10", discountPercent: 10 },
    { code: "SPIN15", discountPercent: 15 },
    { code: "SPIN20", discountPercent: 20 },
    { code: "SPIN25", discountPercent: 25 },
    { code: "SPIN30", discountPercent: 30 },
];

export default function SpinWheel() {
    const dispatch = useDispatch();
    const discount = useSelector((state: RootState) => state.cart.discount);

    const [isOpen, setIsOpen] = useState(false);
    const [spinning, setSpinning] = useState(false);
    const [resultCoupon, setResultCoupon] = useState<null | typeof coupons[0]>(null);
    const [hasSpun, setHasSpun] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const savedHasSpun = localStorage.getItem("hasSpunWheel");
        const savedCoupon = localStorage.getItem("wonCouponCode");
        if (savedHasSpun === "true" && savedCoupon) {
            const coupon = coupons.find(c => c.code === savedCoupon);
            if (coupon) {
                setHasSpun(true);
                setResultCoupon(coupon);
                dispatch(applyCoupon(coupon.code));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const openModal = () => {
        if (hasSpun) return;
        setIsOpen(true);
        setResultCoupon(null);
    };

    const closeModal = () => {
        if (spinning) return;
        setIsOpen(false);
    };

    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        setResultCoupon(null);

        const randomIndex = Math.floor(Math.random() * coupons.length);
        const wonCoupon = coupons[randomIndex];

        const degreesPerSlice = 360 / coupons.length;
        const fullRotations = 5;
        const targetDegree = fullRotations * 360 + (randomIndex * degreesPerSlice) + degreesPerSlice / 2;

        if (wheelRef.current) {
            wheelRef.current.style.transition = "none";
            wheelRef.current.style.transform = `rotate(0deg)`;

            setTimeout(() => {
                if (wheelRef.current) {
                    wheelRef.current.style.transition = "transform 4s ease-out";
                    wheelRef.current.style.transform = `rotate(${targetDegree}deg)`;
                }
            }, 20);
        }

        setTimeout(() => {
            setSpinning(false);
            setResultCoupon(wonCoupon);
            setHasSpun(true);
            dispatch(applyCoupon(wonCoupon.code));

            localStorage.setItem("hasSpunWheel", "true");
            localStorage.setItem("wonCouponCode", wonCoupon.code);

            if (wheelRef.current) {
                wheelRef.current.style.transition = "none";
                wheelRef.current.style.transform = `rotate(${(randomIndex * degreesPerSlice) + degreesPerSlice / 2}deg)`;
            }

            setTimeout(() => setIsOpen(false), 3000);
        }, 4020);
    };

    if (hasSpun) {
        return (
            <div className="text-center p-4 bg-green-100 rounded-md text-green-700 font-semibold mb-3">
                🎉 You have {discount}% discount with code: <code>{resultCoupon?.code}</code>
            </div>
        );
    }

    if (!isOpen) {
        return (
            <button
                onClick={openModal}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 cursor-pointer"
            >
                Try Your Luck! Spin for Discount
            </button>
        );
    }

    return (
        <>
            <div onClick={closeModal} className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"></div>

            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg flex flex-col items-center"
                >
                    <button
                        onClick={closeModal}
                        className="self-end text-gray-700 hover:text-gray-900 text-3xl font-bold mb-2 cursor-pointer"
                        disabled={spinning}
                    >
                        &times;
                    </button>

                    <div
                        ref={wheelRef}
                        className="w-64 h-64 rounded-full border-2 border-gray-800 relative"
                        style={{
                            background:
                                "conic-gradient(#f87171 0% 16.66%, #fbbf24 16.66% 33.33%, #34d399 33.33% 50%, #60a5fa 50% 66.66%, #a78bfa 66.66% 83.33%, #f43f5e 83.33% 100%)",
                        }}
                    >
                        {coupons.map((c, i) => {
                            const rotation = (360 / coupons.length) * i + (360 / coupons.length) / 2;
                            return (
                                <div
                                    key={c.code}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        width: "50%",
                                        height: 20,
                                        transformOrigin: "0% 50%",
                                        transform: `rotate(${rotation}deg) translateX(50%)`,
                                        color: "#222",
                                        fontWeight: "bold",
                                        fontSize: 12,
                                    }}
                                >
                                    {c.discountPercent}%
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={spin}
                        disabled={spinning}
                        className="mt-6 cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {spinning ? "Spinning..." : "Spin the Wheel!"}
                    </button>

                    {resultCoupon && (
                        <div className="mt-4 text-center text-green-600 font-bold text-lg mb-3">
                            🎉 You won {resultCoupon.discountPercent}% off! Code: <code>{resultCoupon.code}</code>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
