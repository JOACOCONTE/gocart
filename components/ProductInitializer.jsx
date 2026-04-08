'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadProductsFromAPI } from '@/lib/features/product/productSlice'

export default function ProductInitializer() {
    const dispatch = useDispatch()

    useEffect(() => {
        // Cargar productos de la API cuando el componente se monta
        dispatch(loadProductsFromAPI())
    }, [dispatch])

    return null
}
