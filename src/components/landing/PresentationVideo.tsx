import React, { useEffect, useMemo, useRef, useState } from "react"

import classes from "@styles/components/landing/PresentationVideo.module.scss"

import SectionTitle from "./SectionTitle"
import Col from "@components/common/Col"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const PresentationVideo: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "landing")
  const videoRatio = 0.56
  const containerEl = useRef<HTMLIFrameElement>(null)
  const [width, setWidth] = useState(576)

  const height = useMemo(() => {
    return width * videoRatio
  }, [width])

  useEffect(() => {
    const onResize = () => {
      setWidth(containerEl.current?.clientWidth ?? 576)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(document.documentElement)
    return () => {
      resizeObserver.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadFrameSize = () => {
    setWidth(containerEl.current?.clientWidth ?? 576)
  }

  return (
    <section id="wam-presentation">
      <Container>
        <Row>
          <Col>
            <ViewportObserver
              childrenRef={containerEl}
              viewportClassName="animation-active"
              threshold={0.1}
              onEnterViewport={loadFrameSize}
            >
              <div className={classes.presentationVideo} ref={containerEl}>
                <SectionTitle
                  title={t`watchPresentation`}
                  anchorLink="wam-presentation"
                />
                <iframe
                  src="https://app.etherna.io/embed/6229f4e50a7a47231a0ec7af"
                  width="100%"
                  height={height}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </ViewportObserver>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default PresentationVideo
