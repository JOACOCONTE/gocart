// API endpoint for managing individual specifications
// Temporarily disabled - requires Prisma migration setup
// Uncomment and use when database is configured with: npx prisma migrate dev

/*
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req, { params }) {
    try {
        const { id } = params
        const specification = await prisma.specification.findUnique({
            where: { id }
        })

        if (!specification) {
            return Response.json({ error: 'Specification not found' }, { status: 404 })
        }

        return Response.json(specification)
    } catch (error) {
        console.error('Error fetching specification:', error)
        return Response.json({ error: 'Error fetching specification' }, { status: 500 })
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params
        const body = await req.json()
        const { title, description, icon, accent, order, isActive } = body

        const specification = await prisma.specification.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(icon !== undefined && { icon }),
                ...(accent && { accent }),
                ...(order !== undefined && { order }),
                ...(isActive !== undefined && { isActive }),
            }
        })

        return Response.json(specification)
    } catch (error) {
        console.error('Error updating specification:', error)
        return Response.json({ error: 'Error updating specification' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params
        
        // Soft delete
        await prisma.specification.update({
            where: { id },
            data: { isActive: false }
        })

        return Response.json({ message: 'Specification deleted successfully' })
    } catch (error) {
        console.error('Error deleting specification:', error)
        return Response.json({ error: 'Error deleting specification' }, { status: 500 })
    }
}
*/
