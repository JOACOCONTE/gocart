import { serverStorage } from '@/lib/serverStorage'

export async function GET(req) {
    try {
        const products = serverStorage.products.getAll()
        return Response.json(products)
    } catch (error) {
        console.error('Error fetching products:', error)
        return Response.json({ error: 'Error fetching products' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const product = serverStorage.products.save(body)
        return Response.json(product)
    } catch (error) {
        console.error('Error creating product:', error)
        return Response.json({ error: 'Error creating product' }, { status: 500 })
    }
}
