"use client";

import { login } from "@/app/auth/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const registered = searchParams.get("registered");
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await login(formData);
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
                        Masuk
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                        Masuk ke akun Tamanasa kamu
                    </p>

                    {registered && (
                        <div
                            id="register-success"
                            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
                        >
                            Registrasi berhasil! Silakan cek email untuk
                            verifikasi, lalu masuk.
                        </div>
                    )}

                    {error && (
                        <div
                            id="login-error"
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                placeholder="Masukkan password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <button
                            id="login-submit"
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-6">
                        Belum punya akun?{" "}
                        <Link
                            href="/register"
                            className="text-green-600 font-semibold hover:underline"
                        >
                            Daftar
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
