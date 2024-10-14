"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@ui/index"
import { Menu } from "lucide-react"

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About Us" },
]

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("")

    return (
        <header className="bg-black text-white border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold" onClick={() => setActiveLink("/")}>
                    Liberdex
                </Link>
                <nav className="hidden md:flex space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors ${activeLink === item.href
                                ? "text-white border-b-2 border-white"
                                : "text-gray-400 hover:text-gray-200"
                                }`}
                            onClick={() => setActiveLink(item.href)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href={"/auth/register"}>
                        <Button
                            className="hidden md:inline-flex bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Register
                        </Button>
                        <Button variant="ghost" className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}