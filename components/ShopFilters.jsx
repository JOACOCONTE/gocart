'use client'
import React, { useState, useCallback, memo } from 'react'
import { ChevronDown, X } from 'lucide-react'

const ShopFilters = memo(({ onFilterChange, products }) => {
    const [openFilter, setOpenFilter] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState({
        materials: [],
        types: [],
        priceRange: [0, 10000],
        search: ''
    })

    // Categorías para joyería de autor
    const materials = [
        { label: 'Oro 18K', value: 'oro-18k' },
        { label: 'Plata', value: 'plata' },
        { label: 'Cobre', value: 'cobre' },
        { label: 'Bronce', value: 'bronce' },
    ]

    const types = [
        { label: 'Anillos', value: 'anillos' },
        { label: 'Pulseras', value: 'pulseras' },
        { label: 'Aros', value: 'aros' },
        { label: 'Aros Abridores', value: 'aros-abridores' },
        { label: 'Collares/Gargantilla', value: 'gargantilla' },
        { label: 'Dijes', value: 'dijes' },
        { label: 'Medallas', value: 'medallas' },
    ]

    const materials_added = [
        { label: 'Cuero', value: 'cuero' },
        { label: 'Piedras', value: 'piedras' },
    ]

    const handleFilterChange = useCallback((filterType, value) => {
        setSelectedFilters(prev => {
            const newFilters = {
                ...prev,
                [filterType]: prev[filterType].includes(value)
                    ? prev[filterType].filter(f => f !== value)
                    : [...prev[filterType], value]
            }
            onFilterChange(newFilters)
            return newFilters
        })
    }, [onFilterChange])

    const handleClearFilters = useCallback(() => {
        const emptyFilters = {
            materials: [],
            types: [],
            priceRange: [0, 10000],
            search: ''
        }
        setSelectedFilters(emptyFilters)
        onFilterChange(emptyFilters)
    }, [onFilterChange])

    const hasActiveFilters = selectedFilters.materials.length > 0 || 
                             selectedFilters.types.length > 0 || 
                             selectedFilters.priceRange[0] > 0 ||
                             selectedFilters.priceRange[1] < 10000

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 max-h-fit sticky top-28">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-slate-800">Filtros</h2>
                {hasActiveFilters && (
                    <button
                        onClick={handleClearFilters}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            {/* Materiales */}
            <div className="mb-6 border-b border-slate-200 pb-6">
                <button
                    onClick={() => setOpenFilter(openFilter === 'materials' ? null : 'materials')}
                    className="w-full flex items-center justify-between font-medium text-slate-700 hover:text-slate-900"
                >
                    <span>Materiales</span>
                    <ChevronDown
                        size={18}
                        className={`transition-transform ${openFilter === 'materials' ? 'rotate-180' : ''}`}
                    />
                </button>
                {openFilter === 'materials' && (
                    <div className="mt-3 space-y-2">
                        {materials.map((material) => (
                            <label key={material.value} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.materials.includes(material.value)}
                                    onChange={() => handleFilterChange('materials', material.value)}
                                    className="rounded accent-indigo-600"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-800">
                                    {material.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Tipos de joyería */}
            <div className="mb-6 border-b border-slate-200 pb-6">
                <button
                    onClick={() => setOpenFilter(openFilter === 'types' ? null : 'types')}
                    className="w-full flex items-center justify-between font-medium text-slate-700 hover:text-slate-900"
                >
                    <span>Tipo de Joyería</span>
                    <ChevronDown
                        size={18}
                        className={`transition-transform ${openFilter === 'types' ? 'rotate-180' : ''}`}
                    />
                </button>
                {openFilter === 'types' && (
                    <div className="mt-3 space-y-2">
                        {types.map((type) => (
                            <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.types.includes(type.value)}
                                    onChange={() => handleFilterChange('types', type.value)}
                                    className="rounded accent-indigo-600"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-800">
                                    {type.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Materiales adicionales */}
            <div className="mb-6 pb-6">
                <button
                    onClick={() => setOpenFilter(openFilter === 'added' ? null : 'added')}
                    className="w-full flex items-center justify-between font-medium text-slate-700 hover:text-slate-900"
                >
                    <span>Materiales Adicionales</span>
                    <ChevronDown
                        size={18}
                        className={`transition-transform ${openFilter === 'added' ? 'rotate-180' : ''}`}
                    />
                </button>
                {openFilter === 'added' && (
                    <div className="mt-3 space-y-2">
                        {materials_added.map((material) => (
                            <label key={material.value} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedFilters.materials.includes(material.value)}
                                    onChange={() => handleFilterChange('materials', material.value)}
                                    className="rounded accent-indigo-600"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-800">
                                    {material.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
})

ShopFilters.displayName = 'ShopFilters'

export default ShopFilters
