import classes from "@/styles/components/landing/LandingSection.module.scss"

import LandingSectionFeature from "./LandingSectionFeature"
import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"

type LandingSectionProps = {
  id: string
  title: string
  description: string
  features: Array<{
    title: string
    description: string
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  }>
}

const LandingSection: React.FC<LandingSectionProps> = ({ id, title, description, features }) => {
  return (
    <section id={id} className={classes.landingSection}>
      <Container>
        <Row>
          <Col>
            <SectionTitle
              className={classNames(classes.landingTitle)}
              title={title}
              anchorLink={id}
            />
            <p className={classNames(classes.landingDescription)}>{description}</p>
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
