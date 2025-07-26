"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

const formatSegment = (segment: string) =>
    segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const Breadcrumb = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status !== "loading") {
            if (session) {
                if (pathname === "/") router.replace("/home");
            } else {
                if (pathname === "/home") router.replace("/");
            }
        }
    }, [session, status, pathname, router]);

    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    const lastSegment = segments[segments.length - 1];

    return (
        <section className="bg-black py-6 px-3 md:px-0">
            <div className="container mx-auto max-w-screen-xl flex justify-between items-center flex-wrap">
                <h1 className="text-3xl font-bold text-white md:mb-0 mb-4">
                    {formatSegment(lastSegment)}
                </h1>
                <nav className="text-sm text-white">
                    <ol className="flex flex-wrap items-center space-x-2">
                        <li>
                            <Link href={session ? "/home" : "/"}>
                                Home
                            </Link>
                        </li>
                        {segments.map((segment, index) => {
                            const href = "/" + segments.slice(0, index + 1).join("/");
                            return (
                                <li key={index} className="flex items-center space-x-2">
                                    <span>/</span>
                                    <Link
                                        href={href}
                                        className={`hover:underline text-white font-medium ${index === segments.length - 1}`}
                                    >
                                        {formatSegment(segment)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </section>
    );
};

export default Breadcrumb;
