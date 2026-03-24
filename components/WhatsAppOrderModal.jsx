'use client'

import { XIcon, Send, Plus, Minus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { generateWhatsAppOrderMessage } from '@/lib/whatsapp/generateOrderMessage';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/lib/features/cart/cartSlice';

const WhatsAppOrderModal = ({ 
    isOpen, 
    onClose, 
    items = [], 
    totalPrice = 0, 
    currency = '$',
    clearCartOnSend = false 
}) => {
    const [editableMessage, setEditableMessage] = useState('');
    const [quantities, setQuantities] = useState({});
    const dispatch = useDispatch();

    // Inicializar cantidades
    useEffect(() => {
        if (isOpen && items.length > 0) {
            const newQuantities = {};
            items.forEach((item, index) => {
                newQuantities[index] = item.quantity || 1;
            });
            setQuantities(newQuantities);
            
            const { message } = generateWhatsAppOrderMessage(items, totalPrice, currency);
            setEditableMessage(message);
        }
    }, [isOpen, items, totalPrice, currency]);

    // Actualizar cantidad y regenerar mensaje
    const handleQuantityChange = (index, newQuantity) => {
        if (newQuantity < 1) return;
        
        const updatedQuantities = { ...quantities, [index]: newQuantity };
        setQuantities(updatedQuantities);
        
        // Actualizar items con nuevas cantidades
        const updatedItems = items.map((item, i) => ({
            ...item,
            quantity: updatedQuantities[i] || item.quantity
        }));
        
        // Recalcular total
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Regenerar mensaje
        const { message } = generateWhatsAppOrderMessage(updatedItems, newTotal, currency);
        setEditableMessage(message);
    };

    const handleSendWhatsApp = () => {
        if (!editableMessage.trim()) {
            alert('El mensaje no puede estar vacío');
            return;
        }
        
        // Generar URL con el mensaje editado
        const phoneNumberDigits = '+5493525306926'.replace(/\D/g, '');
        const customUrl = `https://wa.me/${phoneNumberDigits}?text=${encodeURIComponent(editableMessage)}`;
        
        // Abrir WhatsApp
        window.open(customUrl, '_blank');
        
        // Limpiar carrito si es necesario
        if (clearCartOnSend) {
            dispatch(clearCart());
        }
        
        // Cerrar modal
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-xl mx-4 max-h-[85vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 className="text-2xl font-semibold text-gray-800">📱 Pedido por WhatsApp</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <XIcon size={24} />
                    </button>
                </div>

                {/* Contenido */}
                <div className="p-6">
                    {/* Controles de cantidad */}
                    {items.length === 1 && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Ajusta la cantidad:</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleQuantityChange(0, quantities[0] - 1)}
                                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
                                >
                                    <Minus size={18} />
                                </button>
                                <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                                    {quantities[0]}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(0, quantities[0] + 1)}
                                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    <p className="text-sm text-gray-600 mb-3">
                        Edita tu mensaje si lo deseas:
                    </p>
                    
                    <textarea
                        value={editableMessage}
                        onChange={(e) => setEditableMessage(e.target.value)}
                        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none font-mono text-sm"
                        placeholder="Cargando mensaje..."
                    />

                    {/* Detalles de la orden */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-3">Resumen de tu pedido:</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                            {items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span className="text-right">
                                        <div className="text-xs text-gray-500">x{quantities[index]}</div>
                                        <div className="font-medium">{currency}{(item.price * (quantities[index] || item.quantity)).toFixed(2)}</div>
                                    </span>
                                </div>
                            ))}
                            <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-semibold text-gray-900">
                                <span>Total:</span>
                                <span>
                                    {currency}
                                    {items.reduce((total, item, index) => 
                                        total + (item.price * (quantities[index] || item.quantity)), 0
                                    ).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 active:scale-95 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSendWhatsApp}
                        className="flex-1 px-4 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 active:scale-95 transition flex items-center justify-center gap-2"
                    >
                        <Send size={18} />
                        Enviar por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppOrderModal;
