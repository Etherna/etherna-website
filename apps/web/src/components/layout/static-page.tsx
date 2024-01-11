import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Row } from "@/components/common/row"

import type { PropsWithChildren } from "react"

interface StaticPageProps extends PropsWithChildren {
  title?: string
}

export function StaticPage({ title, children }: StaticPageProps) {
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
