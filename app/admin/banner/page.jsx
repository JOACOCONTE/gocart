'use client'
import AdminBannerForm from "@/components/admin/AdminBannerForm";
import { useSyncBannerFromLocalStorage } from "@/lib/hooks/useSyncBannerFromLocalStorage";

export default function AdminBannerPage() {
    useSyncBannerFromLocalStorage()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <AdminBannerForm />
        </div>
    )
}
