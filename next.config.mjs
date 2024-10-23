import 'dotenv/config';

console.log('POSTGRES_URL from env:', process.env.POSTGRES_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's strict mode for additional checks
    swcMinify: true, // Uses the SWC compiler for faster builds and minification
    images: {
      domains: ['example.com'], // Replace with domains you use for external images
    },
    output: 'standalone', // Optimizes the build for use in a Docker container
};

// Log the value to check if it's being picked up
console.log('POSTGRES_URL from next.config.mjs:', process.env.POSTGRES_URL);

export default nextConfig;
