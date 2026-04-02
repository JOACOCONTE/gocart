import React, { useEffect } from 'react'
import Title from './Title'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSpecifications } from '@/lib/features/specification/specificationSlice'
import { Check, Zap, Gift } from 'lucide-react'
import { useSyncSpecificationsFromLocalStorage } from '@/lib/hooks/useSyncSpecificationsFromLocalStorage'

const OurSpecs = () => {
    // Sincronizar especificaciones al montar el componente
    useSyncSpecificationsFromLocalStorage()

    const specifications = useSelector(state => state.specification.list)
    const specLoading = useSelector(state => state.specification.loading)

    // Mapeo de iconos disponibles
    const iconMap = {
        'check': Check,
        'zap': Zap,
        'gift': Gift,
        // Agregar más iconos según sea necesario
    }

    // Si no hay especificaciones, mostrar valores por defecto (puedes remover esto si prefieres)
    const defaultSpecs = [
        {
            id: 'default-1',
            title: 'Plata 950 Certificada',
            description: 'Joyería de plata 950 con certificado de autenticidad garantizado para mayor confianza.',
            icon: 'check',
            accent: '#94A3B8'
        },
        {
            id: 'default-2',
            title: 'Oro 18K Verificado',
            description: 'Oro de 18 quilates puro, verificado y certificado por expertos en joyería fina.',
            icon: 'zap',
            accent: '#FBBF24'
        }
    ]

    const displaySpecs = specifications.length > 0 ? specifications : defaultSpecs

    const getIcon = (iconName) => {
        const Icon = iconMap[iconName?.toLowerCase()] || Check
        return Icon
    }

    return (
        <div className='px-4 sm:px-6 my-16 sm:my-20 md:my-24 max-w-6xl mx-auto'>
            <Title visibleButton={false} title='Our Specifications' description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free." />

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-7 gap-y-8 sm:gap-y-10 mt-12 sm:mt-16 md:mt-20'>
                {displaySpecs.map((spec) => {
                    const IconComponent = getIcon(spec.icon)
                    return (
                        <div 
                            className='relative h-auto sm:h-44 px-6 sm:px-8 py-8 sm:py-6 flex flex-col items-center justify-center w-full text-center border rounded-lg group' 
                            style={{ 
                                backgroundColor: spec.accent + '20', 
                                borderColor: spec.accent + '50' 
                            }} 
                            key={spec.id}
                        >
                            <h3 className='text-base sm:text-sm md:text-base text-slate-800 font-medium'>{spec.title}</h3>
                            <p className='text-xs sm:text-sm text-slate-600 mt-2 sm:mt-3 leading-relaxed'>{spec.description}</p>
                            <div 
                                className='absolute -top-5 text-white size-9 sm:size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition' 
                                style={{ backgroundColor: spec.accent }}
                            >
                                <IconComponent size={18} />
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default OurSpecs