'use client'

import { XIcon, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ContactModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('All fields are required');
            return;
        }

        setIsLoading(true);
        
        try {
            // Aquí puedes agregar la lógica para enviar el email
            // Por ahora solo mostramos un mensaje
            console.log('Contact form submitted:', formData);
            
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
            onClose();
        } catch (error) {
            toast.error('Failed to send message');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 className="text-2xl font-semibold text-gray-800">Contáctanos</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <XIcon size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de Contacto</h3>
                                <p className="text-gray-600 text-sm mb-6">Estamos aquí para ayudarte. Contáctanos a través de cualquiera de estos medios.</p>
                            </div>

                            {/* Contact Items */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail size={20} className="text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-800">Email</p>
                                        <a href="mailto:contacto@arte-joyas.com" className="text-green-500 hover:text-green-600 text-sm">
                                            contacto@arte-joyas.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone size={20} className="text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-800">Teléfono</p>
                                        <a href="tel:+5493525306926" className="text-green-500 hover:text-green-600 text-sm">
                                            +54 9 3525 306926
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin size={20} className="text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-800">Ubicación</p>
                                        <p className="text-gray-600 text-sm">
                                            Argentina
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Button */}
                            <div className="pt-4">
                                <a
                                    href="https://wa.me/5493525306926"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04.964-1.04 2.353 0 1.389 1.064 2.729 1.212 2.927.149.198 2.096 3.2 5.084 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.584-4.165 1.638l-.293.273a6.957 6.957 0 00-1.623 3.49l3.49 1.752.001-5.153zm8.834 5.153l-3.49-1.752 1.623-3.49a6.96 6.96 0 014.165-1.638h.004l-2.302 6.88z"/>
                                    </svg>
                                    Escríbenos por WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Asunto *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Asunto de tu mensaje"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                    placeholder="Tu mensaje aquí..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
                                >
                                    <Send size={18} />
                                    {isLoading ? 'Enviando...' : 'Enviar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
