"use client";

import { register } from "@/app/auth/actions";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function RegisterPage() {
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Password tidak cocok");
            return;
        }

        if (password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        startTransition(async () => {
            const result = await register(formData);
            if (result?.error) {
                setError(result.error);
            }
        });
    }

    return (
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Daftar
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                        Buat akun Tamanasa baru
                    </p>

                    {error && (
                        <div
                            id="register-error"
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Nama lengkap"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="nama@email.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Minimal 6 karakter"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Konfirmasi Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Ulangi password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            id="register-submit"
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Memproses..." : "Daftar"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-6">
                        Sudah punya akun?{" "}
                        <Link
                            href="/login"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Masuk
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
