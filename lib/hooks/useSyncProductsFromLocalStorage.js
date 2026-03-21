import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setProduct } from '@/lib/features/product/productSlice'

// Hook para sincronizar productos desde localStorage (solo en cliente)
export const useSyncProductsFromLocalStorage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Solo ejecutar en cliente
        if (typeof window === 'undefined') return

        try {
            const savedProducts = localStorage.getItem('gocart_products')
            if (savedProducts) {
                const parsedProducts = JSON.parse(savedProducts)
                dispatch(setProduct(parsedProducts))
            }
        } catch (error) {
            console.error('Error loading products from localStorage:', error)
        }
    }, [dispatch])
}
