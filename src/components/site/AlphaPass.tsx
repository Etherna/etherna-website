import React, { useState } from "react"
import { navigate } from "gatsby"
import axios from "axios"

import classes from "@styles/components/site/AlphaPass.module.scss"
import { ReactComponent as Spinner } from "@images/animated/spinner-light.svg"

import TextField from "@components/common/TextField"
import Button from "@components/common/Button"
import FormGroup from "@components/common/FormGroup"
import Alert from "@components/common/Alert"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { validateEmail } from "@utils/validation"
import routes from "@utils/routes"

const whatChoices = [{
  id: "contentCreator",
  value: "Content creator"
}, {
  id: "contentViewer",
  value: "Content viewer"
}, {
  id: "both",
  value: "Both"
}]

const AlphaPass: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [why, setWhy] = useState("")
  const [what, setWhat] = useState("")
  const [social1, setSocial1] = useState("")
  const [social2, setSocial2] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  const [errorFields, setErrorFields] = useState<Record<string, string>>()

  const sendFormRequest = async () => {
    setIsSubmitting(true)

    try {
      const errorFields: Record<string, string> = {}

      // fields validation
      if (name.length < 2) {
        setIsSubmitting(false)
        errorFields["name"] = t`alphapass.formErrorName`
      }
      if (email.length === 0 || !validateEmail(email)) {
        setIsSubmitting(false)
        errorFields["email"] = t`alphapass.formErrorEmail`
      }
      if (why.length < 5) {
        setIsSubmitting(false)
        errorFields["why"] = t`alphapass.formErrorWhy`
      }
      if (what.length === 0) {
        setIsSubmitting(false)
        errorFields["what"] = t`alphapass.formErrorWhat`
      }

      if (Object.keys(errorFields).length) {
        setErrorFields(errorFields)
        return
      } else {
        setErrorFields(undefined)
      }

      const apiEndpoint = `${process.env.DIRECTUS_URL}/${process.env.DIRECTUS_PROJECT}/custom/alphapass`
      await axios.post(apiEndpoint, {
        email,
        name,
        why,
        what,
        social1,
        social2,
      })

      navigate(routes.alphaPassThankyouPath(), {
        state: { email, name }
      })
    } catch (error) {
      console.error(error)
      setError(t`alphapass.formError`)
      setIsSubmitting(false)
    }
  }

  return (
    <form className={classes.alphaPass}>
      <FormGroup label={t`alphapass.name`}>
        <TextField
          type="text"
          autocomplete="name"
          error={errorFields?.["name"]}
          value={name}
          onChange={setName}
        />
      </FormGroup>

      <FormGroup label={t`alphapass.email`}>
        <TextField
          type="email"
          autocomplete="email"
          error={errorFields?.["email"]}
          value={email}
          onChange={setEmail}
        />
      </FormGroup>

      <FormGroup label={t`alphapass.why`}>
        <TextField
          type="text"
          error={errorFields?.["why"]}
          value={why}
          onChange={setWhy}
        />
      </FormGroup>

      <FormGroup label={t`alphapass.what`} error={errorFields?.["what"]}>
        <div className={classes.alphaPassChoices}>
          {whatChoices.map(choice => (
            <label htmlFor={choice.id} key={choice.id}>
              <TextField
                type="radio"
                id={choice.id}
                value={choice.value}
                checked={what === choice.value}
                onChange={val => setWhat(val)}
              />
              <span>{t(`alphapass.${choice.id}`)}</span>
            </label>
          ))}
        </div>
      </FormGroup>

      <FormGroup label={t`alphapass.social1`}>
        <TextField
          type="text"
          value={social1}
          onChange={setSocial1}
        />
      </FormGroup>

      <FormGroup label={t`alphapass.social2`}>
        <TextField
          type="text"
          value={social2}
          onChange={setSocial2}
        />
      </FormGroup>

      {error && (
        <FormGroup>
          <Alert type="danger" title={t`alphapass.formErrorTitle`} onClose={() => setError(undefined)}>
            {error}
          </Alert>
        </FormGroup>
      )}

      <FormGroup>
        <Button
          type="primary"
          disabled={isSubmitting}
          onClick={sendFormRequest}
          large
        >
          {isSubmitting && (
            <Spinner />
          )}
          {t`alphapass.sendRequest`}
        </Button>
      </FormGroup>
    </form>
  )
}

export default AlphaPass
