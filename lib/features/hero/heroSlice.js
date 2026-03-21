import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heroData: {
        mainSection: {
            badge: 'Noticias',
            badgeText: 'Ultimas novedades de Arte en Joyas',
            title: 'Diseño, técnica y pasión por el detalle.',
            subtitle1: 'Tecnología y Creatividad',
            subtitle2: 'Piezas únicas',
            buttonText: 'LEARN MORE',
            image: null,
        },
        bestProducts: {
            title: 'Best products',
            text: 'View more',
            bgColor: 'orange',
            image: null,
        },
        discounts: {
            title: '20% discounts',
            text: 'View more',
            bgColor: 'blue',
            image: null,
        }
    }
}

const heroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {
        setHeroData: (state, action) => {
            state.heroData = action.payload
            // Guardar en localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_hero', JSON.stringify(action.payload))
                } catch (error) {
                    console.error('Error saving hero data to localStorage:', error)
                }
            }
        },
        updateMainSection: (state, action) => {
            state.heroData.mainSection = { ...state.heroData.mainSection, ...action.payload }
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_hero', JSON.stringify(state.heroData))
                } catch (error) {
                    console.error('Error updating hero data:', error)
                }
            }
        },
        updateBestProducts: (state, action) => {
            state.heroData.bestProducts = { ...state.heroData.bestProducts, ...action.payload }
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_hero', JSON.stringify(state.heroData))
                } catch (error) {
                    console.error('Error updating hero data:', error)
                }
            }
        },
        updateDiscounts: (state, action) => {
            state.heroData.discounts = { ...state.heroData.discounts, ...action.payload }
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_hero', JSON.stringify(state.heroData))
                } catch (error) {
                    console.error('Error updating hero data:', error)
                }
            }
        },
        clearHero: (state) => {
            state.heroData = initialState.heroData
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('gocart_hero')
                } catch (error) {
                    console.error('Error clearing hero data:', error)
                }
            }
        }
    }
})

export const { setHeroData, updateMainSection, updateBestProducts, updateDiscounts, clearHero } = heroSlice.actions

export default heroSlice.reducer
