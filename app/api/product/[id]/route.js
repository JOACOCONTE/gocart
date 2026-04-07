// API para actualizar Productos - Temporalmente deshabilitado hasta que Prisma esté configurado

export async function PUT(req, { params }) {
    return Response.json({ message: 'API needs database setup' }, { status: 503 })
}

export async function GET(req, { params }) {
    return Response.json({ message: 'API needs database setup' }, { status: 503 })
}
