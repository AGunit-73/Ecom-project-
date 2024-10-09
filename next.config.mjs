/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's strict mode for additional checks
    swcMinify: true, // Uses the SWC compiler for faster builds and minification
    images: {
      domains: ['example.com'], // Replace with domains you use for external images
    },
    output: 'standalone', // Optimizes the build for use in a Docker container
  };
  
  export default nextConfig;
  