"use client";

import { useSession } from "next-auth/react";
import PublicNavbar from "./PublicNavbar";
import PrivateNavbar from "./PrivateNavbar";

const Navbar = () => {
    const { data: session } = useSession();

    return session ? <PrivateNavbar /> : <PublicNavbar />;
};

export default Navbar;
