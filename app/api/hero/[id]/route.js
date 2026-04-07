import { serverStorage } from '@/lib/serverStorage'

export async function PUT(req, { params }) {
    try {
        const { id } = params
        const body = await req.json()
        const hero = serverStorage.heroes.update(id, body)
        if (!hero) return Response.json({ error: 'Hero not found' }, { status: 404 })
        return Response.json(hero)
    } catch (error) {
        console.error('Error updating hero:', error)
        return Response.json({ error: 'Error updating hero' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params
        serverStorage.heroes.delete(id)
        return Response.json({ message: 'Hero deleted successfully' })
    } catch (error) {
        console.error('Error deleting hero:', error)
        return Response.json({ error: 'Error deleting hero' }, { status: 500 })
    }
}
