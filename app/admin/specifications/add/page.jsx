'use client'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminSpecificationForm from '@/components/admin/AdminSpecificationForm'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function AddSpecificationPage() {
    const router = useRouter()

    const handleSubmit = async (specData) => {
        try {
            const response = await fetch('/api/specification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(specData),
            })

            if (!response.ok) {
                throw new Error('Error al crear especificación')
            }

            toast.success('Especificación creada exitosamente')
            router.push('/admin/specifications')
        } catch (error) {
            console.error('Error:', error)
            toast.error(error.message || 'Error al crear especificación')
        }
    }

    return (
        <AdminLayout>
            <div className='p-6 md:p-8 max-w-4xl'>
                <AdminSpecificationForm onSubmit={handleSubmit} />
            </div>
        </AdminLayout>
    )
}
