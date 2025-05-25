/** @type {import('next').NextConfig} */
const nextConfig = {
    // Configuration pour les Service Workers
    async headers() {
        return [
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                    {
                        key: 'Service-Worker-Allowed',
                        value: '/',
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
        ];
    },

    // Optimisation des images et assets
    experimental: {
        optimizeCss: true,
    },

    // Configuration des assets statiques
    assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
};

module.exports = nextConfig;
