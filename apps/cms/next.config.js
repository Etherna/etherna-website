import { withPayload } from "@payloadcms/next/withPayload"

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: new URL(NEXT_PUBLIC_SERVER_URL).protocol.replace(":", ""),
        hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
}

export default withPayload(nextConfig)
