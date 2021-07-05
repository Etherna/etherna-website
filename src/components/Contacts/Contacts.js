import React, { useRef } from "react"

import "./contacts.scss"

import ViewportObserver from "@components/ViewportObserver"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const Contacts = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "contacts")
  const titleRef = useRef()
  const descriptionRef = useRef()
  const contentRef = useRef()

  const mailto = (subject) => {
    const subjectQuery = subject ? `?subject=${subject}` : ''
    return `mailto:info@etherna.io${subjectQuery}`
  }

  return (
    <section className="contacts">
      <div className="container">
        <div className="row">
          <div className="col">
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
              <h2 className="contacts-title fade-in-up delay-50" ref={titleRef}>
                {trans("helpUsTitle")}
              </h2>
            </ViewportObserver>
            <ViewportObserver childrenRef={descriptionRef} viewportClassName="animation-active">
              <p className="contacts-description fade-in-up delay-100" ref={descriptionRef}>{trans("helpUsDescription")}</p>
            </ViewportObserver>

            <ViewportObserver childrenRef={contentRef} viewportClassName="animation-active">
              <div className="row fade-in-up delay-150" ref={contentRef}>
                <div className="col contacts-col md:w-1/2">
                  <h3 className="contacts-subtitle">{trans("forInvestors")}</h3>
                  <div className="contacts-text">
                    <p>{trans("forInvestorsDescription")}</p>
                    <p>{trans("forInvestorsCTADescription")}</p>
                  </div>
                  <a className="contacts-btn" href={mailto(trans('investorMailSubject'))}>{trans("forInvestorsCTALabel")}</a>
                </div>
                <div className="col contacts-col md:w-1/2">
                  <h3 className="contacts-subtitle">{trans("forDevelopers")}</h3>
                  <div className="contacts-text">
                    <p>{trans("forDevelopersDescription")}</p>
                    <p>{trans("forDevelopersCTADescription")}</p>
                  </div>
                  <a className="contacts-btn" href={mailto(trans('developerMailSubject'))}>{trans("forDevelopersCTALabel")}</a>
                </div>
                <div className="col mt-12">
                  <div className="contacts-text" dangerouslySetInnerHTML={{ __html: trans("informationText") }} />
                </div>
              </div>
            </ViewportObserver>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacts
