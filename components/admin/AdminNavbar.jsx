'use client'
import Link from "next/link"
import Image from "next/image"
import { LogOutIcon, MenuIcon } from "lucide-react"
import logoArteJoyas from "@/assets/Logo Arte en Joyas PAGINA.png"

const AdminNavbar = ({ onLogout, sidebarOpen, setSidebarOpen }) => {

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <div className="flex items-center justify-between px-4 md:px-12 py-3 border-b border-slate-200 transition-all">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
                >
                    <MenuIcon size={24} className="text-slate-700" />
                </button>
                <Link href="/" className="relative">
                    <Image src={logoArteJoyas} alt="Arte en Joyas Logo" height={40} width={120} priority className="md:h-[50px] md:w-[150px]" />
                </Link>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
                <p className="hidden sm:block text-sm text-slate-700">Hola, Ruben</p>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 md:gap-2 bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-2 rounded-lg transition text-xs md:text-sm whitespace-nowrap"
                >
                    <LogOutIcon size={16} />
                    <span className="hidden sm:inline">Cerrar Sesión</span>
                    <span className="sm:hidden">Salir</span>
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar