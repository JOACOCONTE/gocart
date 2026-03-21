'use client'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Loader } from 'lucide-react'

export const LoadingOverlay = () => {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleStart = () => {
            setIsLoading(true)
        }

        const handleStop = () => {
            setIsLoading(false)
        }

        // Mostrar loader cuando cambia la ruta
        handleStart()

        // Esconder loader después de que la página cargue
        const timer = setTimeout(() => {
            handleStop()
        }, 500)

        return () => clearTimeout(timer)
    }, [pathname, searchParams])

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999] pointer-events-auto">
            <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4">
                <Loader className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-gray-700 font-medium">Cargando...</p>
            </div>
        </div>
    )
}
