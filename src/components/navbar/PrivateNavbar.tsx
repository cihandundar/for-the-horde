import Image from "next/image";
import Link from "next/link";
import LogoutButton from "../logout/LogoutButton";

const PrivateNavbar = () => {
    const routes = [
        { name: "Home", href: "/home" },
        { name: "Profile", href: "/profile" },
        { name: "Cart", href: "/cart" },
    ];

    return (
        <header className="shadow-lg py-3">
            <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
                <Link href="/(root)">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={75}
                        height={75}
                    />
                </Link>
                <nav>
                    <ul className="flex gap-6 items-center">
                        {routes.map((route) => (
                            <li key={route.name}>
                                <Link href={route.href} className="hover:text-blue-600 transition-colors">
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <LogoutButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default PrivateNavbar; 