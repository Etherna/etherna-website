import { LandingSectionFeature } from "./landing-section-feature"
import { SectionTitle } from "./section-title"
import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Row } from "@/components/common/row"

interface LandingSectionProps {
  id: string
  title: string
  description: string
  features: {
    title: string
    description: string
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  }[]
}

export function LandingSection({ id, title, description, features }: LandingSectionProps) {
  return (
    <section id={id} className="py-24 text-center">
      <Container>
        <Row>
          <Col>
            <SectionTitle
              className="mb-4 break-words text-5xl leading-tight text-gray-800"
              title={title}
              anchorLink={id}
            />
            <p className="mx-auto max-w-2xl pb-6 text-gray-600">{description}</p>
          </Col>
          <div className="flex w-full flex-wrap justify-evenly">
            {features.map((feature, i) => (
              <LandingSectionFeature key={i} feature={feature} count={features.length} />
            ))}
          </div>
        </Row>
      </Container>
    </section>
  )
}
