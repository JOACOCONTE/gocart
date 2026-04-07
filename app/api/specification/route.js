// API para Specifications - Temporalmente deshabilitado

export async function GET(req) {
    return Response.json([])
}

export async function POST(req) {
    return Response.json({ message: 'API needs database setup' }, { status: 503 })
}
