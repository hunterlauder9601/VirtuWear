/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "*"}
        ]
    },
    transpilePackages: ['three'],
}

module.exports = nextConfig
