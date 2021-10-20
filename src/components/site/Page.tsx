import React, { useEffect } from "react"

import classes from "@styles/components/site/Page.module.scss"

import PageCTA from "./PageCTA"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import Markdown from "@components/common/Markdown"
import Prose from "@components/common/Prose"
import useLocale from "@context/locale-context/hooks/useLocale"
import { Page as PageModel } from "@definitions/app"
import routes from "@utils/routes"

type PageProps = {
  page: PageModel
}

const Page: React.FC<PageProps> = ({ page }) => {
  const [, { setLocalePath }] = useLocale()

  useEffect(() => {
    setLocalePaths()
    return () => clearLocalePaths()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocalePaths = () => {
    page.allSlugs.forEach(info => {
      setLocalePath(info.locale, routes.pagePath(info.slug, info.locale))
    })
  }

  const clearLocalePaths = () => {
    page.allSlugs.forEach(info => {
      setLocalePath(info.locale, undefined)
    })
  }

  return (
    <Container fluid>
      <Row className={classes.pageHeaderRow}>
        <Col>
          <Container>
            <Row>
              <Col>
                <header className={classes.pageHeader}>
                  <h1 className={classes.pageHeaderTitle}>{page.title}</h1>
                  <p className={classes.pageHeaderExcerpt}>{page.excerpt}</p>
                </header>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Row>
        <Col>
          <Prose className="post-page">
            <article>
              <Markdown rawMarkdown={page.content} />
            </article>
          </Prose>
        </Col>
      </Row>

      <Row>
        <Col>
          <PageCTA />
        </Col>
      </Row>
    </Container>
  )
}

export default Page
