import { serverStorage } from '@/lib/serverStorage'

export async function GET(req) {
    try {
        const hero = serverStorage.heroes.getLatest()
        return Response.json(hero || {
            id: null,
            mainTitle: '',
            mainSubtitle: '',
            mainImage: '',
            bestTitle: '',
            bestDescription: '',
            bestImage: '',
            discountTitle: '',
            discountDescription: '',
            discountImage: ''
        })
    } catch (error) {
        console.error('Error fetching hero:', error)
        return Response.json({
            id: null,
            mainTitle: '',
            mainSubtitle: '',
            mainImage: '',
            bestTitle: '',
            bestDescription: '',
            bestImage: '',
            discountTitle: '',
            discountDescription: '',
            discountImage: ''
        })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const hero = serverStorage.heroes.save(body)
        return Response.json(hero)
    } catch (error) {
        console.error('Error creating hero:', error)
        return Response.json({ error: 'Error creating hero' }, { status: 500 })
    }
}
