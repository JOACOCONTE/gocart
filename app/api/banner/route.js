import { serverStorage } from '@/lib/serverStorage'

export async function GET(req) {
    try {
        const banner = serverStorage.banners.getLatest()
        return Response.json(banner || {
            id: null,
            title: '',
            description: '',
            couponCode: '',
            discount: '',
            image: '',
            isVisible: true
        })
    } catch (error) {
        console.error('Error fetching banner:', error)
        return Response.json({
            id: null,
            title: '',
            description: '',
            couponCode: '',
            discount: '',
            image: '',
            isVisible: true
        })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const banner = serverStorage.banners.save(body)
        return Response.json(banner)
    } catch (error) {
        console.error('Error creating banner:', error)
        return Response.json({ error: 'Error creating banner' }, { status: 500 })
    }
}
