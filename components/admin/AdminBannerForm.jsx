'use client'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBannerData, toggleBannerVisibility } from '@/lib/features/banner/bannerSlice'
import { Copy, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AdminBannerForm() {
    const dispatch = useDispatch()
    const banner = useSelector(state => state.banner.banner)
    
    const [formData, setFormData] = useState(banner)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSave = () => {
        dispatch(setBannerData(formData))
        toast.success('Banner actualizado!')
    }

    const handleToggleVisibility = () => {
        dispatch(toggleBannerVisibility())
        toast.success(banner.isVisible ? 'Banner ocultado' : 'Banner visible')
    }

    const handleCopyCoupon = () => {
        navigator.clipboard.writeText(formData.couponCode)
        toast.success('Código copiado!')
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Editar Banner</h1>

            <div className="space-y-6">
                {/* Visibility Toggle */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">Estado del Banner</h3>
                            <p className="text-sm text-gray-600">
                                {banner.isVisible ? '✓ Banner visible' : '✗ Banner oculto'}
                            </p>
                        </div>
                        <button
                            onClick={handleToggleVisibility}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                                banner.isVisible
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                            }`}
                        >
                            {banner.isVisible ? (
                                <>
                                    <Eye size={18} />
                                    Ocultar
                                </>
                            ) : (
                                <>
                                    <EyeOff size={18} />
                                    Mostrar
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2">Texto Principal</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Get 20% OFF on Your First Order!"
                    />
                </div>

                {/* Coupon Code */}
                <div>
                    <label className="block text-sm font-medium mb-2">Código de Cupón</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleChange}
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ej: NEW20"
                        />
                        <button
                            onClick={handleCopyCoupon}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                            <Copy size={16} />
                            Copiar
                        </button>
                    </div>
                </div>

                {/* Button Text */}
                <div>
                    <label className="block text-sm font-medium mb-2">Texto del Botón</label>
                    <input
                        type="text"
                        name="buttonText"
                        value={formData.buttonText}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Claim Offer"
                    />
                </div>

                {/* Gradient */}
                <div>
                    <label className="block text-sm font-medium mb-2">Gradiente (Tailwind Classes)</label>
                    <input
                        type="text"
                        name="gradient"
                        value={formData.gradient}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        placeholder="Ej: from-violet-500 via-[#9938CA] to-[#E0724A]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Ej: from-red-500 to-blue-500</p>
                </div>

                {/* Preview */}
                <div>
                    <label className="block text-sm font-medium mb-2">Vista Previa</label>
                    <div className={`w-full px-6 py-1 font-medium text-sm text-white text-center bg-gradient-to-r ${formData.gradient} rounded-lg`}>
                        <div className='flex items-center justify-between'>
                            <p>{formData.title}</p>
                            <div className="flex items-center space-x-6">
                                <button type="button" className="font-normal text-gray-800 bg-white px-7 py-2 rounded-full max-sm:hidden">
                                    {formData.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Guardar Cambios
                </button>
            </div>
        </div>
    )
}
