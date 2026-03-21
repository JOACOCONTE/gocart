'use client'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

export default function HeroPreview({ activeTab, formMain, formBest, formDiscount }) {
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
        <div className="sticky top-6 bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Vista Previa</h2>
            
            {activeTab === 'main' && (
                <div className="relative flex flex-col bg-[#e1edfa] rounded-3xl overflow-hidden">
                    <div className='p-6'>
                        <div className='inline-flex items-center gap-2 bg-[#217584] text-[#000000] pr-3 p-1 rounded-full text-xs'>
                            <span className='bg-[#37C2DB] px-2 py-0.5 rounded-full text-white text-xs'>{formMain.badge}</span>
                            <span className='text-xs ml-1'>{formMain.badgeText}</span>
                            <ChevronRightIcon size={12} />
                        </div>
                        <h2 className='text-xl font-medium bg-gradient-to-r from-slate-600 to-[#37C2DB] bg-clip-text text-transparent max-w-xs my-2'>
                            {formMain.title}
                        </h2>
                        <div className='text-slate-800 text-xs font-medium mt-2'>
                            <p>{formMain.subtitle1}</p>
                            <p className='text-lg font-semibold'>{formMain.subtitle2}</p>
                        </div>
                        <button className='bg-slate-800 text-white text-xs py-2 px-4 mt-3 rounded-md hover:bg-slate-900 transition'>
                            {formMain.buttonText}
                        </button>
                    </div>
                    {formMain.image && (
                        <div className="relative w-full h-32 mb-0">
                            <Image
                                src={formMain.image}
                                alt="Hero"
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'best' && (
                <div className={`flex items-center justify-between w-full ${getBgColor(formBest.bgColor)} rounded-2xl p-4`}>
                    <div>
                        <p className={`text-lg font-medium bg-gradient-to-r ${getGradientColor(formBest.bgColor)} bg-clip-text text-transparent`}>
                            {formBest.title}
                        </p>
                        <p className='flex items-center gap-1 mt-2 text-xs'>{formBest.text} <ArrowRightIcon size={12} /></p>
                    </div>
                    {formBest.image && (
                        <Image
                            src={formBest.image}
                            alt="Best"
                            width={80}
                            height={80}
                            className="rounded-lg"
                        />
                    )}
                </div>
            )}

            {activeTab === 'discount' && (
                <div className={`flex items-center justify-between w-full ${getBgColor(formDiscount.bgColor)} rounded-2xl p-4`}>
                    <div>
                        <p className={`text-lg font-medium bg-gradient-to-r ${getGradientColor(formDiscount.bgColor)} bg-clip-text text-transparent`}>
                            {formDiscount.title}
                        </p>
                        <p className='flex items-center gap-1 mt-2 text-xs'>{formDiscount.text} <ArrowRightIcon size={12} /></p>
                    </div>
                    {formDiscount.image && (
                        <Image
                            src={formDiscount.image}
                            alt="Discount"
                            width={80}
                            height={80}
                            className="rounded-lg"
                        />
                    )}
                </div>
            )}
        </div>
    )
}
