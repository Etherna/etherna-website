import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/AlphaPass.module.scss"

import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import { Link } from "gatsby"
import routes from "@utils/routes"

const AlphaPassBanner: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "landing")
  const contentEl = useRef<HTMLDivElement>(null)

  return (
    <section id="alpha-pass">
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={contentEl} viewportClassName="animation-active" threshold={0.1}>
              <div className={classNames(classes.alphaPassBanner, "fade-in-up", "delay-50")} ref={contentEl}>
                <h2>{t`requestAlphaPass`}</h2>
                <p>{t`weAreLaunching`}</p>
                <br />
                <p>{t`firstReleaseLimited`}</p>
                <p>{t`wantToParticipate`}</p>

                <div className="mt-6">
                  <Link className={classes.alphaPassLink} to={routes.alphaPassPath()}>
                    {t`requestAlphaPass`}
                  </Link>
                </div>
              </div>
            </ViewportObserver>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AlphaPassBanner
