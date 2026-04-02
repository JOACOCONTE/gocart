'use client'
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon, PlusIcon } from "lucide-react"
import { assets } from "@/assets/assets"
import { toast } from "react-hot-toast"

const AdminProductForm = ({ product = null, onSubmit }) => {
    
    const categories = ["Joyas", "Accesorios", "Pulseras", "Anillos", "Collares", "Pendientes", "Otros"]

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
        inStock: true,
        isFeatured: false,
    })
    const [loading, setLoading] = useState(false)

    // Si es edición, cargar datos del producto
    useEffect(() => {
        if (product) {
            setProductInfo({
                name: product.name,
                description: product.description,
                mrp: product.mrp,
                price: product.price,
                category: product.category,
                inStock: product.inStock || true,
                isFeatured: product.isFeatured || false,
            })
            // Cargar imágenes existentes
            if (product.images) {
                product.images.forEach((img, index) => {
                    if (index < 4) {
                        setImages(prev => ({
                            ...prev,
                            [index + 1]: img
                        }))
                    }
                })
            }
        }
    }, [product])

    const onChangeHandler = (e) => {
        if (e.target.type === 'checkbox' || e.target.name === 'isFeatured') {
            setProductInfo({ ...productInfo, [e.target.name]: e.target.checked })
        } else {
            setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
        }
    }

    const handleImageChange = (key, file) => {
        setImages({ ...images, [key]: file })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Validaciones
            if (!productInfo.name.trim()) {
                toast.error("El nombre del producto es requerido")
                setLoading(false)
                return
            }
            if (!productInfo.category) {
                toast.error("La categoría es requerida")
                setLoading(false)
                return
            }
            if (productInfo.price <= 0 || productInfo.mrp <= 0) {
                toast.error("Los precios deben ser mayores a 0")
                setLoading(false)
                return
            }

            // Obtener imágenes que sean archivos nuevos
            const newImages = Object.values(images).filter(img => img instanceof File)

            // Crear datos del producto
            const formData = {
                ...productInfo,
                images: newImages,
                existingImages: product ? Object.values(images).filter(img => typeof img === 'string') : []
            }

            await onSubmit(formData)
            setLoading(false)
        } catch (error) {
            toast.error("Error al guardar el producto")
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="text-slate-500 mb-28">
            {/* Header */}
            <div className="flex items-start md:items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <Link href="/admin/products" className="p-2 hover:bg-slate-100 rounded-lg transition flex-shrink-0 mt-1 md:mt-0">
                    <ArrowLeftIcon size={20} className="text-slate-600" />
                </Link>
                <h1 className="text-lg md:text-2xl">
                    {product ? "Editar" : "Agregar"} 
                    <span className="text-slate-800 font-medium"> Producto</span>
                </h1>
            </div>

            {/* Imágenes */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <p className="text-sm md:text-base text-slate-600 font-medium">Imágenes del Producto</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                    {Object.keys(images).map((key) => (
                        <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
                            <div className="w-full aspect-square bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition">
                                {images[key] ? (
                                    <Image
                                        src={typeof images[key] === 'string' ? images[key] : URL.createObjectURL(images[key])}
                                        alt={`Producto ${key}`}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <PlusIcon size={20} className="text-slate-400 mx-auto md:w-8 md:h-8" />
                                        <p className="text-xs text-slate-400 mt-1 md:mt-2">Img {key}</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id={`images${key}`}
                                onChange={(e) => handleImageChange(key, e.target.files[0])}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>

            {/* Nombre */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Nombre del Producto</span>
                <input
                    type="text"
                    name="name"
                    onChange={onChangeHandler}
                    value={productInfo.name}
                    placeholder="Ej: Anillo de Oro"
                    className="w-full md:max-w-lg p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition text-sm"
                    required
                />
            </label>

            {/* Descripción */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Descripción</span>
                <textarea
                    name="description"
                    onChange={onChangeHandler}
                    value={productInfo.description}
                    placeholder="Describe el producto en detalle..."
                    rows="5"
                    className="w-full md:max-w-2xl p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition resize-none text-sm"
                    required
                />
            </label>

            {/* Categoría */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Categoría</span>
                <select
                    name="category"
                    onChange={onChangeHandler}
                    value={productInfo.category}
                    className="w-full md:max-w-lg p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition text-sm"
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </label>

            {/* Precios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
                <label className="flex flex-col gap-2">
                    <span className="text-sm md:text-base text-slate-600 font-medium">Precio MRP</span>
                    <input
                        type="number"
                        name="mrp"
                        onChange={onChangeHandler}
                        value={productInfo.mrp}
                        placeholder="Precio original"
                        step="0.01"
                        min="0"
                        className="w-full p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition text-sm"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2">
                    <span className="text-sm md:text-base text-slate-600 font-medium">Precio de Venta</span>
                    <input
                        type="number"
                        name="price"
                        onChange={onChangeHandler}
                        value={productInfo.price}
                        placeholder="Precio actual"
                        step="0.01"
                        min="0"
                        className="w-full p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition text-sm"
                        required
                    />
                </label>
            </div>

            {/* Stock */}
            <label className="flex items-center gap-3 mb-6 md:mb-8 cursor-pointer">
                <input
                    type="checkbox"
                    name="inStock"
                    onChange={onChangeHandler}
                    checked={productInfo.inStock}
                    className="w-5 h-5 accent-slate-600"
                />
                <span className="text-sm md:text-base text-slate-600 font-medium">Disponible en Stock</span>
            </label>

            {/* Destacado en Home */}
            <label className="flex items-start sm:items-center gap-3 mb-6 md:mb-8 cursor-pointer p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition">
                <input
                    type="checkbox"
                    name="isFeatured"
                    onChange={onChangeHandler}
                    checked={productInfo.isFeatured}
                    className="w-5 h-5 mt-1 sm:mt-0 accent-amber-600 flex-shrink-0"
                />
                <div className="flex-1">
                    <span className="text-sm sm:text-base text-slate-700 font-medium block">Destacar en Home (Mejores Vendidos)</span>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">El admin puede seleccionar hasta 8 productos para mostrar en la sección de mejores vendidos</p>
                </div>
            </label>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 md:px-8 py-2.5 bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold rounded-lg transition text-sm md:text-base whitespace-nowrap"
                >
                    {loading ? "Guardando..." : product ? "Actualizar" : "Agregar"}
                </button>
                <Link href="/admin/products" className="px-6 md:px-8 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition text-sm md:text-base text-center whitespace-nowrap">
                    Cancelar
                </Link>
            </div>
        </form>
    )
}

export default AdminProductForm
