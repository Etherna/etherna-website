import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/LandingSection.module.scss"

import LandingSectionFeature from "./LandingSectionFeature"
import Container from "@components/common/Container"
import ViewportObserver from "@components/layout/ViewportObserver"
import Row from "@components/common/Row"
import Col from "@components/common/Col"

type LandingSectionProps = {
  id: string
  title: string
  description: string
  features: Array<{
    title: string
    description: string
    icon?: string
  }>
}

const LandingSection: React.FC<LandingSectionProps> = ({
  id,
  title,
  description,
  features
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  return (
    <section id={id} className={classes.landingSection}>
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active" offset={50}>
              <h2 className={classNames(classes.landingTitle, "fade-in-up", "delay-50")} ref={titleRef}>
                {title}
              </h2>
            </ViewportObserver>
            <ViewportObserver childrenRef={descriptionRef} viewportClassName="animation-active" offset={50}>
              <p className={classNames(classes.landingDescription, "fade-in-up", "delay-100")} ref={descriptionRef}>
                {description}
              </p>
            </ViewportObserver>
          </Col>
          {features.map((feature, i) => (
            <LandingSectionFeature feature={feature} count={features.length} key={i} />
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default LandingSection
