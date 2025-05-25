import mailchimp from "@mailchimp/mailchimp_marketing"

import type { FormSubmission } from "@payload-types"
import type { CollectionBeforeChangeHook } from "payload"

export const createLead: CollectionBeforeChangeHook<FormSubmission> = async ({
  operation,
  req,
  data,
}) => {
  if (operation === "create") {
    const form =
      typeof data.form === "string"
        ? await req.payload.findByID({
            collection: "forms",
            id: data.form,
            depth: 0,
          })
        : data.form

    const isLead = form?.event === "registration"
    const email = data.submissionData?.find((field) => field.field === "email")?.value
    const FNAME = data.submissionData?.find((field) => field.field === "FNAME")?.value
    const LNAME = data.submissionData?.find((field) => field.field === "LNAME")?.value

    if (isLead && form.mailchimpList && email) {
      mailchimp.setConfig({
        apiKey: process.env.MAILCHIMP_TOKEN,
        server: process.env.MAILCHIMP_SERVER,
      })

      const listId = form.mailchimpList
      const tags = (form.mailchimpTags ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag)

      const member = {
        email_address: email,
        status: "pending",
        tags,
        merge_fields: {
          FNAME,
          LNAME,
        },
      } satisfies mailchimp.lists.AddListMemberBody

      try {
        await mailchimp.lists.addListMember(listId, member)
      } catch (err) {
        const error = err as { response: { body: Record<string, unknown> } }
        if (error.response.body.title !== "Member Exists") {
          throw new Error(
            (error.response.body.title as string) ||
              "An error occurred while adding the member to Mailchimp",
          )
        }
      }
    }
  }

  return data
}
