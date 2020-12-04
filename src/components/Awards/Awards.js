import React from "react"

import "./awards.scss"

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

  return (
    <section className="awards">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="awards-title">{trans("awards")}</h2>

            <ul className="awards-list">
              {AwardList.map((award, i) => (
                <li className="awards-item" key={i}>
                  <div className="awards-item-image" style={{ backgroundImage: `url(${award.image})` }} />
                  <h3 className="awards-item-title">{trans(award.title)}</h3>
                  <p className="awards-item-description">{trans(award.description)}</p>
                  {award.link && (
                    <a href={award.link} target="_blank" rel="noopener noreferrer" className="awards-item-link">{trans("moreInfo")}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Awards
