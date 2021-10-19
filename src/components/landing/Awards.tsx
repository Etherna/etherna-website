import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/Awards.module.scss"
import swarmGrantImg from "@images/logos/swarm-grants.svg"

import ViewportObserver from "@components/layout/ViewportObserver"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const AwardList = [{
  title: "SwarmGrants",
  description: "SwarmGrantsDesc",
  image: swarmGrantImg,
  link: "https://medium.com/ethereum-swarm/buzz-is-in-the-air-swarm-grants-results-are-in-a030ab9178a9"
}]

const Awards: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "awards")
  const titleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  return (
    <section className={classes.awards}>
      <div className="container">
        <div className="row">
          <div className="col">
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
              <h2 className={classNames(classes.awardsTitle, "fade-in-up", "delay-50")} ref={titleRef}>
                {t`awards`}
              </h2>
            </ViewportObserver>

            <ViewportObserver childrenRef={listRef} viewportClassName="animation-active">
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default Awards
