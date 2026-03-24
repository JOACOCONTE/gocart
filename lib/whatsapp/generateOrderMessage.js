/**
 * Utilidad para generar mensajes de WhatsApp
 * ⚠️ Solo funciones de CLIENT (sin dependencias de servidor)
 */

/**
 * Genera un mensaje de pedido formateado para WhatsApp
 * Sin usar API ni base de datos, solo texto pre-armado
 * 
 * @param {Array} items - Items del carrito con {id, name, price, quantity, image}
 * @param {number} totalPrice - Precio total
 * @param {string} currency - Símbolo de moneda
 * @returns {Object} - {message: string, whatsappUrl: string}
 */
export function generateWhatsAppOrderMessage(items = [], totalPrice = 0, currency = '$') {
    const ownerPhoneNumber = '+5493525306926';
    
    if (!items || items.length === 0) {
        return {
            message: 'Hola, quiero hacer un pedido',
            whatsappUrl: `https://wa.me/${ownerPhoneNumber.replace(/\D/g, '')}`
        };
    }

    // Construir detalles de productos
    let orderDetails = 'Hola, quiero hacer un pedido:\n\n';
    
    items.forEach((item, index) => {
        const subtotal = (item.price * item.quantity).toFixed(2);
        orderDetails += `📦 Producto ${index + 1}: ${item.name}\n`;
        orderDetails += `   Cantidad: ${item.quantity}\n`;
        orderDetails += `   Precio unitario: ${currency}${item.price.toFixed(2)}\n`;
        orderDetails += `   Subtotal: ${currency}${subtotal}\n\n`;
    });

    // Agregar total
    const finalTotal = totalPrice.toFixed(2);
    orderDetails += `💰 TOTAL: ${currency}${finalTotal}\n\n`;
    orderDetails += 'Gracias';

    // Generar URL de WhatsApp (sin +, sin espacios ni caracteres especiales)
    const phoneNumberDigits = ownerPhoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumberDigits}?text=${encodeURIComponent(orderDetails)}`;

    return {
        message: orderDetails,
        whatsappUrl: whatsappUrl,
        phoneNumber: ownerPhoneNumber
    };
}
