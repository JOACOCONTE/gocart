'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"
import AdminLogin from "./AdminLogin"

const AdminLayout = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const checkAdminSession = () => {
        try {
            const session = localStorage.getItem("adminSession")
            if (session) {
                const parsedSession = JSON.parse(session)
                if (parsedSession.username === "Orfebre") {
                    setIsAdmin(true)
                }
            }
        } catch (error) {
            console.error("Error checking admin session:", error)
        }
        setLoading(false)
    }

    const handleLoginSuccess = () => {
        setIsAdmin(true)
    }

    const handleLogout = () => {
        localStorage.removeItem("adminSession")
        setIsAdmin(false)
    }

    useEffect(() => {
        checkAdminSession()
    }, [])

    return loading ? (
        <Loading />
    ) : isAdmin ? (
        <div className="flex flex-col h-screen">
            <AdminNavbar onLogout={handleLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar relative">
                {/* Overlay para mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="flex-1 h-full p-4 md:p-5 md:pl-12 md:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
    )
}

export default AdminLayout