/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['integration-tests', 'prisma', 'src', 'test-setup'],
  },
  generateBuildId: () => {
    return process.env.DOCKER_TAG;
  },
  output: 'standalone',
};

export default nextConfig;
