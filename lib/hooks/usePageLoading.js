'use client'
import { useTransition } from 'react'

export const usePageLoading = () => {
    const [isPending] = useTransition()
    return isPending
}
