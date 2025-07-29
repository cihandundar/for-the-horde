"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import LogoutButton from "../logout/LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaCartArrowDown } from "react-icons/fa";

type Route = {
    name: string;
    href: string;
    isVisible: boolean;
};

const Navbar = (): React.ReactElement => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.filter(item => item.quantity > 0).length;

    const routes: Route[] = [
        { name: "Home", href: session ? "/home" : "/", isVisible: true },
        { name: "About Us", href: "/about-us", isVisible: true },
        { name: "Blog", href: "/blog", isVisible: true },
        { name: "Contact", href: "/contact-us", isVisible: true },
        { name: "Products", href: "/products", isVisible: true },
        { name: "Profile", href: "/profile", isVisible: !!session },
    ];

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const currentRoute = routes.find(route => route.href === pathname);
        document.title = currentRoute ? currentRoute.name : "Warcraft";
    }, [pathname, session]);

    return (
        <>
            {session && (
                <div className="bg-black py-3 text-center">
                    <div className="container max-w-screen-xl mx-auto">
                        <div className="text-white flex items-center justify-center italic font-thin">
                            <Image
                                className="mr-2"
                                src="/images/banner-icon.png"
                                alt="BannerIcon"
                                width={32}
                                height={32}
                            />
                            Upgrade Your Mobile Life — Shop the Latest Smartphones at Unbeatable Prices!
                        </div>
                    </div>
                </div>
            )}

            <header className="shadow-lg py-3 bg-gray-100 sticky top-0 z-10">
                <div className="container max-w-screen-xl mx-auto md:px-0 px-4">
                    <div className="flex justify-between items-center">
                        <Link href={session ? "/home" : "/"}>
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={75}
                                height={75}
                            />
                        </Link>

                        <div className="flex items-center gap-3">
                            {session && (
                                <Link href="/cart" className="relative block md:hidden">
                                    <FaCartArrowDown className="text-3xl" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            )}

                            <button
                                className="md:hidden p-2"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* DESKTOP NAVIGATION */}
                        <nav className="hidden md:flex justify-between items-center w-full">
                            <ul className="flex gap-6 items-center mx-auto">
                                {routes
                                    .filter((route) => route.isVisible)
                                    .map((route) => (
                                        <li key={route.name}>
                                            <Link
                                                href={route.href}
                                                className={`relative italic pb-1 transition-all duration-300 
                                                before:absolute before:left-0 before:right-0 before:-bottom-0.5 
                                                before:h-[2px] before:bg-black before:scale-x-0 
                                                hover:before:scale-x-100 before:transition-transform before:origin-left 
                                                ${pathname === route.href ? "before:scale-x-100" : ""}`}
                                            >
                                                {route.name}
                                            </Link>
                                        </li>
                                    ))}
                                {session && (
                                    <li>
                                        <Link href="/cart" className="relative italic">
                                            Cart
                                            {cartCount > 0 && (
                                                <span className="ml-1 text-blue-600 font-bold">
                                                    ({cartCount})
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                )}
                            </ul>

                            <ul className="flex gap-4 items-center">
                                {!session && (
                                    <>
                                        <li>
                                            <Link
                                                href="/signin"
                                                className={`italic bg-gray-900 py-3 px-10 rounded-lg text-white shadow-xl cursor-pointer`}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/signup"
                                                className={`italic bg-gray-900 py-3 px-10 rounded-lg text-white shadow-xl cursor-pointer`}
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {session && (
                                    <li>
                                        <LogoutButton />
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>

                    {/* MOBILE NAVIGATION */}
                    <nav
                        className={`md:hidden absolute left-0 right-0 bg-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="container max-w-screen-xl mx-auto p-4">
                            <ul className="flex flex-col gap-4 py-4">
                                {routes
                                    .filter((route) => route.isVisible)
                                    .map((route) => (
                                        <li key={route.name}>
                                            <Link
                                                href={route.href}
                                                className={`block italic ${pathname === route.href ? "font-bold" : ""}`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {route.name}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                            <ul className="flex flex-col gap-4">
                                {!session && (
                                    <>
                                        <li>
                                            <Link
                                                href="/signin"
                                                className="block w-full text-center italic bg-gray-900 py-3 rounded-lg text-white shadow-xl cursor-pointer"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/signup"
                                                className="block w-full text-center italic bg-gray-900 py-3 rounded-lg text-white shadow-xl cursor-pointer"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                                {session && (
                                    <li>
                                        <LogoutButton />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
