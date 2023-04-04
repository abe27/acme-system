/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   appDir: true,
  // },
  env: {
    API_URL: process.env.API_URL || "http://localhost:3000",
  },
};

module.exports = nextConfig;
