'use client'
import Link from "next/link"
import Image from "next/image"
import { LogOutIcon } from "lucide-react"
import logoArteJoyas from "@/assets/Logo Arte en Joyas PAGINA.png"

const AdminNavbar = ({ onLogout }) => {

    const handleLogout = () => {
        if (onLogout) {
            onLogout()
        }
    }

    return (
        <div className="flex items-center justify-between px-12 py-3 border-b border-slate-200 transition-all">
            <Link href="/" className="relative">
                <Image src={logoArteJoyas} alt="Arte en Joyas Logo" height={50} width={150} priority />
            </Link>
            <div className="flex items-center gap-3">
                <p>Hola, Ruben</p>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition text-sm"
                >
                    <LogOutIcon size={16} />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar