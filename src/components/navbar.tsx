"use client";

import Link from "next/link";
import tamanasaIcon from "@/assets/tamanasa-icon.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        const supabase = createSupabaseBrowserClient();

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            subscription.unsubscribe();
        };
    }, []);

    async function handleLogout() {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        setUser(null);
        router.push("/login");
        router.refresh();
    }

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className={`flex justify-between items-center sticky top-5 z-50 px-10 mx-4 py-3 rounded-full transition-all duration-300 ${
                isScrolled 
                ? "bg-white/80 backdrop-blur-md shadow-lg border border-white/20" 
                : "bg-white shadow-md"
            }`}
        >
            <div className="flex flex-row justify-between items-center w-full">
                <Link href="/" className="flex flex-row justify-center items-center group">
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                        <Image src={tamanasaIcon} alt="Tamanasa Icon" width={70} height={70} />
                    </motion.div>
                    <div className="flex flex-col justify-center ml-3">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-green-600 to-teal-500">Tamanasa</h1>
                        <p className="text-sm font-medium text-gray-500 whitespace-nowrap">Teman Anak Nusantara</p>
                    </div>
                </Link>

                <div className="hidden lg:flex flex-row justify-center items-center space-x-1 bg-gray-100/50 p-1 rounded-full border border-gray-200">
                    <NavItem href="/" bgColorClass="bg-pink-500">Beranda</NavItem>
                    <NavItem href="/features" bgColorClass="bg-blue-500">Fitur</NavItem>
                    <NavItem href="/learn" bgColorClass="bg-green-500">Belajar</NavItem>
                    <NavItem href="/game" bgColorClass="bg-yellow-500">Game</NavItem>
                    <NavItem href="/about" bgColorClass="bg-purple-500">Tentang Kami</NavItem>
                    <NavItem href="/contact" bgColorClass="bg-cyan-400">Kontak</NavItem>
                </div>

                <div className="flex flex-row justify-center items-center space-x-4">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                            <Search size={20} />
                        </Link>
                    </motion.div>
                    
                    {user ? (
                        <div className="flex flex-row items-center space-x-3">
                            <Link href="/dashboard">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-lg px-6 py-2.5 rounded-full bg-gray-100 font-semibold text-gray-700 border border-gray-200"
                                >
                                    {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                                </motion.div>
                            </Link>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                                className="text-lg px-6 py-2.5 rounded-full bg-red-500 text-white font-bold shadow-md hover:bg-red-600 transition-colors cursor-pointer"
                            >
                                Keluar
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center space-x-3">
                            <Link href="/login">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="text-lg px-6 py-2.5 rounded-full bg-gray-100 font-semibold text-gray-700 border border-gray-200"
                                >
                                    Masuk
                                </motion.div>
                            </Link>
                            <Link href="/register">
                                <motion.div 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-lg px-6 py-2.5 rounded-full bg-green-600 text-white font-bold shadow-md hover:bg-green-700 transition-colors"
                                >
                                    Daftar
                                </motion.div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}

function NavItem({ href, children, bgColorClass }: { href: string; children: React.ReactNode, bgColorClass: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    
    return (
        <Link href={href} className="relative px-5 py-2.5 group">
            <motion.span 
                className={`relative z-10 text-lg font-bold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-600 group-hover:text-gray-900"
                }`}
            >
                {children}
            </motion.span>
            
            {isActive && (
                <motion.div
                    layoutId="navbar-active"
                    className={`absolute inset-0 rounded-full ${bgColorClass} shadow-md`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            
            {!isActive && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-gray-200 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.3 }}
                />
            )}
        </Link>
    );
}
