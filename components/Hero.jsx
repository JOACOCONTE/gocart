'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
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
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                <div className='relative flex-1 flex flex-col bg-[#e1edfa] rounded-3xl xl:min-h-100 group'>
                    <div className='p-5 sm:p-16'>
                        <div className='inline-flex items-center gap-3 bg-[#217584] text-[#000000] pr-4 p-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-[#37C2DB] px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>{main.badge}</span> {main.badgeText} <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-600 to-[#37C2DB] bg-clip-text text-transparent max-w-xs  sm:max-w-md'>
                            {main.title}
                        </h2>
                        <div className='text-slate-800 text-sm font-medium mt-4 sm:mt-8'>
                            <p>{main.subtitle1}</p>
                            <p className='text-3xl'>{main.subtitle2}</p>
                        </div>
                        <button className='bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition'>{main.buttonText}</button>
                    </div>
                    {main.image && (
                        <Image className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm' src={main.image} alt="Hero" width={500} height={500} />
                    )}
                </div>
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    <div className={`flex-1 flex items-center justify-between w-full ${getBgColor(best.bgColor)} rounded-3xl p-6 px-8 group`}>
                        <div>
                            <p className={`text-3xl font-medium bg-gradient-to-r ${getGradientColor(best.bgColor)} bg-clip-text text-transparent max-w-40`}>{best.title}</p>
                            <p className='flex items-center gap-1 mt-4'>{best.text} <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        {best.image && (
                            <Image className='w-35' src={best.image} alt="Best" width={140} height={140} />
                        )}
                    </div>
                    <div className={`flex-1 flex items-center justify-between w-full ${getBgColor(discount.bgColor)} rounded-3xl p-6 px-8 group`}>
                        <div>
                            <p className={`text-3xl font-medium bg-gradient-to-r ${getGradientColor(discount.bgColor)} bg-clip-text text-transparent max-w-40`}>{discount.title}</p>
                            <p className='flex items-center gap-1 mt-4'>{discount.text} <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        {discount.image && (
                            <Image className='w-35' src={discount.image} alt="Discount" width={140} height={140} />
                        )}
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>

    )
}

export default Hero