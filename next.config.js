// next.config.js
const ContentSecurityPolicy = require('./csp')
const redirects = require('./redirects')
const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', process.env.NEXT_PUBLIC_SERVER_URL]
      .filter(Boolean)
      .map(url => url.replace(/https?:\/\//, '')),
  },
  redirects,
  async headers() {
    const headers = []

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }

    headers.push({
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
    })

    return headers
  },
}

module.exports = withPayload(nextConfig, {
  configPath: path.resolve(__dirname, "./payload/payload.config.ts"),
  cssPath: path.resolve(__dirname, "./css/my-custom-payload-styles.css"),
  payloadPath: path.resolve(process.cwd(), "./payload/payloadClient.ts"),
  adminRoute: "/admin",
});
