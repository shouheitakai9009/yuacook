/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/recipes",
      permanent: true,
    },
  ],
  images: {
    domains: ["p5izgpztbiyhnjkf.public.blob.vercel-storage.com"],
  },
};

export default nextConfig;
