'use client'
import Link from 'next/link'
import React from 'react'
import { ArrowRightIcon } from 'lucide-react'

const CollectionsShowcase = () => {
    const collections = [
        {
            id: 1,
            name: 'Oro 18K',
            description: 'Colección Exclusiva',
            color: 'from-yellow-400 to-yellow-600',
            icon: '✨',
            filter: 'oro-18k'
        },
        {
            id: 2,
            name: 'Plata Sterling',
            description: 'Elegancia Atemporal',
            color: 'from-slate-300 to-slate-500',
            icon: '💎',
            filter: 'plata'
        },
        {
            id: 3,
            name: 'Anillos',
            description: 'Diseño Premium',
            color: 'from-purple-400 to-purple-600',
            icon: '💍',
            filter: 'anillos'
        },
        {
            id: 4,
            name: 'Pulseras',
            description: 'Accesorios Únicos',
            color: 'from-rose-400 to-rose-600',
            icon: '🎀',
            filter: 'pulseras'
        },
    ]

    return (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">
                        Explora Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Colecciones</span>
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Descubre la mejor selección de joyería de autor
                    </p>
                </div>

                {/* Collections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/shop?filter=${collection.filter}`}
                            className="group"
                        >
                            <div className={`bg-gradient-to-br ${collection.color} rounded-2xl p-8 h-48 flex flex-col justify-between text-white relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}>
                                
                                {/* Background decorative element */}
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
                                <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>

                                <div className="relative z-10">
                                    <div className="text-5xl mb-3">{collection.icon}</div>
                                    <h3 className="text-2xl font-bold">{collection.name}</h3>
                                    <p className="text-white/90 text-sm mt-1">{collection.description}</p>
                                </div>

                                <div className="relative z-10 flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                                    <span className="text-sm font-semibold">Ver Colección</span>
                                    <ArrowRightIcon size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-12">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Ver Todos los Productos
                        <ArrowRightIcon size={20} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CollectionsShowcase
