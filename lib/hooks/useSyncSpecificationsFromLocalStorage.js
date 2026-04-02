import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSpecifications } from '@/lib/features/specification/specificationSlice'

export const useSyncSpecificationsFromLocalStorage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Cargar especificaciones desde la API
        dispatch(fetchSpecifications())
    }, [dispatch])
}
