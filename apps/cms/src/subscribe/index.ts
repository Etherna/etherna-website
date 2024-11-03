import { defineEndpoint } from "@directus/extensions"
import mailchimp from "@mailchimp/mailchimp_marketing"
import axios, { isAxiosError } from "axios"

require("dotenv").config()

export default defineEndpoint({
  id: "subscribe",
  handler(router, context) {
    router.post("/:list", async (req, res) => {
      try {
        mailchimp.setConfig({
          apiKey: process.env.MAILCHIMP_TOKEN,
          server: process.env.MAILCHIMP_SERVER,
        })

        const submission = req.body as {
          email: string
          fname: string
          lname?: string
          mailchimpTags?: string
        }

        const listId = req.params.list
        const tags = (submission.mailchimpTags ?? "")
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
        const email = submission.email

        const member = {
          email_address: email,
          status: "pending",
          tags,
          merge_fields: {
            FNAME: submission.fname,
            LNAME: submission.lname ?? "",
          },
        } satisfies mailchimp.lists.AddListMemberBody

        const url = `https://${process.env.MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${listId}/members`
        const resp = await axios.post(
          url,
          {
            email_address: email,
            status: "pending",
            tags,
            merge_fields: {
              FNAME: submission.fname,
              LNAME: submission.lname ?? "",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.MAILCHIMP_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        )

        res.json({ status: "ok", code: "DONE" })
      } catch (err) {
        if (isAxiosError(err) && err.response?.data.toString().includes("Member Exists")) {
          res.status(200).json({ status: "ok", code: "EXIST" })
          return
        }

        const error = isAxiosError(err) ? err.response?.data : err
        console.error(error)

        res.status(400).json({ status: "error", error })
      }
    })
  },
})
