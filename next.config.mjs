/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
       
      },
      {
        protocol: 'https',
        hostname: 'i.gkcloud.ai',
       
      },
    ],
   
},
  reactStrictMode: true,
};

export default nextConfig;
