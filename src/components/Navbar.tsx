"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import Link from "next/link";


export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Log Out",
    ];

    return (
        <>
            <div className="flex justify-center py-3 sticky top-0 z-50 items-center text-center backdrop-blur-lg bg-neutral-300/60 dark:bg-gray-950/60">
                <h1 className="text-4xl ">Gitsume</h1>
            </div>
        </>
    );
}
