'use client'
import { Search, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useSyncProductsFromLocalStorage } from "@/lib/hooks/useSyncProductsFromLocalStorage";
import FloatingCart from "./FloatingCart";


const Navbar = () => {

    const router = useRouter();
    const products = useSelector(state => state.product.list)
    
    // Sincronizar con localStorage
    useSyncProductsFromLocalStorage()

    const [search, setSearch] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [isScrolled, setIsScrolled] = useState(false)
    const [expandSearch, setExpandSearch] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const searchInputRef = useRef(null)
    const cartCount = useSelector(state => state.cart.total)

    // Detectar scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Expandir buscador cuando se escribe
    useEffect(() => {
        if (search.trim().length > 0) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            ).slice(0, 6)
            
            setSuggestions(filtered)
            setShowSuggestions(true)
            setSelectedIndex(-1)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, [search, products])

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) {
            router.push(`/shop?search=${search}`)
            setShowSuggestions(false)
        }
    }

    const handleSuggestionClick = (productId, productName) => {
        router.push(`/product/${productId}`)
        setSearch('')
        setShowSuggestions(false)
    }

    const handleKeyDown = (e) => {
        if (!showSuggestions) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
                break
            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex].id, suggestions[selectedIndex].name)
                } else {
                    handleSearch(e)
                }
                break
            case 'Escape':
                setShowSuggestions(false)
                setSelectedIndex(-1)
                break
            default:
                break
        }
    }

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <>
            <nav className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`} style={{ backgroundColor: '#346c6b' }}>
            <div className={`mx-6 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="flex items-center justify-between max-w-7xl mx-auto transition-all duration-500">

                    <Link href="/" className="relative">
                        <Image 
                            src={assets.logo_arte_joyas} 
                            alt="GoCart Logo" 
                            height={isScrolled ? 40 : 50} 
                            width={isScrolled ? 120 : 150} 
                            priority 
                            className="transition-all duration-500"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className={`hidden sm:flex items-center ${isScrolled ? 'gap-3 lg:gap-6' : 'gap-4 lg:gap-8'} text-[#e1edfa] transition-all duration-500`}>
                        <Link href="/" className={`${isScrolled ? 'text-sm' : ''} hover:opacity-80 transition-all duration-500`}>Home</Link>
                        <Link href="/shop" className={`${isScrolled ? 'text-sm' : ''} hover:opacity-80 transition-all duration-500`}>Shop</Link>
                        <Link href="/" className={`${isScrolled ? 'text-sm' : ''} hover:opacity-80 transition-all duration-500`}>About</Link>
                        <Link href="/" className={`${isScrolled ? 'text-sm' : ''} hover:opacity-80 transition-all duration-500`}>Contact</Link>

                        {/* Search Bar */}
                        {!isScrolled ? (
                            <form onSubmit={handleSearch} className="hidden xl:flex items-center relative opacity-100 transition-all duration-500">
                                <div className="flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                                    <Search size={18} className="text-slate-600" />
                                    <input 
                                        ref={searchInputRef}
                                        className="w-full bg-transparent outline-none placeholder-slate-600" 
                                        type="text" 
                                        placeholder="Search products" 
                                        value={search} 
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => search.trim().length > 0 && setShowSuggestions(true)}
                                    />
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearch('')
                                                setSuggestions([])
                                                setShowSuggestions(false)
                                            }}
                                            className="text-slate-600 hover:text-slate-800"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                {/* Dropdown de sugerencias */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                                        {suggestions.map((product, index) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleSuggestionClick(product.id, product.name)}
                                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition ${
                                                    selectedIndex === index ? 'bg-slate-100' : ''
                                                } ${index !== suggestions.length - 1 ? 'border-b border-slate-100' : ''}`}
                                            >
                                                <Image 
                                                    src={product.images[0]} 
                                                    alt={product.name} 
                                                    width={40} 
                                                    height={40}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-slate-800 font-medium text-sm truncate">{product.name}</p>
                                                    <p className="text-slate-500 text-xs">{product.category}</p>
                                                </div>
                                                <p className="text-slate-700 font-semibold text-sm whitespace-nowrap">${product.price}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </form>
                        ) : (
                            /* Search Icon cuando está scrolleado */
                            <div className="relative opacity-100 transition-all duration-500">
                                <button
                                    onClick={() => setExpandSearch(!expandSearch)}
                                    className="text-slate-100 hover:text-white transition-all duration-500 transform hover:scale-110"
                                >
                                    <Search size={isScrolled ? 18 : 20} className="transition-all duration-500" />
                                </button>

                                {/* Expanded Search cuando hace click */}
                                {expandSearch && (
                                    <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2">
                                        <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full shadow-lg animate-in fade-in slide-in-from-top-2">
                                            <input 
                                                ref={searchInputRef}
                                                autoFocus
                                                className="bg-transparent outline-none text-sm w-40 placeholder-slate-600" 
                                                type="text" 
                                                placeholder="Search..." 
                                                value={search} 
                                                onChange={(e) => setSearch(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                onBlur={() => setTimeout(() => !search && setExpandSearch(false), 200)}
                                            />
                                            {search && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSearch('')
                                                        setSuggestions([])
                                                        setShowSuggestions(false)
                                                    }}
                                                    className="text-slate-600 hover:text-slate-800"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Dropdown de sugerencias para scrolled */}
                                        {showSuggestions && suggestions.length > 0 && (
                                            <div className="absolute top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50 right-0">
                                                {suggestions.map((product, index) => (
                                                    <button
                                                        key={product.id}
                                                        onClick={() => handleSuggestionClick(product.id, product.name)}
                                                        className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-slate-50 transition text-sm ${
                                                            selectedIndex === index ? 'bg-slate-100' : ''
                                                        } ${index !== suggestions.length - 1 ? 'border-b border-slate-100' : ''}`}
                                                    >
                                                        <Image 
                                                            src={product.images[0]} 
                                                            alt={product.name} 
                                                            width={32} 
                                                            height={32}
                                                            className="w-8 h-8 object-cover rounded"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-slate-800 font-medium text-xs truncate">{product.name}</p>
                                                        </div>
                                                        <p className="text-slate-700 font-semibold text-xs">${product.price}</p>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </form>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative flex items-center gap-2 text-[#e1edfa] hover:opacity-80 transition-all duration-500"
                        >
                            <ShoppingCart size={isScrolled ? 18 : 20} className="transition-all duration-500" />
                            <span className={`transition-all duration-500 ${isScrolled ? 'hidden' : ''}`}>Cart</span>
                            <button className={`absolute ${isScrolled ? '-top-0.5 -left-1' : '-top-1 left-3'} text-[8px] text-white bg-slate-600 size-3.5 rounded-full transition-all duration-500`}>{cartCount}</button>
                        </button>

                        <Link href="/admin" className={`${isScrolled ? 'px-6 py-1.5 text-sm' : 'px-8 py-2'} bg-indigo-500 hover:bg-indigo-600 transition-all text-white rounded-full transition-all duration-500`}>
                            {isScrolled ? 'Admin' : 'Login'}
                        </Link>

                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">
                        <Link href="/admin" className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full inline-block">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <hr className={`transition-all duration-500 ${isScrolled ? 'border-gray-400 opacity-40' : 'border-gray-300'}`} />
            </nav>

            <FloatingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}

export default Navbar