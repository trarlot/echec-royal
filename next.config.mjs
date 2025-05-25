/** @type {import('next').NextConfig} */
const nextConfig = {
    // Transpile packages nécessaires
    transpilePackages: ['three', 'gsap'],

    // Optimisation des images
    images: {
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 31536000, // 1 an
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Configuration webpack
    webpack: (config, { dev, isServer }) => {
        // Gestion des assets 3D
        config.module.rules.push({
            test: /\.(glb|gltf)$/,
            type: 'asset/resource',
        });

        // Optimisation en production
        if (!dev && !isServer) {
            config.optimization.splitChunks.chunks = 'all';
            config.optimization.splitChunks.cacheGroups = {
                ...config.optimization.splitChunks.cacheGroups,
                three: {
                    name: 'three',
                    test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
                    chunks: 'all',
                    priority: 20,
                },
                gsap: {
                    name: 'gsap',
                    test: /[\\/]node_modules[\\/]gsap[\\/]/,
                    chunks: 'all',
                    priority: 20,
                },
            };
        }

        return config;
    },

    // Headers de performance
    async headers() {
        return [
            {
                source: '/images/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/3D/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/svg/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    // Compression gzip/brotli
    compress: true,

    // Optimisation CSS expérimentale
    experimental: {
        // optimizeCss: true,  // Commenté temporairement
        optimizePackageImports: ['gsap', 'three'],
    },

    // Réduction de la taille du bundle
    modularizeImports: {
        gsap: {
            transform: 'gsap/{{member}}',
        },
    },
};

export default nextConfig;
