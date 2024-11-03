import { useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

import { SpinnerLight } from "@/components/assets/animated"

import { Alert } from "@/components/common/alert"
import { Button } from "@/components/common/button"
import { cn } from "@/utils/classnames"
import { userLocale } from "@/utils/lang"
import { routes } from "@/utils/routes"
import { validateEmail } from "@/utils/validation"

import type { InputHTMLAttributes } from "react"

export function ProductSubscriptionForm() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  const [isSuccess, setIsSuccess] = useState(false)
  const { t } = useTranslation("landing")

  const sendFormRequest = async () => {
    setIsSubmitting(true)

    try {
      // fields validation
      if (firstName.length < 2) {
        setIsSubmitting(false)
        setError(t("subcribeErrorName"))
        return
      }
      if (email.length === 0 || !validateEmail(email)) {
        setIsSubmitting(false)
        setError(t("subcribeErrorEmail"))
        return
      }

      const audienceId = import.meta.env.PUBLIC_MAILCHIMP_PRODUCT_AUDIENCE_ID
      const apiEndpoint = `${import.meta.env.PUBLIC_DIRECTUS_URL}/subscribe/${audienceId}`
      await axios.post(apiEndpoint, {
        email,
        fname: firstName,
        mailchimpTags: `anthill,website,${userLocale()}`,
      })

      sessionStorage.setItem("subscriber:email", email)

      setError(undefined)
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")
      setFirstName("")
    } catch (err) {
      console.error(err)
      setError(t("subcribeErrorDescription"))
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className="flex w-full flex-col gap-4">
        <NewsletterFormField
          type="text"
          className="w-full rounded-md lg:max-w-full"
          placeholder={t("namePlaceholder")}
          autoComplete="name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <NewsletterFormField
          type="email"
          className="w-full rounded-md lg:max-w-full"
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          className="h-10 w-full justify-center text-center"
          type="primary"
          disabled={isSubmitting}
          onClick={sendFormRequest}
        >
          {isSubmitting && <SpinnerLight className="mr-2 h-6 w-6" />}
          Subscribe
        </Button>
      </form>

      {error && (
        <div className="my-4 w-full max-w-4xl">
          <Alert type="danger" title={t("subcribeErrorTitle")} onClose={() => setError(undefined)}>
            {error}
          </Alert>
        </div>
      )}

      {isSuccess && (
        <div className="my-4 w-full max-w-4xl">
          <Alert type="success" title="Almost done!">
            Thank you for your submission. Please check your inbox for a confirmation email.
          </Alert>
        </div>
      )}
    </>
  )
}

function NewsletterFormField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "z-0 w-full rounded-none border border-gray-300 bg-transparent px-4 py-3 transition duration-200 ",
        "text-sm placeholder:text-sm placeholder:text-gray-500",
        "focus:z-10 focus:border-primary-500 focus:bg-white focus:outline-none",
        "lg:-mr-px lg:max-w-64 lg:border-b lg:focus:border-b",
        className
      )}
    />
  )
}
