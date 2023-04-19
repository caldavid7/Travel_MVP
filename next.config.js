/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "source.unsplash.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
