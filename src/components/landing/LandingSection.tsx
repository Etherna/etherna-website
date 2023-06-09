import LandingSectionFeature from "./LandingSectionFeature"
import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"

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
              <LandingSectionFeature feature={feature} count={features.length} key={i} />
            ))}
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default LandingSection
