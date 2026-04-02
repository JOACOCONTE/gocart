'use client'
import Image from "next/image"
import Link from "next/link"
import { Edit2Icon, TrashIcon } from "lucide-react"

const AdminProductCard = ({ product, onDelete, isMobileView }) => {
    
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
            onDelete(product.id)
        }
    }

    // Vista móvil - Card
    if (isMobileView) {
        return (
            <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex gap-4 mb-4">
                    <Image 
                        src={product.images[0]} 
                        alt={product.name} 
                        width={80} 
                        height={80} 
                        className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{product.category}</p>
                        <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.inStock ? 'En stock' : 'Agotado'}
                        </span>
                    </div>
                </div>
                <div className="mb-4 pb-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mt-2">
                        <span className="text-slate-400 line-through">{currency}{product.mrp}</span>
                        <span className="ml-2 font-bold text-slate-800">{currency}{product.price}</span>
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}`} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition text-xs font-medium">
                        <Edit2Icon size={14} />
                        Editar
                    </Link>
                    <button 
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition text-xs font-medium"
                    >
                        <TrashIcon size={14} />
                        Eliminar
                    </button>
                </div>
            </div>
        )
    }

    // Vista desktop - Tabla
    return (
        <tr className="border-b border-slate-200 hover:bg-slate-50 transition text-sm">
            <td className="py-4 px-4">
                <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    width={50} 
                    height={50} 
                    className="w-12 h-12 object-cover rounded"
                />
            </td>
            <td className="py-4 px-4 text-slate-700 font-medium max-w-xs truncate">{product.name}</td>
            <td className="py-4 px-4 text-slate-600 text-xs">{product.category}</td>
            <td className="py-4 px-4 text-slate-600 text-sm">
                <span className="text-slate-400 line-through text-xs">{currency}{product.mrp}</span>
                <span className="ml-2 font-semibold text-slate-700">{currency}{product.price}</span>
            </td>
            <td className="py-4 px-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'En stock' : 'Agotado'}
                </span>
            </td>
            <td className="py-4 px-4 flex items-center gap-2">
                <Link href={`/admin/products/${product.id}`} className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1.5 rounded-lg transition text-xs">
                    <Edit2Icon size={14} />
                    <span className="hidden sm:inline">Editar</span>
                </Link>
                <button 
                    onClick={handleDelete}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1.5 rounded-lg transition text-xs"
                >
                    <TrashIcon size={14} />
                    <span className="hidden sm:inline">Eliminar</span>
                </button>
            </td>
        </tr>
    )
}

export default AdminProductCard
