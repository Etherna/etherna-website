import { useTranslation } from "react-i18next"

import { HeroBg, HeroMask } from "@/components/assets/backgrounds"

import { Button } from "@/components/common/button"
import { Container } from "@/components/common/container"

export function Hero() {
  const { t } = useTranslation("hero")

  return (
    <section className="relative w-full">
      <HeroBg className="absolute -z-[1] h-full w-full" />
      <HeroMask className="absolute top-0 -z-[2] h-[calc(100%+150px)] w-full" />
      <Container className="flex flex-col items-center py-8 lg:py-16">
        <h1
          className="mb-8 mt-12 text-center text-5xl font-black leading-tight lg:mb-12 lg:mt-16 lg:text-6xl"
          dangerouslySetInnerHTML={{ __html: t("heading") }}
        />

        <p
          className="text-center text-lg shadow-white drop-shadow-md"
          dangerouslySetInnerHTML={{ __html: t("subheading") }}
        />

        <Button className="mt-8" type="primary" href="https://etherna.io" target="_blank" large>
          {t("visitOurDapp")}
        </Button>
      </Container>
    </section>
  )
}
