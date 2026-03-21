import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerData } from '../features/banner/bannerSlice'

export const useSyncBannerFromLocalStorage = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedBanner = localStorage.getItem('gocart_banner')
                if (savedBanner) {
                    dispatch(setBannerData(JSON.parse(savedBanner)))
                }
            } catch (error) {
                console.error('Error loading banner from localStorage:', error)
            }
        }
    }, [dispatch])
}
