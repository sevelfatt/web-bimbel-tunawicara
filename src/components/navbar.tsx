"use client";

import Link from "next/link";
import tamanasaIcon from "@/assets/tamanasa-icon.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const supabase = createSupabaseBrowserClient();

        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function handleLogout() {
        const supabase = createSupabaseBrowserClient();
        await supabase.auth.signOut();
        setUser(null);
        router.push("/login");
        router.refresh();
    }

    return (
        <nav className="flex justify-between items-center sticky top-5 z-50 bg-white rounded-full px-10 mx-2 py-2">
            <div className="flex flex-row justify-center items-left w-full">
                <Image src={tamanasaIcon} alt="Tamanasa Icon" width={100} height={100} />
                <div className="flex flex-col justify-center items-left w-fit">
                    <h1 className="text-2xl font-bold">Tamanasa</h1>
                    <p className="text-xl whitespace-nowrap">Teman Anak Nusantara</p>
                </div>
                <div className="flex flex-row w-full justify-center items-center space-x-2 ">
                    <NavItem href="/" bgColorClass="bg-pink-500">Beranda</NavItem>
                    <NavItem href="/features" bgColorClass="bg-blue-500">Fitur</NavItem>
                    <NavItem href="/learn" bgColorClass="bg-green-500">Belajar</NavItem>
                    <NavItem href="/game" bgColorClass="bg-yellow-500">Game</NavItem>
                    <NavItem href="/about" bgColorClass="bg-purple-500">Tentang Kami</NavItem>
                    <NavItem href="/contact" bgColorClass="bg-cyan-400">Kontak</NavItem>
                </div>
                <div className="flex flex-row w-fit justify-center items-center space-x-6">
                    <Link href="/" className="text-xl p-4 rounded-full bg-mist-300 font-medium"><Search /></Link>
                    {user ? (
                        <div className="flex flex-row w-fit justify-center items-center space-x-4">
                            <Link href="/dashboard" className="text-xl px-7 py-3 rounded-full bg-mist-300 font-medium whitespace-nowrap">
                                {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-xl px-7 py-3 rounded-full bg-red-500 text-white font-semibold whitespace-nowrap cursor-pointer"
                            >
                                Keluar
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-row w-fit justify-center items-center space-x-4">
                            <Link href="/login" className="text-xl px-7 py-3 rounded-full bg-mist-300 font-medium">Masuk</Link>
                            <Link href="/register" className="text-xl px-7 py-3 rounded-full bg-green-600 text-white font-semibold">Daftar</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavItem({ href, children, bgColorClass }: { href: string; children: React.ReactNode, bgColorClass: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link href={href} className={`text-xl font-bold px-5 py-3 rounded-full ${isActive ? bgColorClass + " text-white" : ""}`}>
            {children}
        </Link>
    );
}
