import { withPayload } from "@payloadcms/next/withPayload"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: new URL(process.env.PAYLOAD_PUBLIC_SERVER_URL).hostname,
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
}

export default withPayload(nextConfig)
