'use client'
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

const WhatsAppButton = () => {

    const pathname = usePathname()

    // No mostrar el botón en el panel admin
    if (pathname.startsWith('/admin')) {
        return null
    }

    const whatsappNumber = "5491160265599" // Número de WhatsApp (con código de país)
    const message = "Hola, tengo una consulta sobre los productos" // Mensaje predeterminado
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            title="Contactanos por WhatsApp"
        >
            <MessageCircle size={28} />
        </a>
    )
}

export default WhatsAppButton
