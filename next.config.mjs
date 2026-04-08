/** @type {import('next').NextConfig} */
const nextConfig = {
    // Compilación y optimización
    swcMinify: true,
    compress: true,
    poweredByHeader: false,
    reactStrictMode: false, // Desactivado para evitar doble renderizado en desarrollo
    
    // Soporte para imagen optimizada
    images: {
        unoptimized: process.env.NODE_ENV === 'development',
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
        minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año de caché
        formats: ['image/webp', 'image/avif'],
    },
    
    // Optimización de paquetes
    experimental: {
        optimizePackageImports: ['lucide-react', 'react-hot-toast'],
    },
    
    // Headers para mejor caché en producción
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                ],
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },

    // Configuración de servidor
    serverRuntimeConfig: {
        PROJECT_ROOT: process.cwd(),
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NEXT_PUBLIC_API_URL || '',
    },
};

export default nextConfig;
