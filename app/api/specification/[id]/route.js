// API para actualizar Specifications - Temporalmente deshabilitado

export async function PUT(req, { params }) {
    return Response.json({ message: 'API needs database setup' }, { status: 503 })
}

export async function DELETE(req, { params }) {
    return Response.json({ message: 'API needs database setup' }, { status: 503 })
}
