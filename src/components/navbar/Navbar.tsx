"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../logout/LogoutButton";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routes = [
        { name: "Home", href: session ? "/home" : "/", isVisible: true },
        { name: "Profile", href: "/profile", isVisible: !!session },
        { name: "Cart", href: "/cart", isVisible: !!session },
        { name: "Login", href: "/signin", isVisible: !session },
        { name: "Register", href: "/signup", isVisible: !session },
    ];

    return (
        <>
            {session && (
                <div className="bg-black py-3 text-center">
                    <div className="container max-w-screen-xl mx-auto">
                        <div className="text-white flex items-center justify-center italic font-thin">
                            <Image className="mr-2" src="/images/banner-icon.png" alt="BannerIcon" width={32} height={32} />
                            Upgrade Your Mobile Life — Shop the Latest Smartphones at Unbeatable Prices!
                        </div>
                    </div>
                </div>
            )}

            <header className="shadow-lg py-3 bg-gray-100 sticky top-0 z-10">
                <div className="container max-w-screen-xl mx-auto px-4">
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
                        <nav className="hidden md:block">
                            <ul className="flex gap-6 items-center">
                                {routes
                                    .filter(route => route.isVisible)
                                    .map(route => (
                                        <li key={route.name}>
                                            <Link
                                                href={route.href}
                                                className={`italic hover:font-bold transition-all duration-150 ease-in-out ${pathname === route.href ? 'font-bold' : ''}`}
                                            >
                                                {route.name}
                                            </Link>
                                        </li>
                                    ))}
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
                        className={`md:hidden absolute left-0 right-0 bg-gray-100 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="container max-w-screen-xl mx-auto px-4">
                            <ul className="flex flex-col gap-4 py-4">
                                {routes
                                    .filter(route => route.isVisible)
                                    .map(route => (
                                        <li key={route.name}>
                                            <Link
                                                href={route.href}
                                                className={`block italic ${pathname === route.href ? 'font-bold' : ''}`}
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {route.name}
                                            </Link>
                                        </li>
                                    ))}
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
