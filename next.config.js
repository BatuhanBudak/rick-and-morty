/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com'
        
      },
    ],
  },
  eslint: {
   
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
