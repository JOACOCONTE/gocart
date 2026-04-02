'use client'

import { Award, Sparkles, Heart, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { assets } from '@/assets/assets';

export default function About() {
    const [selectedWork, setSelectedWork] = useState(null);

    // Galería de obras de arte
    const artworks = [
        {
            id: 1,
            title: 'Collar Artesanal Plata',
            category: 'Collar',
            image: assets.logo_arte_joyas,
            year: '2023',
            description: 'Pieza única en plata esterlina, trabajo manual de orfebrería fina'
        },
        {
            id: 2,
            title: 'Anillo de Diseño Exclusivo',
            category: 'Anillo',
            image: assets.logo_arte_joyas,
            year: '2023',
            description: 'Diseño original con acabado pulido y brillante'
        },
        {
            id: 3,
            title: 'Pulsera Tejida',
            category: 'Pulsera',
            image: assets.logo_arte_joyas,
            year: '2024',
            description: 'Técnica antigua de tejido de metales preciosos'
        },
        {
            id: 4,
            title: 'Dije Pendiente',
            category: 'Pendiente',
            image: assets.logo_arte_joyas,
            year: '2024',
            description: 'Trabajo de precisión en metales nobles'
        },
        {
            id: 5,
            title: 'Brazalete Artístico',
            category: 'Brazalete',
            image: assets.logo_arte_joyas,
            year: '2024',
            description: 'Pieza de colección con detalles grabados'
        },
        {
            id: 6,
            title: 'Set de Joyería Personalizado',
            category: 'Set',
            image: assets.logo_arte_joyas,
            year: '2023',
            description: 'Colección completa con diseño a medida del cliente'
        }
    ];

    const values = [
        {
            icon: Sparkles,
            title: 'Artesanía de Precisión',
            description: 'Cada pieza es elaborada con técnicas tradicionales de orfebrería, combinadas con innovación moderna'
        },
        {
            icon: Heart,
            title: 'Dedicación al Detalle',
            description: 'Trabajo minucioso y cuidadoso en cada aspecto del diseño y la ejecución'
        },
        {
            icon: Award,
            title: 'Materiales Premium',
            description: 'Utilizamos solo metales preciosos de la más alta calidad y procedencia certificada'
        },
        {
            icon: Zap,
            title: 'Creatividad Sin Límites',
            description: 'Diseños únicos y personalizados que reflejan la visión artística de cada cliente'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#346c6b] via-[#2a5a59] to-[#1f4847] text-white py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-400 opacity-5 rounded-full blur-3xl -ml-40 -mb-40"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl">
                        <div className="inline-block mb-6 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full">
                            <p className="text-green-200 text-sm font-medium">🎨 Orfebrería Artesanal depues de 2012</p>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                            El arte en cada <span className="text-green-300">pieza</span>
                        </h1>
                        <p className="text-xl text-slate-200 mb-8 leading-relaxed max-w-2xl">
                            Rubén Badía es un orfebre con más de 12 años de experiencia, creando obras de arte que trascienden lo ordinario. Cada pieza es una manifestación de pasión, técnica y visión artística.
                        </p>
                        
                        <div className="flex items-center gap-8">
                            <div>
                                <p className="text-4xl font-bold text-green-300">12+</p>
                                <p className="text-slate-300">Años de experiencia</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-green-300">1000+</p>
                                <p className="text-slate-300">Piezas creadas</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-green-300">100%</p>
                                <p className="text-slate-300">Artesanal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Presentación del Orfebre */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    {/* Imagen */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl blur-2xl opacity-30"></div>
                        <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-40 h-40 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                                    <Sparkles size={80} className="text-green-600" />
                                </div>
                                <p className="text-slate-600 font-semibold text-xl">Rubén Badía</p>
                                <p className="text-slate-500">Orfebre Maestro</p>
                            </div>
                        </div>
                    </div>

                    {/* Información */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-5xl font-bold text-gray-900 mb-6">
                                Rubén Badía
                                <span className="text-green-600 block text-2xl font-semibold mt-2">Orfebre Artesano</span>
                            </h2>
                        </div>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            Con más de 12 años dedicado a la orfebrería artesanal, Rubén Badía es un artista que trasforma metales preciosos en obras maestras. Cada pieza que crea es resultado de un profundo conocimiento técnico combinado con una visión artística única.
                        </p>

                        <p className="text-lg text-gray-700 leading-relaxed">
                            Su taller es donde la tradición ancestral de la orfebrería se encuentra con la innovación contemporánea. Utilizando técnicas milenarias y herramientas precisas, trabaja cada detalle con la dedicación de un verdadero artista.
                        </p>

                        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                            <p className="text-gray-800 font-semibold mb-2">Especialidades:</p>
                            <ul className="text-gray-700 space-y-2">
                                <li>✓ Diseño y creación personalizada</li>
                                <li>✓ Orfebrería en plata esterlina</li>
                                <li>✓ Trabajo en metales preciosos</li>
                                <li>✓ Restauración de piezas antiguas</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Valores y Proceso */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <div key={index} className="group bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-xl border border-slate-200 hover:border-green-400 hover:shadow-lg transition-all duration-300">
                                <div className="p-4 bg-green-50 rounded-lg w-fit mb-4 group-hover:bg-green-100 transition">
                                    <Icon size={28} className="text-green-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Galería de Obras */}
            <div className="bg-gradient-to-b from-slate-50 to-slate-100 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">Galería de Obras</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Una selección de las piezas más representativas de la trayectoria artística de Rubén Badía
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {artworks.map((artwork) => (
                            <button
                                key={artwork.id}
                                onClick={() => setSelectedWork(artwork)}
                                className="group cursor-pointer text-left"
                            >
                                <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-slate-200">
                                    <Image
                                        src={artwork.image}
                                        alt={artwork.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Sparkles size={48} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition">{artwork.title}</h3>
                                <p className="text-sm text-gray-600">{artwork.category} • {artwork.year}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Proceso Artesanal */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">Proceso de Creación</h2>
                    <p className="text-xl text-gray-600">Cómo transformamos tus ideas en arte</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { step: '01', title: 'Diseño', desc: 'Escuchamos tu visión y creamos diseños únicos' },
                        { step: '02', title: 'Planificación', desc: 'Seleccionamos los mejores materiales' },
                        { step: '03', title: 'Creación', desc: 'Trabajo artesanal minucioso y detallado' },
                        { step: '04', title: 'Acabado', desc: 'Pulido y control de calidad perfecto' }
                    ].map((item, index) => (
                        <div key={index} className="relative">
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200 text-center">
                                <div className="text-5xl font-bold text-green-600 mb-4">{item.step}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-700">{item.desc}</p>
                            </div>
                            {index < 3 && (
                                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                                    <div className="text-green-600 text-3xl">→</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-[#346c6b] to-[#2a5a59] text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-bold mb-6">¿Tienes una idea en mente?</h2>
                    <p className="text-xl text-slate-200 mb-8">
                        Contacta con Rubén para crear tu pieza de arte personalizada. Cada proyecto es una oportunidad para crear algo verdaderamente único.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition transform hover:scale-105 shadow-lg"
                    >
                        Comenzar un Proyecto
                    </a>
                </div>
            </div>
        </div>
    );
}
