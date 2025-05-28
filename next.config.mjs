import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  //   experimental: {
  //     appDir: true,
  //   },
  //   serverComponentsExternalPackages: ['bcrypt'],
  images: {
    // отключает оптимизацию изображений через шлюз
    // /_next/image  и позволяет использовать любые внешние ссылки
    unoptimized: true,
    // remotePatterns: [
      // {
        // protocol: 'https',
        // hostname: 'static.wikia.nocookie.net',
        // port: '',
        // pathname: '/simpsons/**',
      // },
    // ],
  }
};

// export default nextConfig;

export default withSentryConfig(nextConfig, {
  org: "twoya-shaurma",
  project: "twoya-shaurma",

  // Set to `true` to suppress logs
  silent: true,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
