import React, { useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import classNames from "classnames"

import classes from "@styles/components/landing/Roadmap.module.scss"

import RoadmapCarousel from "./RoadmapCarousel"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { MilestoneNode } from "@definitions/sources"
import { parseMilestones } from "@utils/dataParser"

type RoadmapStaticQuery = {
  milestones: {
    nodes: MilestoneNode[]
  }
}

const Roadmap: React.FC = () => {
  const data = useStaticQuery<RoadmapStaticQuery>(graphql`
    query {
      milestones: allDirectusMilestone {
        nodes {
          localized_contents {
            title
            subtitle
            description
            locale
          }
          image {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 400
                  placeholder: BLURRED
                  formats: [AUTO, WEBP]
                  layout: CONSTRAINED
                )
              }
            }
          }
          completion
          completion_quarter
          latitude
          longitude
        }
      }
    }
  `)
  const [locale] = useLocale()
  const milestones = parseMilestones(data.milestones.nodes, locale)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [selectedMilestone, setSelectedMilestone] = useState()
  const [hidingMilestone, setHidingMilestone] = useState(false)

  return (
    <section className={classes.roadmap}>
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
              <h2 className={classNames(classes.roadmapTitle, "fade-in-up", "delay-50")} ref={titleRef}>
                Roadmap
              </h2>
            </ViewportObserver>

            <RoadmapCarousel milestones={milestones} />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Roadmap
