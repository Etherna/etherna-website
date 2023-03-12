import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/AlphaPass.module.scss"

import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"

const AlphaPassBanner: React.FC = () => {
  const { t } = useTranslation("landing")

  return (
    <section id="alpha-pass">
      <Container>
        <Row>
          <Col>
            <div className={classNames(classes.alphaPassBanner)}>
              <h2>{t("requestAlphaPass")}</h2>
              <p>{t("weAreLaunching")}</p>
              <br />
              <p>{t("firstReleaseLimited")}</p>
              <p>{t("wantToParticipate")}</p>

              <div className="mt-6">
                <a
                  className={classes.alphaPassLink}
                  href="https://sso.etherna.io/AlphaPass"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("requestAlphaPass")}
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AlphaPassBanner
