import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

import { ReactComponent as Spinner } from "@/images/animated/spinner-light.svg"

import Alert from "@/components/common/Alert"
import Button from "@/components/common/Button"
import classNames from "@/utils/classnames"
import routes from "@/utils/routes"
import { validateEmail } from "@/utils/validation"

import type { InputHTMLAttributes } from "react"

const NewsletterForm: React.FC = () => {
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

      const apiEndpoint = `${import.meta.env.DIRECTUS_URL}/${
        import.meta.env.DIRECTUS_PROJECT
      }/custom/newsletter`
      await axios.post(apiEndpoint, {
        email,
        firstName,
      })

      sessionStorage.setItem("subscriber:email", email)

      setError(undefined)
      setIsSubmitting(false)

      window.location.href = routes.thankyouPath()
    } catch (error) {
      console.error(error)
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
          onChange={e => setFirstName(e.target.value)}
        />
        <NewsletterFormField
          type="email"
          className="-mt-px lg:mt-0"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          className={classNames(
            "-mt-px flex items-center whitespace-nowrap py-3 lg:mt-0",
            "rounded-b-lg rounded-t-none lg:rounded-lg lg:rounded-l-none"
          )}
          type="primary"
          disabled={isSubmitting}
          onClick={sendFormRequest}
        >
          {isSubmitting && <Spinner className="mr-2 h-6 w-6" />}
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

const NewsletterFormField: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={classNames(
        "z-0 w-full rounded-none border border-gray-300 bg-transparent px-4 py-3 transition duration-200 ",
        "text-sm placeholder:text-sm placeholder:text-gray-500",
        "focus:z-10 focus:border-primary-500 focus:bg-white focus:outline-none",
        "lg:-mr-px lg:max-w-64 lg:border-b lg:focus:border-b",
        className
      )}
    />
  )
}

export default NewsletterForm
