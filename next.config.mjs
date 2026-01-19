/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
       remotePatterns: [new URL("https://img.daisyui.com/images/**") ]     
      }
};

export default nextConfig;
