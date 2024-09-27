/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "source.unsplash.com", "images.unsplash.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
    test: /\.svg$/,
    use: [
        {
        loader: '@svgr/webpack',
        options: {
            icon: true,
        },
        },
    ],
    });

    return config;
  },
};

module.exports = nextConfig;
