'use client'
import React from 'react'
import { X } from 'lucide-react'

const QuickFilters = ({ activeFilters, onFilterChange, onClear }) => {
    const getMaterialLabel = (value) => {
        const labels = {
            'oro-18k': 'Oro 18K',
            'plata': 'Plata',
            'cobre': 'Cobre',
            'bronce': 'Bronce',
            'cuero': 'Cuero',
            'piedras': 'Piedras'
        }
        return labels[value] || value
    }

    const getTypeLabel = (value) => {
        const labels = {
            'anillos': 'Anillos',
            'pulseras': 'Pulseras',
            'aros': 'Aros',
            'aros-abridores': 'Aros Abridores',
            'gargantilla': 'Gargantilla',
            'dijes': 'Dijes',
            'medallas': 'Medallas'
        }
        return labels[value] || value
    }

    const hasFilters = activeFilters.materials.length > 0 || activeFilters.types.length > 0

    if (!hasFilters) return null

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-slate-600">
                    Filtros activos:
                </span>

                {/* Material filters */}
                {activeFilters.materials.map((material) => (
                    <div
                        key={material}
                        className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                        <span>{getMaterialLabel(material)}</span>
                        <button
                            onClick={() => onFilterChange('materials', material)}
                            className="hover:text-indigo-900 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {/* Type filters */}
                {activeFilters.types.map((type) => (
                    <div
                        key={type}
                        className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                        <span>{getTypeLabel(type)}</span>
                        <button
                            onClick={() => onFilterChange('types', type)}
                            className="hover:text-purple-900 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {/* Clear all button */}
                <button
                    onClick={onClear}
                    className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
                >
                    Limpiar todo
                </button>
            </div>
        </div>
    )
}

export default QuickFilters
