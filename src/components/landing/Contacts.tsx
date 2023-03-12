import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/Contacts.module.scss"

import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"

const Contacts = () => {
  const { t } = useTranslation("contacts")

  const mailto = (subject: string) => {
    const subjectQuery = subject ? `?subject=${subject}` : ""
    return `mailto:info@etherna.io${subjectQuery}`
  }

  return (
    <section className={classes.contacts} id="contacts">
      <Container>
        <Row>
          <Col>
            <SectionTitle
              className={classNames(classes.contactsTitle)}
              title={t("helpUsTitle")}
              anchorLink="contacts"
            />
            <p className={classNames(classes.contactsDescription)}>{t("helpUsDescription")}</p>
            <Row className="">
              <Col className={classNames(classes.contactsCol, "md:w-1/2")}>
                <h3 className={classes.contactsSubtitle}>{t("forInvestors")}</h3>
                <div className={classes.contactsText}>
                  <p>{t("forInvestorsDescription")}</p>
                  <p>{t("forInvestorsCTADescription")}</p>
                </div>
                <a className={classes.contactsBtn} href={mailto(t("investorMailSubject"))}>
                  {t("forInvestorsCTALabel")}
                </a>
              </Col>
              <Col className={classNames(classes.contactsCol, "md:w-1/2")}>
                <h3 className={classes.contactsSubtitle}>{t("forDevelopers")}</h3>
                <div className={classes.contactsText}>
                  <p>{t("forDevelopersDescription")}</p>
                  <p>{t("forDevelopersCTADescription")}</p>
                </div>
                <a className={classes.contactsBtn} href={mailto(t("developerMailSubject"))}>
                  {t("forDevelopersCTALabel")}
                </a>
              </Col>
              <Col className="mt-12">
                <div
                  className={classes.contactsText}
                  dangerouslySetInnerHTML={{ __html: t("informationText") }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contacts
