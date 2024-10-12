import mailchimp from "@mailchimp/mailchimp_marketing"

import type { Endpoint } from "payload"

class CorsResponse extends Response {
  constructor(body: BodyInit, init?: ResponseInit) {
    super(body, {
      ...init,
      headers: {
        ...init?.headers,
        "Access-Control-Allow-Origin": process.env.PAYLOAD_PUBLIC_FRONTEND_URL || "",
        "Access-Control-Allow-Methods": "POST",
      },
    })
  }
}

export const submitForm: Endpoint = {
  method: "post",
  path: "/submit-form",
  handler: async (req) => {
    const submission = (await req.json?.()) as Record<string, string>

    if (!submission.formId) {
      return new CorsResponse(JSON.stringify({ status: "error", message: "formId is required" }), {
        status: 400,
      })
    }

    const form = await req.payload.findByID({
      collection: "forms",
      id: submission.formId,
    })

    // check fields
    for (const field of form.fields ?? []) {
      if (field.blockType === "message") {
        continue
      }

      if (field.required && !submission[field.name]) {
        return new CorsResponse(
          JSON.stringify({ status: "error", message: `${field.name} is required` }),
          { status: 400 },
        )
      }
      if (
        field.blockType === "email" &&
        submission[field.name] &&
        !(submission[field.name] as string).match(/^[^@]+@[^@]+\.[^@]+$/)
      ) {
        return new CorsResponse(
          JSON.stringify({ status: "error", message: `${field.name} is not a valid email` }),
          {
            status: 400,
          },
        )
      }
    }

    const event = form.event

    if (event === "registration") {
      if (!form.mailchimpList) {
        return new CorsResponse(
          JSON.stringify({ status: "error", message: "mailchimpList is required" }),
          { status: 400 },
        )
      }

      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_TOKEN,
        server: process.env.MAILCHIMP_SERVER,
      })

      const listId = form.mailchimpList
      const tags = (form.mailchimpTags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
      const email = submission.email as string

      const member = {
        email_address: email,
        status: "pending",
        tags,
        merge_fields: {
          FNAME: submission.FNAME,
          LNAME: submission.LNAME,
        },
      } satisfies mailchimp.lists.AddListMemberBody

      try {
        await mailchimp.lists.addListMember(listId, member)
      } catch (err) {
        const error = err as { response: { body: Record<string, unknown> } }
        if (error.response.body.title === "Member Exists") {
          return new CorsResponse(JSON.stringify({ status: "ok", code: "EXIST" }), { status: 200 })
        }
        return new CorsResponse(
          JSON.stringify({ status: "error", message: error.response.body.title }),
          { status: 400 },
        )
      }
    } else {
      const submissionData = (form.fields ?? [])
        .filter((field) => field.blockType !== "message")
        .map((field) => ({
          id: field.id,
          field: field.name,
          value: submission[field.name] ?? "",
        }))

      await req.payload.create({
        collection: "form-submissions",
        data: {
          form: form.id,
          submissionData,
        },
      })
    }

    return new CorsResponse(JSON.stringify({ status: "ok", code: "CREATE" }), { status: 200 })
  },
}
