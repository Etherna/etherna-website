import type { Block } from "payload"

export const CodeBlock = {
  slug: "code",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "language",
      type: "select",
      options: [
        {
          label: "Typescript",
          value: "ts",
        },
        {
          label: "Typescript React",
          value: "tsx",
        },
        {
          label: "Javascript",
          value: "js",
        },
        {
          label: "JSON",
          value: "json",
        },
        {
          label: "CSS",
          value: "css",
        },
        {
          label: "Bash",
          value: "bash",
        },
        {
          label: "C#",
          value: "csharp",
        },
      ],
    },
    {
      name: "code",
      type: "code",
      label: false,
      required: true,
    },
  ],
} as const satisfies Block
