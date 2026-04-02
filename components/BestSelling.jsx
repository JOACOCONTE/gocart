'use client'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const BestSelling = () => {

    const displayQuantity = 8
    const products = useSelector(state => state.product.list)

    // Obtener productos destacados por el admin (isFeatured = true)
    const featuredProducts = products.filter(p => p.isFeatured === true)
    
    // Si no hay suficientes destacados, llenar con los más vendidos (por rating)
    let displayProducts = [...featuredProducts]
    if (displayProducts.length < displayQuantity) {
        const bestByRating = products
            .filter(p => !p.isFeatured) // Excluir los ya destacados
            .sort((a, b) => (b.rating?.length || 0) - (a.rating?.length || 0))
        displayProducts = [...displayProducts, ...bestByRating].slice(0, displayQuantity)
    }

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title='Best Selling' description={`Showing ${displayProducts.length < displayQuantity ? displayProducts.length : displayQuantity} of ${products.length} products`} href='/shop' />
            <div className='mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
                {displayProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default BestSelling