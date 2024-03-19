/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
       
      },
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api.amudhu.tech',
       
      },
    ],
},
  reactStrictMode: true,
};

export default nextConfig;
