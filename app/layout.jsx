import { Outfit } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductInitializer from "@/components/ProductInitializer";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "Arte en Joyas - Ruben Badia",
    description: "GoCart. - Shop smarter",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${outfit.className} antialiased bg-[#346c6b] overflow-x-hidden`}>
                <StoreProvider>
                    <ProductInitializer />
                    <Suspense fallback={null}>
                        <LoadingOverlay />
                    </Suspense>
                    <Toaster />
                    <WhatsAppButton />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
