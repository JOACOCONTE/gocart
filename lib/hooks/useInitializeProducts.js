import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductsFromAPI } from '@/lib/features/product/productSlice'

export default function useInitializeProducts() {
    const dispatch = useDispatch()
    const { loading, list } = useSelector(state => state.product)

    useEffect(() => {
        // Solo cargar si no hay productos cargados
        if (list.length === 0 && !loading) {
            dispatch(loadProductsFromAPI())
        }
    }, [dispatch, loading, list])
}
