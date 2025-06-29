"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import LogoutButton from "../logout/LogoutButton";

type Route = {
    name: string;
    href: string;
    isVisible: boolean;
};

const Navbar = (): React.ReactElement => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const routes: Route[] = [
        { name: "Home", href: session ? "/home" : "/", isVisible: true },
        { name: "About Us", href: "/about-us", isVisible: true },
        { name: "Blog", href: "/blog", isVisible: true },
        { name: "Contact", href: "/contact-us", isVisible: true },
        { name: "Products", href: "/products", isVisible: true },
        { name: "Profile", href: "/profile", isVisible: !!session },
        { name: "Cart", href: "/cart", isVisible: !!session },
    ];


    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const currentRoute = routes.find(route => route.href === pathname);
        if (currentRoute) {
            document.title = currentRoute.name;
        } else {
            document.title = "Warcarft";
        }
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
                            </ul>


                            <ul className="flex gap-4 items-center">
                                {!session && (
                                    <>
                                        <li>
                                            <Link
                                                href="/signin"
                                                className={`relative italic pb-1 transition-all duration-300 
                                                before:absolute before:left-0 before:right-0 before:-bottom-0.5 
                                                before:h-[2px] before:bg-black before:scale-x-0 
                                                hover:before:scale-x-100 before:transition-transform before:origin-left 
                                                ${pathname === "/signin" ? "before:scale-x-100" : ""}`}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/signup"
                                                className={`relative italic pb-1 transition-all duration-300 
                                                before:absolute before:left-0 before:right-0 before:-bottom-0.5 
                                                before:h-[2px] before:bg-black before:scale-x-0 
                                                hover:before:scale-x-100 before:transition-transform before:origin-left 
                                                ${pathname === "/signup" ? "before:scale-x-100" : ""}`}
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
                                                className={`block italic ${pathname === route.href ? "font-bold" : ""
                                                    }`}
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
                                                className={`italic ${pathname === "/signin" ? "font-bold" : ""}`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/signup"
                                                className={`italic ${pathname === "/signup" ? "font-bold" : ""}`}
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
