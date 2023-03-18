import { useTranslation } from "react-i18next"

import { ReactComponent as AwardImg } from "@/assets/award.svg"

import SectionTitle from "./SectionTitle"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"

import type { Award } from "@/schema/app"

type AwardsProps = {
  awards: Award[]
}

const Awards: React.FC<AwardsProps> = ({ awards }) => {
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
              {awards.map((award, i) => (
                <li
                  className={classNames(
                    "group relative w-full max-w-64 rounded-lg p-6 text-center transition-all duration-500",
                    "hover:bg-white hover:shadow-lg"
                  )}
                  key={i}
                >
                  <div
                    className={classNames(
                      "relative w-full animate-uncolor-image bg-contain bg-center bg-no-repeat pb-full group-hover:animate-color-image"
                    )}
                    style={{ backgroundImage: `url(${award.image.src})` }}
                  >
                    <AwardImg className="absolute inset-0" />
                  </div>
                  <h3 className="mb-4 text-center text-4xl">{t(award.title as any)}</h3>
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

export default Awards
