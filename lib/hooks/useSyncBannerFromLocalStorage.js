import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerData } from '../features/banner/bannerSlice'

export const useSyncBannerFromLocalStorage = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchBannerFromServer = async () => {
            try {
                const response = await fetch('/api/banner')
                if (response.ok) {
                    const banner = await response.json()
                    dispatch(setBannerData(banner))
                } else {
                    // Fallback a localStorage si el servidor falla
                    if (typeof window !== 'undefined') {
                        const savedBanner = localStorage.getItem('gocart_banner')
                        if (savedBanner) {
                            dispatch(setBannerData(JSON.parse(savedBanner)))
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading banner from server:', error)
                // Fallback a localStorage
                if (typeof window !== 'undefined') {
                    try {
                        const savedBanner = localStorage.getItem('gocart_banner')
                        if (savedBanner) {
                            dispatch(setBannerData(JSON.parse(savedBanner)))
                        }
                    } catch (err) {
                        console.error('Error loading banner from localStorage:', err)
                    }
                }
            }
        }

        fetchBannerFromServer()
    }, [dispatch])
}
