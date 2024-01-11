import { useTranslation } from "react-i18next"

import { ReactComponent as NewsletterImage } from "@/assets/newsletter.svg"

import { NewsletterForm } from "./newsletter-form"
import { SectionTitle } from "./section-title"
import { Card } from "@/components/common/card"
import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Row } from "@/components/common/row"
import { SocialMenu } from "@/components/layout/social-menu"

export function NewsletterSection() {
  const { t } = useTranslation("landing")

  return (
    <section className="social my-16" id="newsletter">
      <Container>
        <Row>
          <Col>
            <Card className="" size="large">
              <div className="flex flex-col items-center">
                <SectionTitle
                  title={t("contact")}
                  className="text-center text-4xl font-extrabold leading-tight text-gray-700"
                  anchorLink="newsletter"
                />

                <NewsletterImage width="120" />
                <NewsletterForm />

                <hr className="my-12 w-24" />

                <p className="mb-4 text-gray-600">{t("followUs")}</p>
                <SocialMenu vertical buttonStyle />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
