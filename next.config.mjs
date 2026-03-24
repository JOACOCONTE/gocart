/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Solo deshabilitar en desarrollo si es necesario
        unoptimized: process.env.NODE_ENV === 'development',
        // Dominios remotos permitidos (agregar según sea necesario)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
        ],
        // Cache de imágenes más agresivo
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
    },
    // Compresión de respuesta
    compress: true,
    // Prefetching automático
    experimental: {
        optimizePackageImports: ['lucide-react', 'react-hot-toast'],
    },
};

export default nextConfig;
