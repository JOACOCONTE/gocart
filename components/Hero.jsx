'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
import { useSyncHeroFromLocalStorage } from '@/lib/hooks/useSyncHeroFromLocalStorage'

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    
    // Sincronizar con localStorage
    useSyncHeroFromLocalStorage()
    
    const heroData = useSelector(state => state.hero.heroData)
    const main = heroData.mainSection
    const best = heroData.bestProducts
    const discount = heroData.discounts

    const getBgColor = (color) => {
        const colors = {
            orange: 'bg-orange-200',
            blue: 'bg-blue-200',
            red: 'bg-red-200',
            green: 'bg-green-200',
            purple: 'bg-purple-200',
            pink: 'bg-pink-200',
        }
        return colors[color] || colors.orange
    }

    const getGradientColor = (color) => {
        const gradients = {
            orange: 'from-slate-800 to-[#FFAD51]',
            blue: 'from-slate-800 to-[#78B2FF]',
            red: 'from-slate-800 to-[#FF6B6B]',
            green: 'from-slate-800 to-[#51FF9A]',
            purple: 'from-slate-800 to-[#D486FF]',
            pink: 'from-slate-800 to-[#FF94D8]',
        }
        return gradients[color] || gradients.orange
    }

    return (
        <div className='mx-4 sm:mx-6'>
            <div className='flex max-xl:flex-col gap-4 sm:gap-6 xl:gap-8 max-w-7xl mx-auto my-6 sm:my-10'>
                <div className='relative flex-1 flex flex-col bg-[#e1edfa] rounded-2xl sm:rounded-3xl xl:min-h-100 group'>
                    <div className='p-4 sm:p-8 md:p-16'>
                        <div className='inline-flex items-center gap-2 sm:gap-3 bg-[#217584] text-[#000000] pr-2 sm:pr-4 p-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-[#37C2DB] px-2 sm:px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>{main.badge}</span> <span className='hidden sm:inline'>{main.badgeText}</span> <ChevronRightIcon className='group-hover:ml-2 transition-all' size={14} />
                        </div>
                        <h2 className='text-2xl sm:text-4xl md:text-5xl leading-[1.2] my-2 sm:my-3 font-medium bg-gradient-to-r from-slate-600 to-[#37C2DB] bg-clip-text text-transparent max-w-xs sm:max-w-md'>
                            {main.title}
                        </h2>
                        <div className='text-slate-800 text-xs sm:text-sm font-medium mt-3 sm:mt-8'>
                            <p>{main.subtitle1}</p>
                            <p className='text-xl sm:text-2xl md:text-3xl'>{main.subtitle2}</p>
                        </div>
                        <button className='bg-slate-800 text-white text-xs sm:text-sm py-2 sm:py-2.5 px-5 sm:px-7 md:py-5 md:px-12 mt-3 sm:mt-4 md:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition'>{main.buttonText}</button>
                    </div>
                    {main.image && (
                        <Image className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm' src={main.image} alt="Hero" width={500} height={500} />
                    )}
                </div>
                <div className='flex flex-col gap-3 sm:gap-4 xl:gap-5 w-full xl:max-w-sm text-xs sm:text-sm text-slate-600'>
                    <div className={`flex items-center justify-between w-full min-h-28 sm:min-h-32 ${getBgColor(best.bgColor)} rounded-2xl sm:rounded-3xl p-4 sm:p-6 group overflow-hidden`}>
                        <div className='flex-1 pr-3 sm:pr-4'>
                            <p className={`text-lg sm:text-2xl md:text-3xl font-medium bg-gradient-to-r ${getGradientColor(best.bgColor)} bg-clip-text text-transparent line-clamp-2`}>{best.title}</p>
                            <p className='flex items-center gap-1 mt-2 sm:mt-3 text-xs sm:text-sm whitespace-nowrap'>{best.text} <ArrowRightIcon className='group-hover:ml-2 transition-all flex-shrink-0' size={16} /> </p>
                        </div>
                        {best.image && (
                            <Image className='w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 object-contain flex-shrink-0' src={best.image} alt="Best" width={140} height={140} />
                        )}
                    </div>
                    <div className={`flex items-center justify-between w-full min-h-28 sm:min-h-32 ${getBgColor(discount.bgColor)} rounded-2xl sm:rounded-3xl p-4 sm:p-6 group overflow-hidden`}>
                        <div className='flex-1 pr-3 sm:pr-4'>
                            <p className={`text-lg sm:text-2xl md:text-3xl font-medium bg-gradient-to-r ${getGradientColor(discount.bgColor)} bg-clip-text text-transparent line-clamp-2`}>{discount.title}</p>
                            <p className='flex items-center gap-1 mt-2 sm:mt-3 text-xs sm:text-sm whitespace-nowrap'>{discount.text} <ArrowRightIcon className='group-hover:ml-2 transition-all flex-shrink-0' size={16} /> </p>
                        </div>
                        {discount.image && (
                            <Image className='w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 object-contain flex-shrink-0' src={discount.image} alt="Discount" width={140} height={140} />
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Hero