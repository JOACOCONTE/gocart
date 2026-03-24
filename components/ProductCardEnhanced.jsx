'use client'
import { StarIcon, ShoppingCartIcon, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import toast from 'react-hot-toast'

const ProductCardEnhanced = memo(({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const dispatch = useDispatch()
    const [isLiked, setIsLiked] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const { cartItems } = useSelector(state => state.cart)

    // calculate the average rating of the product
    const rating = product.rating && product.rating.length > 0 
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault()
        setIsAdding(true)
        
        dispatch(addToCart({ productId: product.id }))
        
        setTimeout(() => {
            setIsAdding(false)
            toast.success('Agregado al carrito')
        }, 100)
    }

    const isInCart = cartItems[product.id] ? true : false

    return (
        <div className='group'>
            <Link href={`/product/${product.id}`} className='block'>
                {/* Product Image Container */}
                <div className='relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center mb-3 border border-slate-200'>
                    <Image 
                        width={300} 
                        height={300} 
                        className='max-h-56 w-auto group-hover:scale-110 transition duration-300 object-contain p-4' 
                        src={product.images[0]} 
                        alt={product.name}
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300'></div>
                </div>
            </Link>

            {/* Product Info */}
            <div className='space-y-2'>
                {/* Name */}
                <Link href={`/product/${product.id}`} className='block'>
                    <h3 className='font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition line-clamp-2'>
                        {product.name}
                    </h3>
                </Link>

                {/* Category */}
                <p className='text-xs text-slate-500'>{product.category}</p>

                {/* Rating */}
                <div className='flex items-center gap-1'>
                    <div className='flex'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon 
                                key={index} 
                                size={14} 
                                className='text-transparent' 
                                fill={rating >= index + 1 ? "#f59e0b" : "#e5e7eb"} 
                            />
                        ))}
                    </div>
                    {product.rating && product.rating.length > 0 && (
                        <span className='text-xs text-slate-500'>
                            ({product.rating.length})
                        </span>
                    )}
                </div>

                {/* Price */}
                <p className='text-lg font-bold text-slate-900'>
                    {currency}{product.price.toLocaleString()}
                </p>

                {/* Action Buttons */}
                <div className='flex gap-2 pt-3'>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium transition-all ${
                            isInCart
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        } disabled:opacity-50`}
                    >
                        <ShoppingCartIcon size={18} />
                        <span className='text-sm'>
                            {isInCart ? 'En carrito' : 'Agregar'}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2.5 rounded-lg transition-all ${
                            isLiked
                                ? 'bg-red-100 text-red-600'
                                : 'bg-slate-100 text-slate-400 hover:text-red-600 hover:bg-slate-200'
                        }`}
                    >
                        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>
        </div>
    )
})

ProductCardEnhanced.displayName = 'ProductCardEnhanced'

export default ProductCardEnhanced
