import { someAccess } from "@/lib/access"
import { ACCESS_POLICIES } from "@/lib/const"
import { admin, field_admin } from "@/policies/admin"
import { anyone } from "@/policies/anyone"
import { authenticated } from "@/policies/authenticated"
import { selfUser } from "@/policies/self-user"

import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: authenticated,
    create: admin,
    delete: admin,
    read: anyone,
    readVersions: someAccess(admin, selfUser),
    update: someAccess(admin, selfUser),
    unlock: admin,
  },
  admin: {
    defaultColumns: ["firstName", "lastName", "email", "role", "policies"],
    useAsTitle: "name",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          async ({ data }) => [data?.firstName, data?.lastName].filter(Boolean).join(" "),
        ],
      },
    },
    {
      name: "firstName",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      defaultValue: "",
      required: true,
    },
    {
      name: "avatar",
      label: "Avatar",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "role",
      type: "text",
    },
    {
      name: "policies",
      type: "select",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
      access: {
        create: field_admin,
        update: field_admin,
        read: field_admin,
      },
      defaultValue: ["postsContributor"],
      required: true,
      options: Object.entries(ACCESS_POLICIES).map(([value, label]) => ({
        value,
        label,
      })),
    },
  ],
  timestamps: true,
}
