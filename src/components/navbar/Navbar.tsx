"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../logout/LogoutButton";
import { useState } from "react";

const Navbar = () => {
    const { data: session } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const routes = [
        { name: "Home", href: session ? "/home" : "/", isVisible: true },
        { name: "Profile", href: "/profile", isVisible: !!session },
        { name: "Cart", href: "/cart", isVisible: !!session },
        { name: "Login", href: "/signin", isVisible: !session },
        { name: "Register", href: "/signup", isVisible: !session },
    ];

    return (
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
                                        <Link href={route.href} className="hover:text-blue-600 transition-colors">
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
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <ul className="flex flex-col gap-4 py-4">
                        {routes
                            .filter(route => route.isVisible)
                            .map(route => (
                                <li key={route.name}>
                                    <Link
                                        href={route.href}
                                        className="block hover:text-blue-600 transition-colors"
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
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
