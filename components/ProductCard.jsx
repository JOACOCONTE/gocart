'use client'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { memo, useMemo } from 'react'

const ProductCard = memo(({ product }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    // Memoizar el cálculo de rating
    const rating = useMemo(() => {
        return product.rating && product.rating.length > 0 
            ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
            : 0
    }, [product.rating])

    return (
        <Link href={`/product/${product.id}`} className='group'>
            <div className='bg-[#F5F5F5] h-32 sm:h-40 md:h-48 rounded-lg flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='max-h-28 sm:max-h-36 md:max-h-44 w-auto group-hover:scale-110 transition duration-300' src={product.images[0]} alt="" />
            </div>
            <div className='flex flex-col gap-2 text-xs sm:text-sm text-slate-800 pt-2'>
                <div>
                    <p className='line-clamp-2 font-medium'>{product.name}</p>
                    <div className='flex gap-0.5'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon key={index} size={13} className='text-transparent' fill={rating >= index + 1 ? "#00C950" : "#D1D5DB"} />
                        ))}
                    </div>
                </div>
                <p className='font-semibold text-slate-900'>{currency}{product.price}</p>
            </div>
        </Link>
    )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard