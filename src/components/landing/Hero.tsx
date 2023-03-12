import { useTranslation } from "react-i18next"

import classes from "@/styles/components/landing/Hero.module.scss"

import Button from "@/components/common/Button"
import Container from "@/components/common/Container"
import classNames from "@/utils/classnames"

const Hero: React.FC = () => {
  const { t } = useTranslation("hero")

  return (
    <section className={classes.hero}>
      <Container className="flex flex-col items-center">
        <h1
          className={classNames(classes.heroTitle)}
          dangerouslySetInnerHTML={{ __html: t("heading") }}
        />

        <p
          className={classNames(classes.heroDescription)}
          dangerouslySetInnerHTML={{ __html: t("subheading") }}
        />

        <Button className="mt-8" type="primary" href="https://etherna.io" target="_blank" large>
          {t("visitOurDapp")}
        </Button>
      </Container>
    </section>
  )
}

export default Hero
