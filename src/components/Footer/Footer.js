import React from "react"
import { Link } from "gatsby"

import SocialMenu from "@components/SocialMenu"
import { useLocale } from "@utils/localizedPage"
import { useTranslations } from "@utils/useTranslations"

import "./footer.scss"

const Footer = () => {
  const [locale] = useLocale()
  const trans = useTranslations(locale, "footer")

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <img src={require("@images/logo-footer.svg")} alt="Etherna" />

          <SocialMenu />

          <div className="footer-notice">
            <div className="copyright">
              {trans("copyright", { year: new Date().getFullYear() })}
            </div>
            <nav className="footer-menu">
              <Link to="privacy">{trans("privacyPolicy")}</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
