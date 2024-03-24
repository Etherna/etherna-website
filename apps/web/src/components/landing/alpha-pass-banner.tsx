import { useTranslation } from "react-i18next"

import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Row } from "@/components/common/row"
import { cn } from "@/utils/classnames"

export function AlphaPassBanner() {
  const { t } = useTranslation("landing")

  return (
    <section id="alpha-pass">
      <Container>
        <Row>
          <Col>
            <div
              className={cn(
                "mx-auto my-8 max-w-2xl rounded-lg px-8 py-12 md:my-16",
                "bg-white text-white shadow-xl shadow-indigo-600/20",
                "bg-gradient-to-tr from-indigo-600 to-pink-600"
              )}
            >
              <h2>{t("requestAlphaPass")}</h2>
              <p>{t("weAreLaunching")}</p>
              <br />
              <p>{t("firstReleaseLimited")}</p>
              <p>{t("wantToParticipate")}</p>

              <div className="mt-6">
                <a
                  className={cn(
                    "inline-flex items-center rounded border border-white bg-transparent px-3 py-2 hover:bg-white",
                    "font-semibold text-white hover:text-indigo-600",
                    "transition-colors duration-300 ease-out"
                  )}
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
