import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setHeroData } from '../features/hero/heroSlice'

export const useSyncHeroFromLocalStorage = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchHeroFromServer = async () => {
            try {
                const response = await fetch('/api/hero')
                if (response.ok) {
                    const hero = await response.json()
                    // Transformar datos del servidor al formato esperado por Redux
                    const heroData = {
                        mainSection: {
                            badge: hero.mainTitle ? 'Noticias' : '',
                            badgeText: hero.mainSubtitle || '',
                            title: hero.mainTitle || '',
                            subtitle1: '',
                            subtitle2: '',
                            image: hero.mainImage || ''
                        },
                        bestProducts: {
                            title: hero.bestTitle || '',
                            description: hero.bestDescription || '',
                            image: hero.bestImage || ''
                        },
                        discounts: {
                            title: hero.discountTitle || '',
                            description: hero.discountDescription || '',
                            image: hero.discountImage || ''
                        }
                    }
                    dispatch(setHeroData(heroData))
                } else {
                    // Fallback a localStorage si el servidor falla
                    if (typeof window !== 'undefined') {
                        const savedHero = localStorage.getItem('gocart_hero')
                        if (savedHero) {
                            dispatch(setHeroData(JSON.parse(savedHero)))
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading hero from server:', error)
                // Fallback a localStorage
                if (typeof window !== 'undefined') {
                    try {
                        const savedHero = localStorage.getItem('gocart_hero')
                        if (savedHero) {
                            dispatch(setHeroData(JSON.parse(savedHero)))
                        }
                    } catch (err) {
                        console.error('Error loading hero from localStorage:', err)
                    }
                }
            }
        }

        fetchHeroFromServer()
    }, [dispatch])
}
