import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/AlphaPass.module.scss"

import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const AlphaPass: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "landing")
  const contentEl = useRef<HTMLDivElement>(null)

  return (
    <section id="alpha-pass">
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={contentEl} viewportClassName="animation-active" threshold={0.1}>
              <div className={classNames(classes.alphaPass, "fade-in-up", "delay-50")} ref={contentEl}>
                <h2>Request Alpha Pass</h2>
                <p>We are close to launch the first (limited) release of Etherna.</p>
                <br />
                <p>During the first Alpha phase the number of users will be limited.</p>
                <p>Want to partecipate? Click the button below</p>

                <div className="mt-6">
                  <a
                    className={classes.alphaPassLink}
                    href="https://maillist.etherna.io/require-alpha-pass"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Request Alpha Pass
                  </a>
                </div>
              </div>
            </ViewportObserver>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AlphaPass
