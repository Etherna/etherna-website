import { useTranslation } from "react-i18next"

import { AwardIcon } from "@/components/assets/landing"

import { SectionTitle } from "./section-title"
import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Row } from "@/components/common/row"
import { cn } from "@/utils/classnames"

import type { ParsedAward } from "@/queries/fetch-home-data"

interface AwardsProps {
  awards: ParsedAward[]
}

export function Awards({ awards }: AwardsProps) {
  const { t } = useTranslation("awards")

  return (
    <section className="py-16" id="awards">
      <Container>
        <Row>
          <Col>
            <SectionTitle
              title={t("awards")}
              className="mb-4 w-full text-center text-4xl"
              anchorLink="awards"
            />

            <ul className="flex flex-col items-center sm:flex-row sm:justify-evenly">
              {awards.map(award => (
                <li
                  key={award.title}
                  className={cn(
                    "group relative w-full max-w-64 rounded-lg p-6 text-center transition-all duration-500",
                    "hover:bg-white hover:shadow-lg"
                  )}
                >
                  <div
                    className={cn(
                      "relative w-full animate-uncolor-image pb-full group-hover:animate-color-image"
                    )}
                  >
                    <award.image className="absolute inset-0" />
                    <AwardIcon className="absolute inset-0" />
                  </div>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */}
                  <h3 className="mb-4 text-center text-4xl">{t(award.title as any)}</h3>
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any */}
                  <p className="text-sm text-gray-800">{t(award.description as any)}</p>
                  {award.link && (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 block text-sm after:absolute after:inset-0"
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
