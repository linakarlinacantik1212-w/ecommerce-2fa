/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // Nonaktifkan LightningCSS agar build Vercel tidak error
  },
};

module.exports = nextConfig;
