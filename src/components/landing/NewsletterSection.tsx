import { useTranslation } from "react-i18next"

import { ReactComponent as NewsletterImage } from "@/images/newsletter.svg"

import NewsletterForm from "./NewsletterForm"
import SectionTitle from "./SectionTitle"
import Card from "@/components/common/Card"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import SocialMenu from "@/components/layout/SocialMenu"

const NewsletterSection: React.FC = () => {
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
