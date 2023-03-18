import React, { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import ViewportObserver from "@/components/layout/ViewportObserver"

const PresentationVideo: React.FC = () => {
  const { t } = useTranslation("landing")
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
              <div className="mx-auto flex max-w-2xl flex-col items-center" ref={containerEl}>
                <SectionTitle
                  title={t("watchPresentation")}
                  anchorLink="wam-presentation"
                  className="text-center"
                />
                <iframe
                  src="https://etherna.io/watch/f29a0bca92bae1be59a09d0a228b56374dd33af619ba13be2e901aa9ac6c5764"
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
