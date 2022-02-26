import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/Contacts.module.scss"

import Container from "@components/common/Container"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import Row from "@components/common/Row"
import Col from "@components/common/Col"

const Contacts = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "contacts")
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const mailto = (subject: string) => {
    const subjectQuery = subject ? `?subject=${subject}` : ""
    return `mailto:info@etherna.io${subjectQuery}`
  }

  return (
    <section className={classes.contacts} id="contacts">
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active" threshold={0.1}>
              <h2 className={classNames(classes.contactsTitle, "fade-in-up", "delay-50")} ref={titleRef}>
                {t`helpUsTitle`}
              </h2>
            </ViewportObserver>
            <ViewportObserver childrenRef={descriptionRef} viewportClassName="animation-active" threshold={0.1}>
              <p className={classNames(classes.contactsDescription, "fade-in-up", "delay-100")} ref={descriptionRef}>
                {t`helpUsDescription`}
              </p>
            </ViewportObserver>

            <ViewportObserver childrenRef={contentRef} viewportClassName="animation-active" threshold={0.1}>
              <Row className="fade-in-up delay-150" elRef={contentRef}>
                <Col className={classNames(classes.contactsCol, "md:w-1/2")}>
                  <h3 className={classes.contactsSubtitle}>{t`forInvestors`}</h3>
                  <div className={classes.contactsText}>
                    <p>{t`forInvestorsDescription`}</p>
                    <p>{t`forInvestorsCTADescription`}</p>
                  </div>
                  <a className={classes.contactsBtn} href={mailto(t`investorMailSubject`)}>
                    {t`forInvestorsCTALabel`}
                  </a>
                </Col>
                <Col className={classNames(classes.contactsCol, "md:w-1/2")}>
                  <h3 className={classes.contactsSubtitle}>{t`forDevelopers`}</h3>
                  <div className={classes.contactsText}>
                    <p>{t`forDevelopersDescription`}</p>
                    <p>{t`forDevelopersCTADescription`}</p>
                  </div>
                  <a className={classes.contactsBtn} href={mailto(t`developerMailSubject`)}>
                    {t`forDevelopersCTALabel`}
                  </a>
                </Col>
                <Col className="mt-12">
                  <div className={classes.contactsText} dangerouslySetInnerHTML={{ __html: t`informationText` }} />
                </Col>
              </Row>
            </ViewportObserver>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contacts
