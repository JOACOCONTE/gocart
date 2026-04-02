'use client'
import { dummyAdminDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import OrdersAreaChart from "@/components/OrdersAreaChart"
import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminDashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.products, icon: ShoppingBasketIcon },
        { title: 'Total Revenue', value: currency + dashboardData.revenue, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: dashboardData.orders, icon: TagsIcon },
        { title: 'Total Stores', value: dashboardData.stores, icon: StoreIcon },
    ]

    const fetchDashboardData = async () => {
        setDashboardData(dummyAdminDashboardData)
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500">
            <h1 className="text-xl md:text-2xl">Admin <span className="text-slate-800 font-medium">Dashboard</span></h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 my-8 md:my-10">
                {
                    dashboardCardsData.map((card, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-10 border border-slate-200 p-3 md:p-4 px-4 md:px-6 rounded-lg">
                            <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-center sm:text-left">
                                <p className="text-slate-600">{card.title}</p>
                                <b className="text-lg md:text-2xl font-medium text-slate-700">{card.value}</b>
                            </div>
                            <card.icon size={50} className="w-10 h-10 md:w-11 md:h-11 p-2 md:p-2.5 text-slate-400 bg-slate-100 rounded-full flex-shrink-0" />
                        </div>
                    ))
                }
            </div>

            {/* Area Chart */}
            <OrdersAreaChart allOrders={dashboardData.allOrders} />
        </div>
    )
}