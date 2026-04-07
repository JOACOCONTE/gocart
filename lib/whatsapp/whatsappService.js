/**
 * 🔔 WhatsApp Service - Integración con Twilio
 * ⚠️ SOLO PARA SERVER SIDE - NO USAR EN COMPONENTES CLIENTE
 * 
 * Este servicio maneja el envío de mensajes automáticos a WhatsApp
 * cuando se crea una nueva orden.
 */

import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Inicializar cliente de Twilio
const twilioClient = twilio(accountSid, authToken);

/**
 * Envía un mensaje de confirmación de orden por WhatsApp
 * 
 * @param {string} toPhoneNumber - Número destino en formato +XXXXXXXXXXX
 * @param {Object} order - Datos de la orden
 * @param {Object} user - Información del usuario
 * @param {Object} address - Dirección de envío
 * @param {Array} orderItems - Items de la orden con detalles
 * @returns {Promise<Object>} - Resultado del envío
 */
export async function sendOrderConfirmationWhatsApp(
    toPhoneNumber,
    order,
    user,
    address,
    orderItems
) {
    try {
        // Validar credenciales de Twilio
        if (!accountSid || !authToken || !twilioPhoneNumber) {
            console.warn('⚠️ Credenciales de Twilio no configuradas. Saltando envío de WhatsApp.');
            return { success: true, skipped: true, reason: 'Credenciales no configuradas' };
        }

        // Formatear teléfono
        const formattedPhone = formatPhoneNumber(toPhoneNumber);

        // Construir lista de items
        let itemsText = '';
        orderItems.forEach((item, index) => {
            itemsText += `\n${index + 1}. ${item.productName}\n   Cantidad: ${item.quantity} | Precio: $${item.price.toLocaleString()}`;
        });

        // Construir mensaje
        const message = `
*✅ ORDEN CONFIRMADA*

¡Hola ${user.name}! 👋

Tu pedido ha sido procesado exitosamente.

*📦 DETALLES DE LA ORDEN*
Número de orden: ${order.id}
Fecha: ${new Date(order.createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
Total: *$${order.total.toLocaleString()}*
Estado: ${translateStatus(order.status)}
Pago: ${order.paymentMethod === 'COD' ? 'Contra Entrega' : 'En Línea'}

*🛍️ PRODUCTOS*${itemsText}

*📍 DIRECCIÓN DE ENTREGA*
${address.name}
${address.address}
${address.city}, ${address.state} ${address.zip}
${address.phone}

*📧 CONTACTO*
Email: ${user.email}

Gracias por tu compra. Te contactaremos pronto con el despacho de tu pedido.
        `.trim();

        const result = await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${twilioPhoneNumber}`,
            to: `whatsapp:${formattedPhone}`
        });

        console.log(`✅ Mensaje de confirmación enviado: ${result.sid}`);
        return { success: true, messageSid: result.sid };
    } catch (error) {
        console.error('❌ Error enviando confirmación por WhatsApp:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Envía la imagen del producto por WhatsApp
 * 
 * @param {string} toPhoneNumber - Número destino
 * @param {Object} product - Información del producto
 * @returns {Promise<Object>} - Resultado del envío
 */
export async function sendProductImageWhatsApp(toPhoneNumber, product) {
    try {
        if (!accountSid || !authToken || !twilioPhoneNumber) {
            console.warn('⚠️ Credenciales de Twilio no configuradas.');
            return { success: true, skipped: true };
        }

        const formattedPhone = formatPhoneNumber(toPhoneNumber);

        // Si no hay imagen, solo enviar descripción
        if (!product.images || product.images.length === 0) {
            const textMessage = createProductDescription(product);
            const result = await twilioClient.messages.create({
                body: textMessage,
                from: `whatsapp:${twilioPhoneNumber}`,
                to: `whatsapp:${formattedPhone}`
            });
            return { success: true, messageSid: result.sid };
        }

        // Enviar imagen con caption
        const caption = `
*✨ ${product.name}*

${product.description}

💰 Precio: $${product.price.toLocaleString()}
📦 Categoría: ${product.category}
        `.trim();

        const result = await twilioClient.messages.create({
            mediaUrl: product.images[0],
            body: caption,
            from: `whatsapp:${twilioPhoneNumber}`,
            to: `whatsapp:${formattedPhone}`
        });

        console.log(`✅ Imagen del producto enviada: ${result.sid}`);
        return { success: true, messageSid: result.sid };
    } catch (error) {
        console.error('❌ Error enviando imagen por WhatsApp:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Envía un link del formulario precompletado por WhatsApp
 * 
 * @param {string} toPhoneNumber - Número destino
 * @param {string} orderId - ID de la orden
 * @param {Object} user - Información del usuario
 * @param {Object} address - Dirección
 * @returns {Promise<Object>} - Resultado del envío
 */
export async function sendFormLinkWhatsApp(toPhoneNumber, orderId, user, address) {
    try {
        if (!accountSid || !authToken || !twilioPhoneNumber) {
            return { success: true, skipped: true };
        }

        const formattedPhone = formatPhoneNumber(toPhoneNumber);
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000';

        // Construir URL con parámetros precompletados
        const params = new URLSearchParams({
            orderId: orderId,
            name: user.name,
            email: user.email,
            phone: address.phone,
            city: address.city
        });

        const formUrl = `${appUrl}/order-confirmation?${params.toString()}`;

        const message = `
Para confirmar o actualizar tus datos, haz clic aquí:

${formUrl}

Los datos están precompletados para tu comodidad. ✨
        `.trim();

        const result = await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${twilioPhoneNumber}`,
            to: `whatsapp:${formattedPhone}`
        });

        console.log(`✅ Link de formulario enviado: ${result.sid}`);
        return { success: true, messageSid: result.sid };
    } catch (error) {
        console.error('❌ Error enviando formulario por WhatsApp:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Formatea un número telefónico al formato requerido por Twilio
 * 
 * @param {string} phone - Número en cualquier formato
 * @returns {string} - Número formateado +XXXXXXXXXXX
 */
function formatPhoneNumber(phone) {
    if (!phone) return '';

    // Si ya tiene formato +, devolverlo
    if (phone.startsWith('+')) {
        return phone;
    }

    // Remover caracteres especiales
    const cleaned = phone.replace(/\D/g, '');

    // Si no tiene código de país, asumir que es número local
    if (cleaned.length <= 10) {
        // Usar código de país por defecto (56 para Chile, ajusta según tu región)
        return `+56${cleaned}`;
    }

    return `+${cleaned}`;
}

/**
 * Traduce el estado de la orden a español
 * 
 * @param {string} status - Estado de la orden
 * @returns {string} - Estado traducido
 */
function translateStatus(status) {
    const translations = {
        'ORDER_PLACED': '📍 Orden Recibida',
        'PROCESSING': '⚙️ En Procesamiento',
        'SHIPPED': '🚚 En Tránsito',
        'DELIVERED': '✅ Entregada'
    };
    return translations[status] || status;
}

/**
 * Crea descripción formateada de un producto
 * 
 * @param {Object} product - Datos del producto
 * @returns {string} - Descripción formateada
 */
function createProductDescription(product) {
    return `
✨ *${product.name}*

${product.description}

💰 Precio: $${product.price.toLocaleString()}
📦 Categoría: ${product.category}
    `.trim();
}

/**
 * Envía todos los mensajes de una orden en secuencia
 * Función auxiliar para usar en el backend
 * 
 * @param {string} toPhone - Número destino
 * @param {Object} order - Datos de la orden
 * @param {Object} user - Info del usuario
 * @param {Object} address - Dirección
 * @param {Array} products - Array de productos
 * @returns {Promise<Object>} - Resultado de todos los envíos
 */
export async function sendAllOrderMessages(toPhone, order, user, address, products) {
    const results = {
        confirmation: null,
        image: null,
        form: null,
        allSuccess: true
    };

    try {
        // Preparar items con información
        const orderItems = order.orderItems?.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                productName: product?.name || 'Producto',
                quantity: item.quantity,
                price: item.price
            };
        }) || [];

        // 1. Enviar confirmación
        results.confirmation = await sendOrderConfirmationWhatsApp(
            toPhone,
            order,
            user,
            address,
            orderItems
        );

        // 2. Enviar imagen del primer producto
        if (products && products.length > 0) {
            results.image = await sendProductImageWhatsApp(toPhone, products[0]);
        }

        // 3. Enviar formulario
        results.form = await sendFormLinkWhatsApp(toPhone, order.id, user, address);

        // Verificar si alguno falló
        results.allSuccess = 
            (!results.confirmation.error) &&
            (!results.image.error) &&
            (!results.form.error);

        console.log(`✅ Todos los mensajes de la orden ${order.id} fueron procesados`);
    } catch (error) {
        console.error('❌ Error en sendAllOrderMessages:', error);
        results.allSuccess = false;
    }

    return results;
}
