'use client'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMainSection, updateBestProducts, updateDiscounts } from '@/lib/features/hero/heroSlice'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import toast from 'react-hot-toast'
import HeroPreview from './HeroPreview'

export default function AdminHeroForm() {
    const dispatch = useDispatch()
    const heroData = useSelector(state => state.hero.heroData)
    
    const [activeTab, setActiveTab] = useState('main')
    const [previewMain, setPreviewMain] = useState(heroData.mainSection.image)
    const [previewBest, setPreviewBest] = useState(heroData.bestProducts.image)
    const [previewDiscount, setPreviewDiscount] = useState(heroData.discounts.image)

    const [formMain, setFormMain] = useState(heroData.mainSection)
    const [formBest, setFormBest] = useState(heroData.bestProducts)
    const [formDiscount, setFormDiscount] = useState(heroData.discounts)

    const [heroId, setHeroId] = useState(null)
    const [loading, setLoading] = useState(false)

    // Cargar hero del servidor
    useEffect(() => {
        const loadHero = async () => {
            try {
                const response = await fetch('/api/hero')
                if (response.ok) {
                    const hero = await response.json()
                    if (hero.id) {
                        setHeroId(hero.id)
                        // Transformar datos del servidor al formato esperado
                        setFormMain({
                            ...formMain,
                            title: hero.mainTitle,
                            image: hero.mainImage
                        })
                        setFormBest({
                            ...formBest,
                            title: hero.bestTitle,
                            description: hero.bestDescription,
                            image: hero.bestImage
                        })
                        setFormDiscount({
                            ...formDiscount,
                            title: hero.discountTitle,
                            description: hero.discountDescription,
                            image: hero.discountImage
                        })
                        setPreviewMain(hero.mainImage)
                        setPreviewBest(hero.bestImage)
                        setPreviewDiscount(hero.discountImage)
                    }
                }
            } catch (error) {
                console.error('Error loading hero:', error)
            }
        }
        
        loadHero()
    }, [])

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const base64 = event.target.result
                
                if (type === 'main') {
                    setPreviewMain(base64)
                    setFormMain({ ...formMain, image: base64 })
                } else if (type === 'best') {
                    setPreviewBest(base64)
                    setFormBest({ ...formBest, image: base64 })
                } else if (type === 'discount') {
                    setPreviewDiscount(base64)
                    setFormDiscount({ ...formDiscount, image: base64 })
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSaveMain = async () => {
        setLoading(true)
        try {
            const heroPayload = {
                mainTitle: formMain.title,
                mainSubtitle: formMain.subtitle1,
                mainImage: formMain.image,
                bestTitle: formBest.title,
                bestDescription: formBest.description || formBest.text,
                bestImage: formBest.image,
                discountTitle: formDiscount.title,
                discountDescription: formDiscount.description || formDiscount.text,
                discountImage: formDiscount.image
            }

            if (heroId) {
                const response = await fetch(`/api/hero/${heroId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(heroPayload)
                })
                if (!response.ok) throw new Error('Error updating hero')
            } else {
                const response = await fetch('/api/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(heroPayload)
                })
                if (!response.ok) throw new Error('Error creating hero')
                const created = await response.json()
                setHeroId(created.id)
            }

            dispatch(updateMainSection(formMain))
            toast.success('Sección principal guardada en el servidor!')
        } catch (error) {
            console.error('Error saving hero:', error)
            toast.error('Error al guardar')
        } finally {
            setLoading(false)
        }
    }

    const handleSaveBest = async () => {
        setLoading(true)
        try {
            const heroPayload = {
                mainTitle: formMain.title,
                mainSubtitle: formMain.subtitle1,
                mainImage: formMain.image,
                bestTitle: formBest.title,
                bestDescription: formBest.description || formBest.text,
                bestImage: formBest.image,
                discountTitle: formDiscount.title,
                discountDescription: formDiscount.description || formDiscount.text,
                discountImage: formDiscount.image
            }

            if (heroId) {
                const response = await fetch(`/api/hero/${heroId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(heroPayload)
                })
                if (!response.ok) throw new Error('Error updating hero')
            } else {
                const response = await fetch('/api/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(heroPayload)
                })
                if (!response.ok) throw new Error('Error creating hero')
                const created = await response.json()
                setHeroId(created.id)
            }

            dispatch(updateBestProducts(formBest))
            toast.success('Best products guardado en el servidor!')
        } catch (error) {
            console.error('Error saving hero:', error)
            toast.error('Error al guardar')
        } finally {
            setLoading(false)
        }
    }

    const handleSaveDiscount = async () => {
        setLoading(true)
        try {
            const heroPayload = {
                mainTitle: formMain.title,
                mainSubtitle: formMain.subtitle1,
                mainImage: formMain.image,
                bestTitle: formBest.title,
                bestDescription: formBest.description || formBest.text,
                bestImage: formBest.image,
                discountTitle: formDiscount.title,
                discountDescription: formDiscount.description || formDiscount.text,
                discountImage: formDiscount.image
            }

            if (heroId) {
                const response = await fetch(`/api/hero/${heroId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(heroPayload)
                })
                if (!response.ok) throw new Error('Error updating hero')
            } else {
                const response = await fetch('/api/hero', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(heroPayload)
                })
                if (!response.ok) throw new Error('Error creating hero')
                const created = await response.json()
                setHeroId(created.id)
            }

            dispatch(updateDiscounts(formDiscount))
            toast.success('Descuentos guardados en el servidor!')
        } catch (error) {
            console.error('Error saving hero:', error)
            toast.error('Error al guardar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 px-4 md:px-6">Editar Hero</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6">
                {/* Formulario - 2 columnas */}
                <div className="lg:col-span-2">
                    <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 border-b bg-white rounded-t-lg px-3 md:px-6 pt-4 md:pt-6 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('main')}
                            className={`pb-3 px-2 md:px-4 font-medium transition text-xs md:text-sm whitespace-nowrap ${
                                activeTab === 'main'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Sección Principal
                        </button>
                        <button
                            onClick={() => setActiveTab('best')}
                            className={`pb-3 px-2 md:px-4 font-medium transition text-xs md:text-sm whitespace-nowrap ${
                                activeTab === 'best'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Best Products
                        </button>
                        <button
                            onClick={() => setActiveTab('discount')}
                            className={`pb-3 px-2 md:px-4 font-medium transition text-xs md:text-sm whitespace-nowrap ${
                                activeTab === 'discount'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Descuentos
                        </button>
                    </div>

                    <div className="bg-white rounded-b-lg p-4 md:p-6 shadow">
            {/* MAIN SECTION */}
            {activeTab === 'main' && (
                <div className="space-y-4 md:space-y-6">
                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">Badge</label>
                        <input
                            type="text"
                            value={formMain.badge}
                            onChange={(e) => setFormMain({ ...formMain, badge: e.target.value })}
                            className="w-full px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Ej: Noticias"
                        />
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">Texto del Badge</label>
                        <input
                            type="text"
                            value={formMain.badgeText}
                            onChange={(e) => setFormMain({ ...formMain, badgeText: e.target.value })}
                            className="w-full px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="Ej: Ultimas novedades de Arte en Joyas"
                        />
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">Título Principal</label>
                        <textarea
                            value={formMain.title}
                            onChange={(e) => setFormMain({ ...formMain, title: e.target.value })}
                            className="w-full px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 md:h-24 text-sm"
                            placeholder="Título del hero"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                        <div>
                            <label className="block text-xs md:text-sm font-medium mb-2">Subtítulo 1</label>
                            <input
                                type="text"
                                value={formMain.subtitle1}
                                onChange={(e) => setFormMain({ ...formMain, subtitle1: e.target.value })}
                                className="w-full px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="Ej: Tecnología y Creatividad"
                            />
                        </div>
                        <div>
                            <label className="block text-xs md:text-sm font-medium mb-2">Subtítulo 2</label>
                            <input
                                type="text"
                                value={formMain.subtitle2}
                                onChange={(e) => setFormMain({ ...formMain, subtitle2: e.target.value })}
                                className="w-full px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="Ej: Piezas únicas"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">Texto del Botón</label>
                        <input
                            type="text"
                            value={formMain.buttonText}
                            onChange={(e) => setFormMain({ ...formMain, buttonText: e.target.value })}
                            className="w-full px-3 md:px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="LEARN MORE"
                        />
                    </div>

                    <div>
                        <label className="block text-xs md:text-sm font-medium mb-2">Imagen</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
                            {previewMain ? (
                                <div className="relative inline-block">
                                    <Image
                                        src={previewMain}
                                        alt="preview"
                                        width={200}
                                        height={200}
                                        className="rounded-lg max-h-40 md:max-h-48"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewMain(null)
                                            setFormMain({ ...formMain, image: null })
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                                    <Upload size={20} className="text-gray-400" />
                                    <span className="text-xs md:text-sm text-gray-600">Click para subir imagen</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'main')}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleSaveMain}
                        className="w-full bg-blue-600 text-white py-2.5 md:py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm md:text-base"
                    >
                        Guardar Sección Principal
                    </button>
                </div>
            )}

            {/* BEST PRODUCTS SECTION */}
            {activeTab === 'best' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Título</label>
                        <input
                            type="text"
                            value={formBest.title}
                            onChange={(e) => setFormBest({ ...formBest, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Best products"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Texto</label>
                        <input
                            type="text"
                            value={formBest.text}
                            onChange={(e) => setFormBest({ ...formBest, text: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="View more"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Color de fondo</label>
                        <select
                            value={formBest.bgColor}
                            onChange={(e) => setFormBest({ ...formBest, bgColor: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="orange">Naranja</option>
                            <option value="blue">Azul</option>
                            <option value="red">Rojo</option>
                            <option value="green">Verde</option>
                            <option value="purple">Púrpura</option>
                            <option value="pink">Rosa</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Imagen</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {previewBest ? (
                                <div className="relative inline-block">
                                    <Image
                                        src={previewBest}
                                        alt="preview"
                                        width={150}
                                        height={150}
                                        className="rounded-lg max-h-40"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewBest(null)
                                            setFormBest({ ...formBest, image: null })
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer flex items-center justify-center gap-2">
                                    <Upload size={20} className="text-gray-400" />
                                    <span className="text-gray-600">Click para subir imagen</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'best')}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleSaveBest}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Guardar Best Products
                    </button>
                </div>
            )}

            {/* DISCOUNTS SECTION */}
            {activeTab === 'discount' && (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Título</label>
                        <input
                            type="text"
                            value={formDiscount.title}
                            onChange={(e) => setFormDiscount({ ...formDiscount, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="20% discounts"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Texto</label>
                        <input
                            type="text"
                            value={formDiscount.text}
                            onChange={(e) => setFormDiscount({ ...formDiscount, text: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="View more"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Color de fondo</label>
                        <select
                            value={formDiscount.bgColor}
                            onChange={(e) => setFormDiscount({ ...formDiscount, bgColor: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="blue">Azul</option>
                            <option value="orange">Naranja</option>
                            <option value="red">Rojo</option>
                            <option value="green">Verde</option>
                            <option value="purple">Púrpura</option>
                            <option value="pink">Rosa</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Imagen</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            {previewDiscount ? (
                                <div className="relative inline-block">
                                    <Image
                                        src={previewDiscount}
                                        alt="preview"
                                        width={150}
                                        height={150}
                                        className="rounded-lg max-h-40"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewDiscount(null)
                                            setFormDiscount({ ...formDiscount, image: null })
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer flex items-center justify-center gap-2">
                                    <Upload size={20} className="text-gray-400" />
                                    <span className="text-gray-600">Click para subir imagen</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'discount')}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleSaveDiscount}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Guardar Descuentos
                    </button>
                </div>
            )}
                    </div>
                </div>

                {/* Preview - 1 columna */}
                <div className="lg:col-span-1">
                    <HeroPreview activeTab={activeTab} formMain={formMain} formBest={formBest} formDiscount={formDiscount} />
                </div>
            </div>
        </div>
    )
}
