'use client'

import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
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
            toast.error('Todos los campos son requeridos');
            return;
        }

        setIsLoading(true);
        
        try {
            // Aquí puedes agregar la lógica para enviar el email a través de una API
            console.log('Contact form submitted:', formData);
            
            toast.success('¡Mensaje enviado exitosamente!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast.error('Error al enviar el mensaje');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            content: 'contacto@arte-joyas.com',
            href: 'mailto:contacto@arte-joyas.com'
        },
        {
            icon: Phone,
            title: 'Teléfono',
            content: '+54 9 3525 306926',
            href: 'tel:+5493525306926'
        },
        {
            icon: MapPin,
            title: 'Ubicación',
            content: 'Argentina',
            href: '#'
        },
        {
            icon: Clock,
            title: 'Horario',
            content: 'Lunes a Viernes 9:00 - 18:00 hs',
            href: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#346c6b] via-[#2a5a59] to-[#1f4847] text-white py-20 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500 opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-400 opacity-5 rounded-full blur-3xl -ml-40 -mb-40"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="max-w-2xl">
                        <div className="inline-block mb-4 px-4 py-1 bg-green-500/20 border border-green-400/50 rounded-full">
                            <p className="text-green-200 text-sm font-medium">Estamos disponibles 24/7</p>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Contáctanos y <span className="text-green-300">resolvemos</span> tus dudas
                        </h1>
                        <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                            ¿Preguntas sobre nuestros productos? ¿Necesitas ayuda con tu pedido? Nuestro equipo está aquí para brindarte la mejor atención.
                        </p>
                        
                        {/* Quick Contact Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="tel:+5493525306926"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105"
                            >
                                <Phone size={20} />
                                Llamanos
                            </a>
                            <a
                                href="https://wa.me/5493525306926"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3 px-6 rounded-lg transition"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04.964-1.04 2.353 0 1.389 1.064 2.729 1.212 2.927.149.198 2.096 3.2 5.084 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.584-4.165 1.638l-.293.273a6.957 6.957 0 00-1.623 3.49l3.49 1.752.001-5.153zm8.834 5.153l-3.49-1.752 1.623-3.49a6.96 6.96 0 014.165-1.638h.004l-2.302 6.88z"/>
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                
                {/* Contact Info Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {contactInfo.map((info, index) => {
                        const Icon = info.icon;
                        return (
                            <a
                                key={index}
                                href={info.href}
                                className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 hover:border-green-300"
                            >
                                <div className="p-3 bg-green-50 rounded-lg w-fit mb-4 group-hover:bg-green-100 transition">
                                    <Icon size={24} className="text-green-600" />
                                </div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{info.title}</p>
                                <p className="font-semibold text-gray-800 group-hover:text-green-600 transition">{info.content}</p>
                            </a>
                        );
                    })}
                </div>

                {/* Contact Form & Info Section */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    
                    {/* Left Side - Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                ¿Tienes <span className="text-green-600">preguntas?</span>
                            </h2>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                Nos encantaría escucharte. Nuestro equipo está disponible para responder cualquier pregunta sobre nuestros productos y servicios.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Rellena el formulario y nos pondremos en contacto lo antes posible. También puedes comunicarte directamente a través de WhatsApp para una respuesta más rápida.
                            </p>
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href="https://wa.me/5493525306926"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04.964-1.04 2.353 0 1.389 1.064 2.729 1.212 2.927.149.198 2.096 3.2 5.084 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.562 0-3.051.584-4.165 1.638l-.293.273a6.957 6.957 0 00-1.623 3.49l3.49 1.752.001-5.153zm8.834 5.153l-3.49-1.752 1.623-3.49a6.96 6.96 0 014.165-1.638h.004l-2.302 6.88z"/>
                            </svg>
                            Escríbenos por WhatsApp
                        </a>

                        {/* Response Time Info */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl">
                            <p className="text-gray-800">
                                <span className="font-bold text-green-600">⚡ Respuesta rápida:</span> Generalmente respondemos dentro de <span className="font-semibold">2-4 horas</span> en horario laboral.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                        <h3 className="text-3xl font-bold text-gray-900 mb-8">Envíanos tu mensaje</h3>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre completo *
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                placeholder="Tu nombre"
                                required
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                placeholder="tu@email.com"
                                required
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                                placeholder="¿En qué podemos ayudarte?"
                                required
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
                                rows="5"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                                placeholder="Cuéntanos sobre tu consulta..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-green-400 disabled:to-green-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Send size={20} />
                            {isLoading ? 'Enviando...' : 'Enviar mensaje'}
                        </button>
                    </form>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 rounded-2xl shadow-xl">
                    <h3 className="text-4xl font-bold mb-12">Preguntas frecuentes</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/15 transition">
                            <h4 className="font-bold text-green-300 mb-3 text-lg">¿Cuál es el costo de envío?</h4>
                            <p className="text-gray-100">
                                Ofrecemos envío gratis en todo el país para compras superiores a determinado monto. Consulta los detalles en el carrito.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/15 transition">
                            <h4 className="font-bold text-green-300 mb-3 text-lg">¿Cuál es el tiempo de entrega?</h4>
                            <p className="text-gray-100">
                                Los pedidos se procesan dentro de 24 a 48 horas hábiles y se entregan entre 3 a 7 días dependiendo de tu ubicación.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/15 transition">
                            <h4 className="font-bold text-green-300 mb-3 text-lg">¿Aceptan devoluciones?</h4>
                            <p className="text-gray-100">
                                Sí, aceptamos devoluciones dentro de 30 días. El producto debe estar en las mismas condiciones en que fue recibido.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/15 transition">
                            <h4 className="font-bold text-green-300 mb-3 text-lg">¿Personalizan productos?</h4>
                            <p className="text-gray-100">
                                Sí, ofrecemos personalizaciones. Ponte en contacto con nosotros para más detalles sobre este servicio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
