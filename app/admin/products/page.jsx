'use client'
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Link from "next/link"
import AdminProductCard from "@/components/admin/AdminProductCard"
import { toast } from "react-hot-toast"
import { PlusIcon } from "lucide-react"
import { setProduct } from "@/lib/features/product/productSlice"

export default function AdminProducts() {

    const dispatch = useDispatch()
    const products = useSelector(state => state.product.list)
    const [loading, setLoading] = useState(false)
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [page, setPage] = useState(1)
    const itemsPerPage = 10

    // Cargar más productos (scroll infinito)
    useEffect(() => {
        const start = 0
        const end = page * itemsPerPage
        setDisplayedProducts(products.slice(start, end))
    }, [page, products])

    // Listener para scroll infinito
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            if (scrollHeight - scrollTop - clientHeight < 100) {
                setPage(prev => prev + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleDelete = (productId) => {
        setLoading(true)
        try {
            const updatedProducts = products.filter(p => p.id !== productId)
            dispatch(setProduct(updatedProducts))
            toast.success("Producto eliminado exitosamente")
        } catch (error) {
            toast.error("Error al eliminar el producto")
        }
        setLoading(false)
    }

    return (
        <div className="text-slate-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                <h1 className="text-xl md:text-2xl">
                    Gestionar <span className="text-slate-800 font-medium">Productos</span>
                </h1>
                <Link href="/admin/products/add" className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white px-4 md:px-6 py-2.5 rounded-lg transition font-semibold text-sm whitespace-nowrap">
                    <PlusIcon size={18} />
                    <span className="hidden sm:inline">Agregar Producto</span>
                    <span className="sm:hidden">Agregar</span>
                </Link>
            </div>

            {/* Vista de productos */}
            {displayedProducts.length > 0 ? (
                <>
                    {/* Vista Desktop - Tabla */}
                    <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Imagen</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Nombre</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Categoría</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Precio</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Stock</th>
                                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedProducts.map((product) => (
                                    <AdminProductCard
                                        key={product.id}
                                        product={product}
                                        onDelete={handleDelete}
                                        isMobileView={false}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Vista Mobile - Cards */}
                    <div className="md:hidden grid grid-cols-1 gap-4">
                        {displayedProducts.map((product) => (
                            <AdminProductCard
                                key={product.id}
                                product={product}
                                onDelete={handleDelete}
                                isMobileView={true}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="text-center py-12 md:py-16 bg-white rounded-lg">
                    <p className="text-slate-600 mb-4">No hay productos cargados aún</p>
                    <Link href="/admin/products/add" className="inline-block px-6 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition font-semibold">
                        Crear el primer producto
                    </Link>
                </div>
            )}

            {displayedProducts.length < products.length && (
                <div className="text-center py-6 md:py-8">
                    <p className="text-slate-600 text-xs md:text-sm">
                        Mostrando {displayedProducts.length} de {products.length} productos
                    </p>
                </div>
            )}
        </div>
    )
}
