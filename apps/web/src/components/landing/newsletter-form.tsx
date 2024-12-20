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

export function NewsletterForm() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()
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

      const audienceId = import.meta.env.PUBLIC_MAILCHIMP_AUDIENCE_ID
      const apiEndpoint = `${import.meta.env.PUBLIC_DIRECTUS_URL}/subscribe/${audienceId}`
      await axios.post(apiEndpoint, {
        email,
        fname: firstName,
        mailchimpTags: `website,${userLocale()}`,
      })

      sessionStorage.setItem("subscriber:email", email)

      setError(undefined)
      setIsSubmitting(false)

      window.location.href = routes.thankyouPath()
    } catch (err) {
      console.error(err)
      setError(t("subcribeErrorDescription"))
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className="mx-auto mt-6 flex w-full max-w-lg flex-col lg:max-w-none lg:flex-row lg:justify-center">
        <NewsletterFormField
          type="text"
          className="rounded-t-lg focus:rounded-t-lg lg:rounded-none lg:rounded-l-lg lg:focus:rounded-none lg:focus:rounded-l-lg"
          placeholder={t("namePlaceholder")}
          value={firstName}
          autoComplete="name"
          onChange={e => setFirstName(e.target.value)}
        />
        <NewsletterFormField
          type="email"
          className="-mt-px lg:mt-0"
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          className={cn(
            "-mt-px flex items-center whitespace-nowrap py-3 lg:mt-0",
            "rounded-b-lg rounded-t-none lg:rounded-lg lg:rounded-l-none"
          )}
          type="primary"
          disabled={isSubmitting}
          onClick={sendFormRequest}
        >
          {isSubmitting && <SpinnerLight className="mr-2 h-6 w-6" />}
          {t("subcribeNewsletter")}
        </Button>
      </form>

      {error && (
        <div className="my-4 w-full max-w-4xl">
          <Alert type="danger" title={t("subcribeErrorTitle")} onClose={() => setError(undefined)}>
            {error}
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
