'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpecifications, deleteSpecification } from '@/lib/features/specification/specificationSlice'
import AdminLayout from '@/components/admin/AdminLayout'
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function SpecificationsPage() {
    const dispatch = useDispatch()
    const specifications = useSelector(state => state.specification.list)
    const loading = useSelector(state => state.specification.loading)
    const [deleting, setDeleting] = useState(null)

    useEffect(() => {
        dispatch(fetchSpecifications())
    }, [dispatch])

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta especificación?')) {
            return
        }

        setDeleting(id)
        try {
            await dispatch(deleteSpecification(id))
            toast.success('Especificación eliminada')
        } catch (error) {
            toast.error('Error al eliminar la especificación')
        } finally {
            setDeleting(null)
        }
    }

    return (
        <AdminLayout>
            <div className='p-6 md:p-8'>
                {/* Header */}
                <div className='flex items-center justify-between mb-6 md:mb-8'>
                    <h1 className='text-2xl md:text-3xl font-medium text-slate-800'>
                        Especificaciones
                    </h1>
                    <Link 
                        href='/admin/specifications/add'
                        className='flex items-center gap-2 px-4 md:px-6 py-2.5 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg transition text-sm md:text-base'
                    >
                        <PlusIcon size={18} />
                        Agregar
                    </Link>
                </div>

                {/* Loading */}
                {loading && (
                    <div className='text-center py-12'>
                        <p className='text-slate-600'>Cargando especificaciones...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && specifications.length === 0 && (
                    <div className='text-center py-12 border border-dashed rounded-lg'>
                        <p className='text-slate-600 mb-4'>No hay especificaciones</p>
                        <Link 
                            href='/admin/specifications/add'
                            className='inline-block px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition'
                        >
                            Crear primera especificación
                        </Link>
                    </div>
                )}

                {/* Table */}
                {!loading && specifications.length > 0 && (
                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm md:text-base'>
                            <thead>
                                <tr className='border-b border-slate-200'>
                                    <th className='text-left py-3 px-4 font-semibold text-slate-700'>Título</th>
                                    <th className='text-left py-3 px-4 font-semibold text-slate-700'>Descripción</th>
                                    <th className='text-left py-3 px-4 font-semibold text-slate-700'>Orden</th>
                                    <th className='text-center py-3 px-4 font-semibold text-slate-700'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {specifications.map((spec) => (
                                    <tr key={spec.id} className='border-b border-slate-100 hover:bg-slate-50 transition'>
                                        <td className='py-4 px-4'>
                                            <p className='font-medium text-slate-800'>{spec.title}</p>
                                        </td>
                                        <td className='py-4 px-4'>
                                            <p className='text-slate-600 text-sm line-clamp-2'>{spec.description}</p>
                                        </td>
                                        <td className='py-4 px-4'>
                                            <span className='inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium'>
                                                {spec.order}
                                            </span>
                                        </td>
                                        <td className='py-4 px-4'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <Link 
                                                    href={`/admin/specifications/${spec.id}`}
                                                    className='p-2 hover:bg-slate-200 rounded-lg transition'
                                                    title='Editar'
                                                >
                                                    <PencilIcon size={16} className='text-slate-600' />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(spec.id)}
                                                    disabled={deleting === spec.id}
                                                    className='p-2 hover:bg-red-100 rounded-lg transition disabled:opacity-50'
                                                    title='Eliminar'
                                                >
                                                    <TrashIcon size={16} className='text-red-600' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
