# 📊 ANÁLISIS: Estructura de Generación de Pedidos + WhatsApp

## 🔴 PROBLEMA ACTUAL

El sistema **NO puede generar pedidos reales** en la base de datos:

```
Cliente (Carrito)
    ↓
OrderSummary.jsx (recopila datos)
    ↓
handlePlaceOrder()
    ↓
router.push('/orders')  ❌ ¡SOLO ESTO! No guarda nada
    ↓
Ve DUMMY DATA (faktos en assets/assets.js)
```

**Lo que está pasando ahora:**

- ✅ El cliente completa el carrito
- ✅ Selecciona dirección, método de pago, etc.
- ❌ El botón "Place Order" **NO hace nada** con esos datos
- ❌ **No se crea la orden** en la base de datos
- ❌ **No se envía mensaje a WhatsApp**
- ❌ Ver "órdenes" es solo mostrar datos ficticios

---

## 🟢 SOLUCIÓN PROPUESTA

### Arquitectura Nueva

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Frontend)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ OrderSummary.jsx                                         │   │
│  │ • Datos recopilados:                                     │   │
│  │   - userId (de sesión/auth)                             │   │
│  │   - storeId (de sesión/auth)                            │   │
│  │   - selectedAddress (dirección elegida)                 │   │
│  │   - items (carrito)                                      │   │
│  │   - totalPrice (total calculado)                        │   │
│  │   - paymentMethod (COD/STRIPE)                          │   │
│  │   - coupon (if applied)                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  handlePlaceOrder() → POST /api/orders (JSON)                   │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SERVIDOR (Backend)                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ app/api/orders/route.js (POST)                          │   │
│  │                                                          │   │
│  │ 1. Validar datos ✓                                       │   │
│  │ 2. Crear Order en Prisma/PostgreSQL ✓                   │   │
│  │ 3. Crear OrderItems ✓                                    │   │
│  │ 4. Recuperar datos:                                      │   │
│  │    - Info usuario (nombre, email, teléfono)            │   │
│  │    - Info dirección                                      │   │
│  │    - Info productos (nombre, fotos, precio)             │   │
│  │ 5. Formatear mensaje                                     │   │
│  │ 6. Llamar a Twilio WhatsApp API                         │   │
│  │    • Mensaje de confirmación                            │   │
│  │    • Foto del producto                                   │   │
│  │    • Form link precompletado                            │   │
│  │ 7. Retornar orderId al frontend                         │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────┬──────────────────────────────────────────┘
                      │
                      ├─→ Base de Datos PostgreSQL (Prisma)
                      │   ├─ Order {id, userId, total, status...}
                      │   └─ OrderItem[] {productId, qty, price}
                      │
                      └─→ Twilio API ← NUEVO
                          └─→ WhatsApp messages al cliente
```

---

## 📁 ARCHIVOS QUE NECESITAN CAMBIOS

### 1. **Backend - Crear Rutas API**

```
app/api/orders/
├── route.js              ← POST para crear orden
└── [id]/
    └── route.js          ← GET/PATCH/DELETE para orden específica
```

**Qué hace:**

- POST /api/orders: Crea orden + envía WhatsApp
- GET /api/orders: Lista órdenes
- GET /api/orders/[id]: Obtiene una orden
- PATCH /api/orders/[id]: Actualiza estado
- DELETE /api/orders/[id]: Elimina orden

### 2. **Backend - Sevicio de WhatsApp**

```
lib/whatsapp/
└── whatsappService.js    ← Integración Twilio
```

**Funciones:**

- `sendOrderWhatsApp()` - Envía mensaje con detalles de la orden
- `sendProductImageWhatsApp()` - Envía foto del producto
- `sendFormLinkWhatsApp()` - Envía link del formulario precompletado

### 3. **Frontend - Actualizar Componente**

```
components/OrderSummary.jsx  ← Actualizar handlePlaceOrder()
```

**Cambios:**

- Recopilar datos completos
- Hacer POST a /api/orders
- Manejar respuestas y errores
- Mostrar confirmación

### 4. **Configuración**

```
.env.local (NO commitear)
├── TWILIO_ACCOUNT_SID
├── TWILIO_AUTH_TOKEN
├── TWILIO_PHONE_NUMBER
├── DATABASE_URL
└── NEXT_PUBLIC_APP_URL
```

### 5. **Dependencias Nuevas**

```json
{
	"dependencies": {
		"@prisma/client": "^5.7.0",
		"twilio": "^4.10.0"
	}
}
```

---

## 🔄 FLUJO PASO A PASO

### Cliente (Frontend)

```javascript
// 1. Usuario está en /cart
import OrderSummary from "@/components/OrderSummary";

// 2. OrderSummary.jsx recopila datos
const OrderSummary = ({ totalPrice, items }) => {
	// items = [{id, name, price, quantity, images...}]
	// totalPrice = 299.99
	// selectedAddress = {id, name, phone, city...}
	// paymentMethod = 'COD'
};

// 3. Usuario hace clic en "Place Order"
const handlePlaceOrder = async (e) => {
	e.preventDefault();

	// Preparar datos
	const orderData = {
		userId: "user-123", // Del auth/sesión
		storeId: "store-456", // Del auth/sesión
		addressId: selectedAddress.id, // Del formulario
		paymentMethod: "COD", // Del radio button
		total: 299.99, // Calculado
		items: [
			// Del carrito
			{ productId: "p1", quantity: 1, price: 299.99 },
		],
		isCouponUsed: false,
		coupon: {},
	};

	// 4. POST a la API
	const response = await fetch("/api/orders", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(orderData),
	});

	const result = await response.json();

	if (response.ok) {
		// 5. Éxito - ir a órdenes
		router.push(`/orders?id=${result.orderId}`);
	} else {
		// Error
		toast.error(result.error);
	}
};
```

### Servidor (Backend)

```javascript
// app/api/orders/route.js
export async function POST(request) {
	// 1. Recibir datos del cliente
	const body = await request.json();
	// body = {userId, storeId, addressId, paymentMethod, total, items, ...}

	// 2. Validar datos
	if (!body.userId || !body.addressId) {
		return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
	}

	// 3. Crear orden en la BD
	const order = await prisma.order.create({
		data: {
			userId: body.userId,
			storeId: body.storeId,
			addressId: body.addressId,
			paymentMethod: body.paymentMethod,
			total: body.total,
			// ... otros datos
			orderItems: {
				createMany: {
					data: body.items.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						price: item.price,
					})),
				},
			},
		},
	});

	// 4. Recuperar datos completos
	const user = await prisma.user.findUnique({
		where: { id: body.userId },
	});

	const address = await prisma.address.findUnique({
		where: { id: body.addressId },
	});

	const products = await prisma.product.findMany({
		where: { id: { in: body.items.map((i) => i.productId) } },
	});

	// 5. Enviar mensajes WhatsApp
	await sendOrderWhatsApp(address.phone, order, user, address);
	await sendProductImageWhatsApp(address.phone, products[0]);
	await sendFormLinkWhatsApp(address.phone, order.id, user);

	// 6. Retornar respuesta
	return NextResponse.json(
		{
			success: true,
			orderId: order.id,
			order: order,
		},
		{ status: 201 },
	);
}
```

### WhatsApp Service

```javascript
// lib/whatsapp/whatsappService.js
import twilio from "twilio";

const client = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN,
);

export async function sendOrderWhatsApp(toPhone, order, user, address) {
	// Construir mensaje
	const message = `
¡Hola ${user.name}!

Tu orden ${order.id} ha sido confirmada ✅

📦 DETALLES:
- Total: $${order.total}
- Status: ${order.status}
- Dirección: ${address.name}

Gracias por tu compra!
    `;

	// Enviar
	const result = await client.messages.create({
		body: message,
		from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
		to: `whatsapp:${toPhone}`,
	});

	return result;
}

export async function sendProductImageWhatsApp(toPhone, product) {
	// Enviar imagen
	const result = await client.messages.create({
		mediaUrl: product.images[0],
		from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
		to: `whatsapp:${toPhone}`,
	});

	return result;
}

export async function sendFormLinkWhatsApp(toPhone, orderId, user) {
	// Enviar link precompletado
	const link = `https://tuapp.com/form?orderId=${orderId}&name=${user.name}`;

	const message = `
Confirma tus datos aquí:
${link}
    `;

	const result = await client.messages.create({
		body: message,
		from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
		to: `whatsapp:${toPhone}`,
	});

	return result;
}
```

---

## 💾 BASE DE DATOS

**El modelo Order ya existe en Prisma:**

```prisma
model Order {
    id            String        @id @default(cuid())
    total         Float
    status        OrderStatus   @default(ORDER_PLACED)
    userId        String
    storeId       String
    addressId     String
    isPaid        Boolean       @default(false)
    paymentMethod PaymentMethod
    createdAt     DateTime      @default(now())
    updatedAt     DateTime      @updatedAt
    isCouponUsed  Boolean       @default(false)
    coupon        Json          @default("{}")
    orderItems    OrderItem[]

    user    User    @relation("BuyerRelation", fields: [userId], references: [id])
    store   Store   @relation(fields: [storeId], references: [id])
    address Address @relation(fields: [addressId], references: [id])
}

model OrderItem {
    orderId   String
    productId String
    quantity  Int
    price     Float

    order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
    product Product @relation(fields: [productId], references: [id])

    @@id([orderId, productId])
}
```

**Lo único faltante:**

- Un field `phone` en la tabla `Address` para enviar mensajes WhatsApp
- O usar el phone del `User` si existe

---

## 🔐 CONFIGURACIÓN REQUERIDA

### 1. Twilio Setup

```
1. Crear cuenta: https://www.twilio.com/
2. Obtener:
   - Account SID (ACxxxxxx...)
   - Auth Token
   - Número WhatsApp Business (+1234567890)
```

### 2. Variables de Entorno (.env.local)

```bash
# Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Database
DATABASE_URL=postgresql://user:pass@localhost/gocart
DIRECT_URL=postgresql://user:pass@localhost/gocart

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Instalar Dependencias

```bash
npm install @prisma/client twilio
npx prisma migrate dev
```

---

## 🧪 TESTING

```javascript
// En la consola del navegador (F12):
await fetch("/api/orders", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		userId: "user-123",
		storeId: "store-456",
		addressId: "addr-123",
		paymentMethod: "COD",
		total: 299.99,
		items: [{ productId: "p1", quantity: 1, price: 299.99 }],
		isCouponUsed: false,
		coupon: {},
	}),
})
	.then((r) => r.json())
	.then(console.log);
```

---

## ✅ RESUMEN

| Aspecto                  | ANTES           | DESPUÉS                     |
| ------------------------ | --------------- | --------------------------- |
| **Crear orden**          | ❌ No se guarda | ✅ Se guarda en BD          |
| **Mensajes WhatsApp**    | ❌ No existe    | ✅ Se envía automáticamente |
| **API**                  | ❌ No existe    | ✅ POST /api/orders         |
| **Datos reales**         | ❌ Solo dummy   | ✅ De verdad en BD          |
| **Confirmación cliente** | ❌ No se entera | ✅ Mensaje WhatsApp         |

---

## 📋 PRÓXIMOS PASOS

1. ✅ Analizar estructura (este documento)
2. ⬜ Instalar dependencias Twilio
3. ⬜ Crear servicio WhatsApp
4. ⬜ Crear rutas API para órdenes
5. ⬜ Actualizar OrderSummary.jsx
6. ⬜ Configurar Twilio
7. ⬜ Testing
8. ⬜ Deploy

---

**¿Quieres que implemente todo esto ahora?** 🚀
