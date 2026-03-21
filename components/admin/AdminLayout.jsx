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
            <AdminNavbar onLogout={handleLogout} />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-12 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
    )
}

export default AdminLayout