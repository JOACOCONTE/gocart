'use client'
import Image from "next/image"
import Link from "next/link"
import { Edit2Icon, TrashIcon } from "lucide-react"

const AdminProductCard = ({ product, onDelete }) => {
    
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
            onDelete(product.id)
        }
    }

    return (
        <tr className="border-b border-slate-200 hover:bg-slate-50 transition">
            <td className="py-4 px-4">
                <Image 
                    src={product.images[0]} 
                    alt={product.name} 
                    width={50} 
                    height={50} 
                    className="w-12 h-12 object-cover rounded"
                />
            </td>
            <td className="py-4 px-4 text-slate-700 font-medium">{product.name}</td>
            <td className="py-4 px-4 text-slate-600 text-sm">{product.category}</td>
            <td className="py-4 px-4 text-slate-600">
                <span className="text-slate-400 line-through text-sm">{currency}{product.mrp}</span>
                <span className="ml-2 font-semibold text-slate-700">{currency}{product.price}</span>
            </td>
            <td className="py-4 px-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.inStock ? 'En stock' : 'Agotado'}
                </span>
            </td>
            <td className="py-4 px-4 flex items-center gap-3">
                <Link href={`/admin/products/${product.id}`} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition text-xs">
                    <Edit2Icon size={14} />
                    Editar
                </Link>
                <button 
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition text-xs"
                >
                    <TrashIcon size={14} />
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default AdminProductCard
