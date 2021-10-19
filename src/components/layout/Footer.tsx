import React from "react"
import { Link } from "gatsby"

import classes from "@styles/components/layout/Footer.module.scss"

import SocialMenu from "./SocialMenu"
import useLocale from "@context/locale-context/hooks/useLocale"
import { useTranslations } from "@hooks/useTranslations"

const Footer: React.FC = () => {
  const [locale] = useLocale()
  const { t } = useTranslations(locale, "footer")

  return (
    <footer className={classes.footer}>
      <div className="container">
        <div className={classes.footerContainer}>
          <img src={require("@images/footer-logo.svg").default} alt="Etherna" />

          <SocialMenu className={classes.footerSocialMenu} />

          <div className={classes.footerNotice}>
            <div className={classes.footerCopyright}>
              {t("copyright", { year: `${new Date().getFullYear()}` })}
            </div>
            <nav className={classes.footerMenu}>
              <Link to={"/brand-kit"}>{t`brandKit`}</Link>
              <Link to="/privacy">{t`privacyPolicy`}</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
