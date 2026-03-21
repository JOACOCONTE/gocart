'use client'
import AdminHeroForm from "@/components/admin/AdminHeroForm";
import { useSyncHeroFromLocalStorage } from "@/lib/hooks/useSyncHeroFromLocalStorage";

export default function AdminHeroPage() {
    useSyncHeroFromLocalStorage()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <AdminHeroForm />
        </div>
    )
}
