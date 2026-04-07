/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuración de salida para servidor
    output: 'standalone',
    
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
        minimumCacheTTL: 60 * 60 * 24 * 365,
    },
    
    compress: true,
    
    experimental: {
        optimizePackageImports: ['lucide-react', 'react-hot-toast'],
    },
    
    // Configuración segura para servidor
    poweredByHeader: false,
    reactStrictMode: true,
    
    // Permitir cambios de archivo en .data
    webpackDevMiddleware: {
        watchOptions: {
            ignored: '/node_modules/',
        }
    },
    
    // Configuración de servidor
    serverRuntimeConfig: {
        PROJECT_ROOT: process.cwd(),
    },
    publicRuntimeConfig: {
        apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    },
};

export default nextConfig;
