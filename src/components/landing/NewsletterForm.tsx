import React, { useState } from "react"
import axios from "axios"
import { navigate } from "gatsby"

import classes from "@styles/components/landing/NewsletterForm.module.scss"
import { ReactComponent as Spinner } from "@images/animated/spinner-light.svg"

import Alert from "@components/common/Alert"
import Button from "@components/common/Button"
import TextField from "@components/common/TextField"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { validateEmail } from "@utils/validation"
import routes from "@utils/routes"

const NewsletterForm: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "landing")
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()

  const sendFormRequest = async () => {
    setIsSubmitting(true)

    try {
      // fields validation
      if (firstName.length < 2) {
        setIsSubmitting(false)
        setError(t`subcribeErrorName`)
        return
      }
      if (email.length === 0 || !validateEmail(email)) {
        setIsSubmitting(false)
        setError(t`subcribeErrorEmail`)
        return
      }

      const apiEndpoint = `${process.env.DIRECTUS_URL}/${process.env.DIRECTUS_PROJECT}/custom/newsletter`
      await axios.post(apiEndpoint, {
        email, firstName
      })

      setError(undefined)
      setIsSubmitting(false)
      navigate(routes.thankyouPath(), {
        state: { email }
      })
      setEmail("")
    } catch (error) {
      console.error(error)
      setError(t`subcribeErrorDescription`)
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className={classes.newsletterForm}>
        <input
          type="text"
          className={classes.newsletterFormField}
          placeholder={t`namePlaceholder`}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="email"
          className={classes.newsletterFormField}
          placeholder={t`emailPlaceholder`}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Button
          className={classes.newsletterFormCta}
          type="primary"
          disabled={isSubmitting}
          onClick={sendFormRequest}
        >
          {isSubmitting && (
            <Spinner />
          )}
          {t`subcribeNewsletter`}
        </Button>
      </form>

      {error && (
        <div className="w-full my-4 max-w-4xl">
          <Alert type="danger" title={t`subcribeErrorTitle`} onClose={() => setError(undefined)}>{error}</Alert>
        </div>
      )}
    </>
  )
}

export default NewsletterForm
