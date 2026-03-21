'use client'
import { Suspense, useState, useMemo } from "react"
import ProductCardEnhanced from "@/components/ProductCardEnhanced"
import ShopFilters from "@/components/ShopFilters"
import QuickFilters from "@/components/QuickFilters"
import { MoveLeftIcon, Grid3X3Icon, ListIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import { useSyncProductsFromLocalStorage } from "@/lib/hooks/useSyncProductsFromLocalStorage"

function ShopContent() {

    // Sincronizar con localStorage (solo en cliente)
    useSyncProductsFromLocalStorage()

    // get query params ?search=abc
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)
    const [viewMode, setViewMode] = useState('grid') // grid o list
    const [filters, setFilters] = useState({
        materials: [],
        types: [],
        priceRange: [0, 10000],
        search: search || ''
    })

    // Aplicar filtros
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Filtro de búsqueda
            const matchesSearch = !filters.search || 
                product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.category.toLowerCase().includes(filters.search.toLowerCase())

            // Filtro de materiales (buscar en name o category)
            const matchesMaterial = filters.materials.length === 0 || 
                filters.materials.some(material => 
                    product.category.toLowerCase().includes(material) ||
                    product.name.toLowerCase().includes(material)
                )

            // Filtro de tipos
            const matchesType = filters.types.length === 0 || 
                filters.types.some(type => 
                    product.category.toLowerCase().includes(type)
                )

            // Filtro de precio
            const matchesPrice = product.price >= filters.priceRange[0] && 
                                product.price <= filters.priceRange[1]

            return matchesSearch && matchesMaterial && matchesType && matchesPrice
        })
    }, [products, filters])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        {search && (
                            <button
                                onClick={() => router.push('/shop')}
                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition"
                            >
                                <MoveLeftIcon size={20} />
                                <span className="text-sm">Volver</span>
                            </button>
                        )}
                    </div>
                    
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">
                        Nuestras <span className="text-indigo-600">Joyas</span>
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Descubre nuestra colección de joyería de autor diseñada con pasión
                    </p>

                    {/* Control bar */}
                    <div className="flex items-center justify-between mt-6 pb-6 border-b border-slate-200">
                        <div className="text-sm text-slate-600">
                            Mostrando <span className="font-semibold text-slate-900">{filteredProducts.length}</span> productos
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition ${
                                    viewMode === 'grid'
                                        ? 'bg-indigo-100 text-indigo-600'
                                        : 'text-slate-400 hover:text-slate-600'
                                }`}
                                title="Vista de cuadrícula"
                            >
                                <Grid3X3Icon size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition ${
                                    viewMode === 'list'
                                        ? 'bg-indigo-100 text-indigo-600'
                                        : 'text-slate-400 hover:text-slate-600'
                                }`}
                                title="Vista de lista"
                            >
                                <ListIcon size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <ShopFilters 
                            onFilterChange={setFilters}
                            products={products}
                        />
                    </aside>

                    {/* Products Grid/List */}
                    <main className="flex-1">
                        <QuickFilters 
                            activeFilters={filters}
                            onFilterChange={(filterType, value) => {
                                const newFilters = {
                                    ...filters,
                                    [filterType]: filters[filterType].includes(value)
                                        ? filters[filterType].filter(f => f !== value)
                                        : [...filters[filterType], value]
                                }
                                setFilters(newFilters)
                            }}
                            onClear={() => setFilters({
                                materials: [],
                                types: [],
                                priceRange: [0, 10000],
                                search: ''
                            })}
                        />
                        {filteredProducts.length > 0 ? (
                            <div className={`${
                                viewMode === 'grid'
                                    ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                    : 'space-y-4'
                            }`}>
                                {filteredProducts.map((product) => (
                                    viewMode === 'grid' ? (
                                        <ProductCardEnhanced key={product.id} product={product} />
                                    ) : (
                                        <div
                                            key={product.id}
                                            className="flex gap-4 p-4 rounded-lg border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition"
                                        >
                                            <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <img 
                                                    src={product.images[0]} 
                                                    alt={product.name}
                                                    className="max-h-28 w-auto object-contain"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                                                <p className="text-sm text-slate-500 mb-3">{product.category}</p>
                                                <p className="text-2xl font-bold text-slate-900 mb-3">
                                                    ${product.price.toLocaleString()}
                                                </p>
                                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium">
                                                    Ver detalles
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="text-slate-300 mb-4">
                                    <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 1020.354 15.354z" />
                                    </svg>
                                </div>
                                <p className="text-slate-600 text-lg font-medium">No se encontraron productos</p>
                                <p className="text-slate-500 text-sm mt-2">Intenta cambiar los filtros o la búsqueda</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}