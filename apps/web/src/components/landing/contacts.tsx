import { useTranslation } from "react-i18next"

import { SectionTitle } from "./section-title"
import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Row } from "@/components/common/row"
import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

export function Contacts() {
  const { t } = useTranslation("contacts")

  const mailto = (subject: string) => {
    const subjectQuery = subject ? `?subject=${subject}` : ""
    return `mailto:info@etherna.io${subjectQuery}`
  }

  return (
    <section className="py-16" id="contacts">
      <Container>
        <Row>
          <Col>
            <SectionTitle
              className="mb-4 w-full text-center text-4xl"
              title={t("helpUsTitle")}
              anchorLink="contacts"
            />
            <p className="mx-auto max-w-2xl pb-6 text-center text-gray-600">
              {t("helpUsDescription")}
            </p>
            <Row className="">
              <Col className={cn("flex flex-col items-center py-6", "md:w-1/2")}>
                <h3 className="text-gray-700">{t("forInvestors")}</h3>
                <div className="text-center text-gray-600">
                  <p>{t("forInvestorsDescription")}</p>
                  <p>{t("forInvestorsCTADescription")}</p>
                </div>
                <ContactsBtn href={mailto(t("investorMailSubject"))}>
                  {t("forInvestorsCTALabel")}
                </ContactsBtn>
              </Col>
              <Col
                className={cn(
                  "flex flex-col items-center py-6",
                  "border-t border-gray-300 md:border-l md:border-t-0",
                  "md:w-1/2"
                )}
              >
                <h3 className="text-gray-700">{t("forDevelopers")}</h3>
                <div className="text-center text-gray-600">
                  <p>{t("forDevelopersDescription")}</p>
                  <p>{t("forDevelopersCTADescription")}</p>
                </div>
                <ContactsBtn href={mailto(t("developerMailSubject"))}>
                  {t("forDevelopersCTALabel")}
                </ContactsBtn>
              </Col>
              <Col className="mt-12">
                <div
                  className="text-center text-gray-600"
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

function ContactsBtn({ children, href }: PropsWithChildren<{ href: string }>) {
  return (
    <a
      href={href}
      className={cn(
        "mt-6 min-w-xxs whitespace-nowrap rounded-md border-0 px-6 py-2 shadow-none outline-none",
        "bg-blue-600 text-center text-sm font-semibold text-white hover:bg-blue-400 hover:text-white",
        "transition-colors duration-300"
      )}
    >
      {children}
    </a>
  )
}
