import Image from "next/image";
import Link from "next/link";

const PublicNavbar = () => {
    const routes = [
        { name: "Home", href: "/" },
        { name: "Login", href: "/signin" },
        { name: "Register", href: "/signup" },
    ];

    return (
        <header className="shadow-lg py-3">
            <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={75}
                        height={75}
                    />
                </Link>
                <nav>
                    <ul className="flex gap-6">
                        {routes.map((route) => (
                            <li key={route.name}>
                                <Link href={route.href} className="hover:text-blue-600 transition-colors">
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default PublicNavbar; 