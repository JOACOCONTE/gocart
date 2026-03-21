import { createSlice } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
            // Guardar en localStorage
            if (typeof window !== 'undefined') {
                try {
                    localStorage.setItem('gocart_products', JSON.stringify(action.payload))
                } catch (error) {
                    console.error('Error saving products to localStorage:', error)
                }
            }
        },
        clearProduct: (state) => {
            state.list = []
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('gocart_products')
                } catch (error) {
                    console.error('Error clearing products from localStorage:', error)
                }
            }
        }
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer