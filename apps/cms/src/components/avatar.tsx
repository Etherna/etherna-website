import React, { Suspense } from "react"
import { headers } from "next/headers"
import Image from "next/image"

import { gravatarImage } from "@/lib/avatar"

import type { Media } from "@payload-types"
import type { ServerProps } from "payload"

export function UserAvatar(props: ServerProps) {
  return (
    <div className="relative size-7 overflow-hidden rounded-full bg-slate-500/50">
      <Suspense>
        <AvatarImage {...props} />
      </Suspense>
    </div>
  )
}

export async function AvatarImage({ payload }: ServerProps) {
  const { user } = await payload.auth({ headers: await headers() })

  return (
    <Image
      className="absolute inset-0"
      src={
        user?.avatar
          ? `${process.env.PAYLOAD_PUBLIC_SERVER_URL}${(user.avatar as Media).url}`
          : gravatarImage(user?.email ?? "at@example.com")
      }
      width={128}
      height={128}
      alt={`Avatar of ${user?.name}`}
      priority
    />
  )
}
