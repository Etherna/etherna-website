import { withPayload } from "@payloadcms/next/withPayload"

export default withPayload({
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    // reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: new URL(process.env.NEXT_PUBLIC_SERVER_URL ?? "").hostname,
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
    ],
  },
})
