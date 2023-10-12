/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "images.unsplash"}
        ]
    },
    experimental: {
        serverActions: true
    },
    transpilePackages: ['three'],
}

module.exports = nextConfig
