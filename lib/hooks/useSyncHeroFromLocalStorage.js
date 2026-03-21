import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setHeroData } from '../features/hero/heroSlice'

export const useSyncHeroFromLocalStorage = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const savedHero = localStorage.getItem('gocart_hero')
                if (savedHero) {
                    dispatch(setHeroData(JSON.parse(savedHero)))
                }
            } catch (error) {
                console.error('Error loading hero from localStorage:', error)
            }
        }
    }, [dispatch])
}
