'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const usePageLoading = () => {
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setIsLoading(false)
    }, [pathname, searchParams])

    return isLoading
}
