'use client'
import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminSpecificationForm from '@/components/admin/AdminSpecificationForm'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'

export default function EditSpecificationPage() {
    const router = useRouter()
    const params = useParams()
    const [specification, setSpecification] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSpecification = async () => {
            try {
                const response = await fetch(`/api/specification/${params.id}`)
                if (!response.ok) {
                    throw new Error('Especificación no encontrada')
                }
                const data = await response.json()
                setSpecification(data)
            } catch (error) {
                toast.error(error.message)
                router.push('/admin/specifications')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchSpecification()
        }
    }, [params.id, router])

    const handleSubmit = async (specData) => {
        try {
            const response = await fetch(`/api/specification/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(specData),
            })

            if (!response.ok) {
                throw new Error('Error al actualizar especificación')
            }

            toast.success('Especificación actualizada exitosamente')
            router.push('/admin/specifications')
        } catch (error) {
            console.error('Error:', error)
            toast.error(error.message || 'Error al actualizar especificación')
        }
    }

    if (loading) {
        return (
            <AdminLayout>
                <div className='p-6 md:p-8 text-center'>
                    <p className='text-slate-600'>Cargando...</p>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className='p-6 md:p-8 max-w-4xl'>
                {specification && (
                    <AdminSpecificationForm 
                        specification={specification} 
                        onSubmit={handleSubmit} 
                    />
                )}
            </div>
        </AdminLayout>
    )
}
