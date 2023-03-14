import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/Awards.module.scss"

import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"

import type { Award } from "@/utils/schemas"

type AwardsProps = {
  awards: Award[]
}

const Awards: React.FC<AwardsProps> = ({ awards }) => {
  const { t } = useTranslation("awards")

  return (
    <section className={classes.awards} id="awards">
      <Container>
        <Row>
          <Col>
            <SectionTitle
              title={t("awards")}
              className={classNames(classes.awardsTitle)}
              anchorLink="awards"
            />

            <ul className={classNames(classes.awardsList)}>
              {awards.map((award, i) => (
                <li className={classes.awardsItem} key={i}>
                  <div
                    className={classes.awardsItemImage}
                    style={{ backgroundImage: `url(${award.image.src})` }}
                  />
                  <h3 className={classes.awardsTitle}>{t(award.title as any)}</h3>
                  <p className={classes.awardsItemDescription}>{t(award.description as any)}</p>
                  {award.link && (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.awardsItemLink}
                    >
                      {t("moreInfo")}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Awards
