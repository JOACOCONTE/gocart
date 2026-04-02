import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import productReducer from './features/product/productSlice'
import addressReducer from './features/address/addressSlice'
import ratingReducer from './features/rating/ratingSlice'
import heroReducer from './features/hero/heroSlice'
import bannerReducer from './features/banner/bannerSlice'
import specificationReducer from './features/specification/specificationSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            product: productReducer,
            address: addressReducer,
            rating: ratingReducer,
            hero: heroReducer,
            banner: bannerReducer,
            specification: specificationReducer,
        },
    })
}