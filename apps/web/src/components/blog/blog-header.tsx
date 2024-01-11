import { ReactComponent as HeaderPattern } from "@/assets/header-pattern.svg"

import { Col } from "@/components/common/Col"
import { Container } from "@/components/common/Container"
import { Row } from "@/components/common/Row"
import { cn } from "@/utils/classnames"
import routes from "@/utils/routes"

import type { Category } from "@/schema/app"
import type { Lang } from "@/utils/lang"

interface BlogHeaderProps {
  title: string
  categories: Category[]
  currentCategory?: Category
  lang: Lang
}

export function BlogHeader({ title, categories, currentCategory, lang }: BlogHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden bg-white py-10")}>
      <HeaderPattern
        className={cn(
          "absolute block h-28 w-56 opacity-25",
          "left-0 top-0 -ml-12 mt-3 bg-left-top"
        )}
      />
      <Container>
        <Row>
          <Col>
            <a className="text-current hover:text-current" href={routes.blogPath(lang)}>
              <h1 className="text-4xl">{title}</h1>
            </a>

            {categories.length > 0 && (
              <ul className="flex space-x-3 overflow-x-auto py-4">
                {categories.map(category => (
                  <li key={category.slug}>
                    <a
                      className={cn(
                        "rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600",
                        "transition-colors duration-500 hover:bg-gray-600 hover:bg-opacity-5",
                        {
                          "border-2 border-primary-500 bg-primary-500 bg-opacity-5 text-primary-500":
                            category.slug === currentCategory?.slug,
                        }
                      )}
                      href={routes.blogCategoryPath(category.slug, lang)}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
      <HeaderPattern
        className={cn(
          "absolute block h-28 w-56 opacity-25",
          "bottom-0 right-0 -mr-12 rotate-180 transform bg-left-bottom opacity-50"
        )}
      />
    </header>
  )
}
