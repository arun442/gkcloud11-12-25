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

basePath :'/gkcs',
// basePath :'',

eslint: {
  ignoreDuringBuilds: true,
},

  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://embeds.beehiiv.com;",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://embeds.beehiiv.com", // ⚠️ Not supported in all browsers
          },
        ],
      },
    ];
  },
};

export default nextConfig;
