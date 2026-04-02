// API endpoint for updating individual products
// Temporarily disabled - requires Prisma migration setup
// Uncomment and use when database is configured with: npx prisma migrate dev

/*
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(req, { params }) {
    try {
        const { id } = params
        const body = await req.json()

        // Solo permitir actualizar ciertos campos
        const allowedFields = ['isFeatured', 'inStock', 'price', 'mrp', 'description']
        const updateData = {}

        for (const field of allowedFields) {
            if (body[field] !== undefined) {
                updateData[field] = body[field]
            }
        }

        if (Object.keys(updateData).length === 0) {
            return Response.json({ error: 'No fields to update' }, { status: 400 })
        }

        const product = await prisma.product.update({
            where: { id },
            data: updateData
        })

        return Response.json(product)
    } catch (error) {
        console.error('Error updating product:', error)
        return Response.json({ error: 'Error updating product' }, { status: 500 })
    }
}

export async function GET(req, { params }) {
    try {
        const { id } = params
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                rating: true,
                store: true
            }
        })

        if (!product) {
            return Response.json({ error: 'Product not found' }, { status: 404 })
        }

        return Response.json(product)
    } catch (error) {
        console.error('Error fetching product:', error)
        return Response.json({ error: 'Error fetching product' }, { status: 500 })
    }
}
*/
