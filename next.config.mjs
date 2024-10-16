/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.freepik.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'encrypted-tbn0.gstatic.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'i.pinimg.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'media.istockphoto.com', // Added for istock images
          port: '',
        },
        // Add any other image sources you need here
      ],
    },
  };
  
  export default nextConfig;
  