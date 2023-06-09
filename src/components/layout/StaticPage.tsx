import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"

import type { PropsWithChildren } from "react"

type StaticPageProps = PropsWithChildren<{
  title?: string
}>

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
  return (
    <div className="pb-20 pt-10 md:pb-40 md:pt-20">
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
