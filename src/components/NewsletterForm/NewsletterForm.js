import React, { useState } from "react"
import axios from "axios"

import Alert from "@components/common/Alert"
import Button from "@components/common/Button"
import Spinner from "!svg-react-loader!@images/animated/spinner-light.svg"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"
import { validateEmail } from "@utils/validation"

import "./newsletter-form.scss"

const NewsletterForm = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "landing")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState()

  const sendFormRequest = async () => {
    setIsSubmitting(true)

    try {
      // fields validation
      if (firstName.length < 2) {
        setIsSubmitting(false)
        setError(trans("subcribeErrorName"))
        return
      }
      if (email.length === 0 || !validateEmail(email)) {
        setIsSubmitting(false)
        setError(trans("subcribeErrorEmail"))
        return
      }

      const apiEndpoint = `${process.env.DIRECTUS_URL}/${process.env.DIRECTUS_PROJECT}/custom/newsletter`
      await axios.post(apiEndpoint, {
        email, firstName
      })

      setSuccess(true)
      setEmail("")
      setError(null)
    } catch (error) {
      console.error(error)
      setError(trans("subcribeErrorDescription"))
    }

    setIsSubmitting(false)
  }

  return (
    <>
      {!success && (
        <form className="newsletter-form">
          <input
            type="text"
            className="newsletter-form-field"
            placeholder={trans("namePlaceholder")}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <input
            type="email"
            className="newsletter-form-field"
            placeholder={trans("emailPlaceholder")}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button className="newsletter-form-cta" type="primary" disabled={isSubmitting} onClick={sendFormRequest}>
            {isSubmitting && (
              <Spinner />
            )}
            {trans("subcribeNewsletter")}
          </Button>
        </form>
      )}

      {error && (
        <div className="w-full my-4 max-w-4xl">
          <Alert type="danger" title={trans("subcribeErrorTitle")} onClose={() => setError(null)}>{error}</Alert>
        </div>
      )}

      {success && (
        <h3 className="text-center text-gray-600 mt-3">{trans("subcribeThankYou")}</h3>
      )}
    </>
  )
}

export default NewsletterForm
