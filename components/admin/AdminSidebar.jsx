'use client'

import { usePathname } from "next/navigation"
import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon, ShoppingBasketIcon, Sparkles, Bell, XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { assets } from "@/assets/assets"

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Banner', href: '/admin/banner', icon: Bell },
        { name: 'Hero', href: '/admin/hero', icon: Sparkles },
        { name: 'Productos', href: '/admin/products', icon: ShoppingBasketIcon },
        { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
        { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
        { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon  },
    ]

    return (
        <div className={`fixed md:relative h-full flex flex-col gap-5 border-r border-slate-200 bg-white z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:min-w-60 w-60`}>
            {/* Close button para mobile */}
            <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-lg transition"
            >
                <XIcon size={24} className="text-slate-700" />
            </button>

            <div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
                <Image className="w-14 h-14 rounded-full" src={assets.gs_logo} alt="" width={80} height={80} />
                <p className="text-slate-700">Hi, GreatStack</p>
            </div>

            <div className="max-sm:mt-6">
                {
                    sidebarLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${pathname === link.href && 'bg-slate-100 sm:text-slate-600'}`}
                        >
                            <link.icon size={18} className="sm:ml-5" />
                            <p className="max-sm:hidden">{link.name}</p>
                            {pathname === link.href && <span className="absolute bg-green-500 right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>}
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default AdminSidebar