import React from "react"
import { Link } from "gatsby"

import Container from "@components/common/Container"
import HeadMeta from "@components/layout/HeadMeta"
import { userLocale } from "@utils/lang"
import routes from "@utils/routes"
import Row from "@components/common/Row"
import Col from "@components/common/Col"

const NotFoundPage = () => {
  const locale = userLocale()

  return (
    <>
      <HeadMeta title="404: Not found" />

      <div className="bg-gray-200 h-screen">
        <Container className="py-8 text-gray-700">
          <Row>
            <Col>
              <Link
                to={routes.homePath(locale)}
              >
                ← Back to Etherna
              </Link>
            </Col>
          </Row>
          <Row className="text-center py-24">
            <Col className="max-w-xl mx-auto">
              <h2 style={{ fontSize: `8rem` }}>404</h2>
              <h1 className="text-gray-700">NOT FOUND</h1>
              <p className="text-gray-500">You just hit a route that doesn&#39;t exist... the sadness.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default NotFoundPage
