import React from "react"

import classes from "@styles/components/layout/StaticPage.module.scss"

import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"

type StaticPageProps = {
  title?: string
}

const StaticPage: React.FC<StaticPageProps> = ({ title, children }) => {
  return (
    <div className={classes.staticPage}>
      <Container>
        <Row>
          {title && (
            <Col>
              <h1>{title}</h1>
            </Col>
          )}
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StaticPage
