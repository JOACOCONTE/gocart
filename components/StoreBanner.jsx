'use client'
import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon } from 'lucide-react'
import Image from 'next/image'

const StoreBanner = () => {
    return (
        <section className="relative bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Content */}
                    <div className="text-white z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <SparklesIcon size={24} className="text-indigo-300" />
                            <span className="text-indigo-300 font-semibold text-sm">Joyería de Autor</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Diseños
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Exclusivos
                            </span>
                        </h1>

                        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                            Descubre nuestra colección de joyas elaboradas al más alto detalle. Cada pieza es un arte.
                        </p>

                        <div className="flex gap-4 flex-wrap">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                            >
                                Explorar Tienda
                                <ArrowRightIcon size={20} />
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
                            >
                                Más Información
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 mt-12">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-2xl font-bold text-indigo-300">💎</div>
                                <p className="text-sm text-gray-300 mt-2">Oro 18K & Plata</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-2xl font-bold text-purple-300">✨</div>
                                <p className="text-sm text-gray-300 mt-2">Diseños Únicos</p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                <div className="text-2xl font-bold text-pink-300">🎨</div>
                                <p className="text-sm text-gray-300 mt-2">Personalizables</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Decoration */}
                    <div className="relative hidden md:block">
                        <div className="relative">
                            {/* Floating cards */}
                            <div className="absolute -top-20 left-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform -rotate-12 shadow-2xl">
                                <p className="text-white/90 text-sm font-semibold">Colección Especial</p>
                                <p className="text-indigo-200 text-xs mt-2">Edición Limitada 2026</p>
                            </div>
                            <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform rotate-6 shadow-2xl">
                                <p className="text-white/90 text-sm font-semibold">+500 Clientes</p>
                                <p className="text-purple-200 text-xs mt-2">Satisfechos con nuestros diseños</p>
                            </div>

                            {/* Central illustration placeholder */}
                            <div className="w-full h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                <div className="text-center">
                                    <div className="text-8xl mb-4 animate-pulse">💍</div>
                                    <p className="text-white/60 text-sm">Joyería Artesanal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StoreBanner
