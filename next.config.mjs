/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
       
      },
      {
        protocol: 'http',
        hostname: 'gate.amudhu.tech',
       
      },
    ],
   
},
  reactStrictMode: true,
};

export default nextConfig;
