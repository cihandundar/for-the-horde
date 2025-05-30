"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "../logout/LogoutButton";

const Navbar = () => {
    const { data: session } = useSession();

    const routes = [
        { name: "Home", href: session ? "/home" : "/", isVisible: true },
        { name: "Profile", href: "/profile", isVisible: !!session },
        { name: "Cart", href: "/cart", isVisible: !!session },
        { name: "Login", href: "/signin", isVisible: !session },
        { name: "Register", href: "/signup", isVisible: !session },
    ];

    return (
        <header className="shadow-lg py-3">
            <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
                <Link href={session ? "/home" : "/"}>
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={75}
                        height={75}
                    />
                </Link>
                <nav>
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
        </header>
    );
};

export default Navbar;
