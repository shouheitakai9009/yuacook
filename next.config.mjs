/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/recipes",
      permanent: true,
    },
  ],
};

export default nextConfig;
