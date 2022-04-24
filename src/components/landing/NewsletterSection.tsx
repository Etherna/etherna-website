import React from "react"

import { ReactComponent as NewsletterImage } from "@images/newsletter.svg"

import NewsletterForm from "./NewsletterForm"
import SectionTitle from "./SectionTitle"
import Card from "@components/common/Card"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import SocialMenu from "@components/layout/SocialMenu"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const NewsletterSection: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "landing")

  return (
    <section className="social my-16" id="newsletter">
      <Container>
        <Row>
          <Col>
            <Card className="" size="large">
              <div className="flex flex-col items-center">
                <SectionTitle
                  title={t`contact`}
                  className="text-4xl leading-tight font-extrabold text-gray-700 text-center"
                  anchorLink="newsletter"
                />

                <NewsletterImage width="120" />
                <NewsletterForm />

                <hr className="w-24 my-12" />

                <p className="text-gray-600 mb-4">{t`followUs`}</p>
                <SocialMenu vertical={true} buttonStyle={true} />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default NewsletterSection
