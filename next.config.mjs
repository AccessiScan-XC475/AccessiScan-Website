/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.ENVIRONMENT === "dev"
            ? "http://localhost:8080/api/:path*"
            : "/api/",
      },
    ];
  },
};

export default nextConfig;
