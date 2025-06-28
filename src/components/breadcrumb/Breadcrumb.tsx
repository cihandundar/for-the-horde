"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const formatSegment = (segment: string) =>
    segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const Breadcrumb = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    const lastSegment = segments[segments.length - 1];

    return (
        <div className="bg-black py-6 px-3 md:px-0">
            <div className="container mx-auto max-w-screen-xl flex justify-between items-center ">
                <h1 className="text-3xl font-bold text-white">
                    {formatSegment(lastSegment)}
                </h1>
                <nav className="text-sm text-white">
                    <ol className="flex flex-wrap items-center space-x-2">
                        <li>
                            <Link href="/">
                                Home
                            </Link>
                        </li>
                        {segments.map((segment, index) => {
                            const href = "/" + segments.slice(0, index + 1).join("/");
                            return (
                                <li key={index} className="flex items-center space-x-2">
                                    <span >/</span>
                                    <Link
                                        href={href}
                                        className={`hover:underline ${index === segments.length - 1
                                            ? "text-white font-medium"
                                            : "text-blue-600"
                                            }`}
                                    >
                                        {formatSegment(segment)}
                                    </Link>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>

        </div>
    );
};

export default Breadcrumb;
