import { createSupabaseServerClient } from "@/lib/supabase-server";
import { logout } from "@/app/auth/actions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const fullName =
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

    return (
        <main className="flex-1 flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <h1 className="text-3xl font-bold text-center mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                        Selamat datang, {fullName}!
                    </p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-medium">
                                Email:
                            </span>
                            <span className="text-gray-900">{user.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-medium">
                                Nama:
                            </span>
                            <span className="text-gray-900">{fullName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-medium">
                                ID:
                            </span>
                            <span className="text-gray-900 text-sm font-mono">
                                {user.id.slice(0, 8)}...
                            </span>
                        </div>
                    </div>

                    <form action={logout}>
                        <button
                            id="logout-button"
                            type="submit"
                            className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Keluar
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
