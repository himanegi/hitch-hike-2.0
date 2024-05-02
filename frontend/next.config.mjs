/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://hitch-hike-2-0-p5az.onrender.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
