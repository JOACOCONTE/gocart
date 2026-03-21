import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    banner: {
        isVisible: true,
        title: 'Get 20% OFF on Your First Order!',
        couponCode: 'NEW20',
        buttonText: 'Claim Offer',
        gradient: 'from-violet-500 via-[#9938CA] to-[#E0724A]'
    }
}

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.banner = action.payload
            // Guardar en localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_banner', JSON.stringify(action.payload))
                } catch (error) {
                    console.error('Error saving banner data to localStorage:', error)
                }
            }
        },
        toggleBannerVisibility: (state) => {
            state.banner.isVisible = !state.banner.isVisible
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_banner', JSON.stringify(state.banner))
                } catch (error) {
                    console.error('Error updating banner visibility:', error)
                }
            }
        },
        clearBanner: (state) => {
            state.banner = initialState.banner
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('gocart_banner')
                } catch (error) {
                    console.error('Error clearing banner data:', error)
                }
            }
        }
    }
})

export const { setBannerData, toggleBannerVisibility, clearBanner } = bannerSlice.actions

export default bannerSlice.reducer
