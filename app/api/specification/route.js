// API endpoint for managing specifications collection
// Temporarily disabled - requires Prisma migration setup
// Uncomment and use when database is configured with: npx prisma migrate dev

/*
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req) {
    try {
        const specifications = await prisma.specification.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        })
        return Response.json(specifications)
    } catch (error) {
        console.error('Error fetching specifications:', error)
        return Response.json({ error: 'Error fetching specifications' }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { title, description, icon, accent, order } = body

        if (!title || !description) {
            return Response.json({ error: 'Title and description are required' }, { status: 400 })
        }

        const specification = await prisma.specification.create({
            data: {
                title,
                description,
                icon: icon || null,
                accent: accent || '#000000',
                order: order || 0,
            }
        })

        return Response.json(specification, { status: 201 })
    } catch (error) {
        console.error('Error creating specification:', error)
        return Response.json({ error: 'Error creating specification' }, { status: 500 })
    }
}
*/
