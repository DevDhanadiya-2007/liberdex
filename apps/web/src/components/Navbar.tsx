'use client'

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Button } from "@ui/index"
import { Menu, Loader2 } from "lucide-react"
import { useAuth } from "../lib/useAuth"

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
]

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("")
    const { isAuthenticated, logout, checkAuthStatus } = useAuth()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    useEffect(() => {
        checkAuthStatus()
    }, [checkAuthStatus])

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true)
        try {
            await logout()
            router.push('/')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setIsLoggingOut(false)
        }
    }, [logout, router])

    return (
        <header className="bg-black text-white border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold" onClick={() => setActiveLink("/")}>
                    Liberdex
                </Link>
                <div className="flex items-center space-x-6">
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
                    {isAuthenticated ? (
                        <Button
                            variant="outline"
                            className="hidden md:inline-flex bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                'Logout'
                            )}
                        </Button>
                    ) : (
                        <Link href="/auth/login">
                            <Button
                                variant="outline"
                                className="hidden md:inline-flex bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                    <Button variant="ghost" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </header>
    )
}