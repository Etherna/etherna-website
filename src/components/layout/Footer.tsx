import React from "react"

import classes from "@styles/components/layout/Footer.module.scss"
import { ReactComponent as FooterLogo } from "@images/logo-footer.svg"

import SocialMenu from "./SocialMenu"
import Container from "@components/common/Container"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import FooterColumn from "./FooterColumn"
import classNames from "@utils/classnames"
import routes from "@utils/routes"
import { graphql, useStaticQuery } from "gatsby"
import { parsePages, parseProjects } from "@utils/dataParser"

const Footer: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "footer")

  const data = useStaticQuery(graphql`
    query {
      pages: allDirectusPage {
        nodes {
          localized_contents {
            title
            slug
            locale
            excerpt
          }
        }
      }
      projects: allDirectusProject(sort: {fields: sort}) {
        nodes {
          coming_soon
          external_link
          image {
            localFile {
              publicURL
            }
          }
          localized_contents {
            title
            slug
            locale
            excerpt
          }
        }
      }
    }
  `)
  const pages = parsePages(data.pages.nodes, locale)
  const prjects = parseProjects(data.projects.nodes, locale)

  return (
    <footer className={classes.footer}>
      <Container>
        <div className={classes.footerContainer}>
          <div className="flex flex-col space-y-4 w-full md:flex-row md:space-y-0">
            <div
              className={classNames(
                "flex flex-col space-y-4",
                "md:flex-row md:space-y-0 md:order-2 md:flex-1 md:justify-end md:space-x-20 xl:space-x-28"
              )}
            >
              <FooterColumn title={t`projects`} className="md:order-2">
                {prjects.map((project, i) => (
                  <FooterColumn.Link href={routes.pagePath(project.slug, locale)} key={i}>
                    {project.title}
                  </FooterColumn.Link>
                ))}
              </FooterColumn>
              <FooterColumn title={t`usefulLinks`} className="md:order-2">
                {pages.map((page, i) => (
                  <FooterColumn.Link href={routes.pagePath(page.slug, locale)} key={i}>
                    {page.title}
                  </FooterColumn.Link>
                ))}
                <FooterColumn.Link href={routes.aboutPath(locale)}>{t`about`}</FooterColumn.Link>
              </FooterColumn>
              <FooterColumn title={t`legal`} className="md:order-2">
                <FooterColumn.Link href={"/brand-kit"}>{t`brandKit`}</FooterColumn.Link>
                <FooterColumn.Link href="/privacy">{t`privacyPolicy`}</FooterColumn.Link>
              </FooterColumn>
            </div>

            <div className="mx-auto pt-10 md:order-1 md:pt-2">
              <FooterLogo className="" height={32} />
            </div>
          </div>

          <div className="flex flex-col mt-6 w-full space-y-4 md:flex-row md:items-center md:space-y-0">
            <SocialMenu className="max-w-48 mx-auto md:order-2 md:ml-12" />
            <p className="text-xs text-gray-500 text-center md:text-left md:order-1">
              {t("copyright", { year: `${new Date().getFullYear()}` })}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
