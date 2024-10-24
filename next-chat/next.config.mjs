/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
