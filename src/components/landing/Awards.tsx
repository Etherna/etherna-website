import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/Awards.module.scss"

import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import devconArchiveImg from "@/images/logos/devcon-archive.svg"
import swarmGrantImg from "@/images/logos/swarm-grants.svg"
import classNames from "@/utils/classnames"

const AwardList = [
  {
    title: "SwarmGrants",
    description: "SwarmGrantsDesc",
    image: swarmGrantImg,
    link: "https://medium.com/ethereum-swarm/buzz-is-in-the-air-swarm-grants-results-are-in-a030ab9178a9",
  },
  {
    title: "DevconArchive",
    description: "DevconArchiveDesc",
    image: devconArchiveImg,
    link: "https://medium.com/ethereum-swarm/through-etherna-the-devcon-video-archive-is-now-available-on-the-swarm-network-66d4583df8c0",
  },
]

const Awards: React.FC = () => {
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
              {AwardList.map((award, i) => (
                <li className={classes.awardsItem} key={i}>
                  <div
                    className={classes.awardsItemImage}
                    style={{ backgroundImage: `url(${award.image})` }}
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
