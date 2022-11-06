import React, { useRef } from "react"
import classNames from "@utils/classnames"

import classes from "@styles/components/landing/Awards.module.scss"
import swarmGrantImg from "@images/logos/swarm-grants.svg"
import devconArchiveImg from "@images/logos/devcon-archive.svg"

import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"
import Container from "@components/common/Container"
import Row from "@components/common/Row"
import Col from "@components/common/Col"
import SectionTitle from "./SectionTitle"

const AwardList = [{
  title: "SwarmGrants",
  description: "SwarmGrantsDesc",
  image: swarmGrantImg,
  link: "https://medium.com/ethereum-swarm/buzz-is-in-the-air-swarm-grants-results-are-in-a030ab9178a9"
}, {
  title: "DevconArchive",
  description: "DevconArchiveDesc",
  image: devconArchiveImg,
  link: "https://medium.com/ethereum-swarm/through-etherna-the-devcon-video-archive-is-now-available-on-the-swarm-network-66d4583df8c0"
}]

const Awards: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "awards")
  const titleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  return (
    <section className={classes.awards} id="awards">
      <Container>
        <Row>
          <Col>
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active" threshold={0.1}>
              <SectionTitle
                title={t`awards`}
                className={classNames(classes.awardsTitle, "fade-in-up", "delay-50")}
                anchorLink="awards"
                elRef={titleRef}
              />
            </ViewportObserver>

            <ViewportObserver childrenRef={listRef} viewportClassName="animation-active" threshold={0.1}>
              <ul className={classNames(classes.awardsList, "fade-in-up", "delay-200")} ref={listRef}>
                {AwardList.map((award, i) => (
                  <li className={classes.awardsItem} key={i}>
                    <div className={classes.awardsItemImage} style={{ backgroundImage: `url(${award.image})` }} />
                    <h3 className={classes.awardsTitle}>{t(award.title)}</h3>
                    <p className={classes.awardsItemDescription}>{t(award.description)}</p>
                    {award.link && (
                      <a href={award.link} target="_blank" rel="noopener noreferrer" className={classes.awardsItemLink}>
                        {t`moreInfo`}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </ViewportObserver>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Awards
