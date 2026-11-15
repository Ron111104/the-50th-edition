/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // fully static: deploys to Vercel, Netlify or any file host
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
