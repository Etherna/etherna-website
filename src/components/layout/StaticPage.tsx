import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"

import type { PropsWithChildren } from "react"

type StaticPageProps = PropsWithChildren<{
  title?: string
}>

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
  return (
    <div className="pt-10 pb-20 md:pt-20 md:pb-40">
      <Container>
        <Row>
          {title && (
            <Col>
              <h1>{title}</h1>
            </Col>
          )}
          <Col>{children}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default StaticPage
