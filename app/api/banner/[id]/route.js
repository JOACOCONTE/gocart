import { serverStorage } from '@/lib/serverStorage'

export async function PUT(req, { params }) {
    try {
        const { id } = params
        const body = await req.json()
        const banner = serverStorage.banners.update(id, body)
        if (!banner) return Response.json({ error: 'Banner not found' }, { status: 404 })
        return Response.json(banner)
    } catch (error) {
        console.error('Error updating banner:', error)
        return Response.json({ error: 'Error updating banner' }, { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params
        serverStorage.banners.delete(id)
        return Response.json({ message: 'Banner deleted successfully' })
    } catch (error) {
        console.error('Error deleting banner:', error)
        return Response.json({ error: 'Error deleting banner' }, { status: 500 })
    }
}
