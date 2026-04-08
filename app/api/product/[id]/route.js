import { serverStorage } from '@/lib/serverStorage'

export async function GET(req, { params }) {
    try {
        const { id } = params
        const product = serverStorage.products.getById(id)
        if (!product) {
            return Response.json({ error: 'Product not found' }, { status: 404 })
        }
        return Response.json(product)
    } catch (error) {
        console.error('Error fetching product:', error)
        return Response.json({ error: 'Error fetching product' }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params
        const body = await req.json()
        const updated = serverStorage.products.update(id, body)
        if (!updated) {
            return Response.json({ error: 'Product not found' }, { status: 404 })
        }
        return Response.json(updated)
    } catch (error) {
        console.error('Error updating product:', error)
        return Response.json({ error: 'Error updating product' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params
        serverStorage.products.delete(id)
        return Response.json({ success: true })
    } catch (error) {
        console.error('Error deleting product:', error)
        return Response.json({ error: 'Error deleting product' }, { status: 500 })
    }
}
