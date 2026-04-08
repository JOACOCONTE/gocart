import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productDummyData } from '@/assets/assets'

// Async thunk para cargar productos desde la API
export const loadProductsFromAPI = createAsyncThunk(
    'product/loadFromAPI',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/product')
            if (!response.ok) throw new Error('Failed to fetch products')
            return await response.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: productDummyData,
        loading: false,
        error: null
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
            state.error = null
            // Guardar en localStorage como respaldo
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
            state.error = null
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('gocart_products')
                } catch (error) {
                    console.error('Error clearing products from localStorage:', error)
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProductsFromAPI.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadProductsFromAPI.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload || productDummyData
                // Guardar en localStorage como respaldo
                if (typeof window !== 'undefined') {
                    try {
                        localStorage.setItem('gocart_products', JSON.stringify(state.list))
                    } catch (error) {
                        console.error('Error saving products to localStorage:', error)
                    }
                }
            })
            .addCase(loadProductsFromAPI.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                // Mantener los datos actuales en caso de error
            })
    }
})

export const { setProduct, clearProduct } = productSlice.actions

export default productSlice.reducer