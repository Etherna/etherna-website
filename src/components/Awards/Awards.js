import React, { useRef } from "react"

import "./awards.scss"

import ViewportObserver from "@components/ViewportObserver"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

const AwardList = [{
  title: "SwarmGrants",
  description: "SwarmGrantsDesc",
  image: require("@images/logos/swarm-grants.svg"),
  link: "https://medium.com/ethereum-swarm/buzz-is-in-the-air-swarm-grants-results-are-in-a030ab9178a9"
}]

const Awards = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "awards")
  const titleRef = useRef()
  const listRef = useRef()

  return (
    <section className="awards">
      <div className="container">
        <div className="row">
          <div className="col">
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
              <h2 className="awards-title fade-in-up delay-50" ref={titleRef}>
                {trans("awards")}
              </h2>
            </ViewportObserver>

            <ViewportObserver childrenRef={listRef} viewportClassName="animation-active">
              <ul className="awards-list fade-in-up delay-200" ref={listRef}>
                {AwardList.map((award, i) => (
                  <li className="awards-item" key={i}>
                    <div className="awards-item-image" style={{ backgroundImage: `url(${award.image})` }} />
                    <h3 className="awards-item-title">{trans(award.title)}</h3>
                    <p className="awards-item-description">{trans(award.description)}</p>
                    {award.link && (
                      <a href={award.link} target="_blank" rel="noopener noreferrer" className="awards-item-link">
                        {trans("moreInfo")}
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
