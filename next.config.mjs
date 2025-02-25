/** @type {import('next').NextConfig} */
const config = {
        images: {
          domains: ['images.ctfassets.net'],
          formats: ['image/avif', 'image/webp'],
        },
        output: 'standalone',
      };

export default config;
