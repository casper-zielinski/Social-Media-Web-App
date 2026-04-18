/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://img.daisyui.com/images/**")],
    unoptimized: process.env.MOBILE === "true",
  },
  output: process.env.MOBILE === "true" ? "export" : undefined,
};

export default nextConfig;
