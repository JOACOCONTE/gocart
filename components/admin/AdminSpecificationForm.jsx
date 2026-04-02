'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"
import { toast } from "react-hot-toast"

const AdminSpecificationForm = ({ specification = null, onSubmit }) => {

    const iconOptions = ['check', 'zap', 'gift']

    const [specInfo, setSpecInfo] = useState({
        title: "",
        description: "",
        icon: "check",
        accent: "#000000",
        order: 0,
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (specification) {
            setSpecInfo({
                title: specification.title,
                description: specification.description,
                icon: specification.icon || "check",
                accent: specification.accent || "#000000",
                order: specification.order || 0,
            })
        }
    }, [specification])

    const onChangeHandler = (e) => {
        setSpecInfo({ ...specInfo, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!specInfo.title.trim()) {
                toast.error("El título es requerido")
                setLoading(false)
                return
            }
            if (!specInfo.description.trim()) {
                toast.error("La descripción es requerida")
                setLoading(false)
                return
            }

            await onSubmit(specInfo)
            setLoading(false)
        } catch (error) {
            toast.error("Error al guardar la especificación")
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="text-slate-500 mb-28">
            {/* Header */}
            <div className="flex items-start md:items-center gap-2 md:gap-3 mb-6 md:mb-8">
                <Link href="/admin/specifications" className="p-2 hover:bg-slate-100 rounded-lg transition flex-shrink-0 mt-1 md:mt-0">
                    <ArrowLeftIcon size={20} className="text-slate-600" />
                </Link>
                <h1 className="text-lg md:text-2xl">
                    {specification ? "Editar" : "Agregar"} 
                    <span className="text-slate-800 font-medium"> Especificación</span>
                </h1>
            </div>

            {/* Título */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Título</span>
                <input
                    type="text"
                    name="title"
                    onChange={onChangeHandler}
                    value={specInfo.title}
                    placeholder="Ej: Plata 950 Certificada"
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
                    value={specInfo.description}
                    placeholder="Describe la especificación..."
                    rows="4"
                    className="w-full md:max-w-2xl p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition resize-none text-sm"
                    required
                />
            </label>

            {/* Ícono */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Ícono</span>
                <select
                    name="icon"
                    onChange={onChangeHandler}
                    value={specInfo.icon}
                    className="w-full md:max-w-lg p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition text-sm"
                >
                    {iconOptions.map((icon) => (
                        <option key={icon} value={icon} className="capitalize">{icon}</option>
                    ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">Iconos disponibles: check, zap, gift</p>
            </label>

            {/* Color */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Color (Hex)</span>
                <div className="flex gap-2 items-center">
                    <input
                        type="color"
                        name="accent"
                        onChange={onChangeHandler}
                        value={specInfo.accent}
                        className="w-12 h-10 rounded cursor-pointer"
                    />
                    <input
                        type="text"
                        value={specInfo.accent}
                        readOnly
                        className="w-full md:max-w-lg p-2.5 px-4 outline-none border border-slate-200 rounded-lg bg-slate-50 text-sm"
                    />
                </div>
            </label>

            {/* Orden */}
            <label className="flex flex-col gap-2 mb-4 md:mb-6">
                <span className="text-sm md:text-base text-slate-600 font-medium">Orden (de menor a mayor)</span>
                <input
                    type="number"
                    name="order"
                    onChange={onChangeHandler}
                    value={specInfo.order}
                    min="0"
                    className="w-full md:max-w-lg p-2.5 px-4 outline-none border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 transition text-sm"
                />
            </label>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 md:px-8 py-2.5 bg-slate-700 hover:bg-slate-800 disabled:bg-slate-400 text-white font-semibold rounded-lg transition text-sm md:text-base whitespace-nowrap"
                >
                    {loading ? "Guardando..." : specification ? "Actualizar" : "Agregar"}
                </button>
                <Link href="/admin/specifications" className="px-6 md:px-8 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition text-sm md:text-base text-center whitespace-nowrap">
                    Cancelar
                </Link>
            </div>
        </form>
    )
}

export default AdminSpecificationForm
