import { ReactComponent as HeaderPattern } from "@/assets/header-pattern.svg"

import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"
import routes from "@/utils/routes"

import type { Category } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type BlogHeaderProps = {
  title: string
  categories: Category[]
  currentCategory?: Category
  lang: Lang
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ title, categories, currentCategory, lang }) => {
  return (
    <header className={classNames("relative overflow-hidden bg-white py-10")}>
      <HeaderPattern
        className={classNames(
          "absolute block h-28 w-56 opacity-25",
          "left-0 top-0 -ml-12 mt-3 bg-left-top"
        )}
      />
      <Container>
        <Row>
          <Col>
            <a href={routes.blogPath(lang)} className="text-current hover:text-current">
              <h1 className="text-4xl">{title}</h1>
            </a>

            {categories.length > 0 && (
              <ul className="flex space-x-3 overflow-x-auto py-4">
                {categories.map((category, i) => (
                  <li className="" key={i}>
                    <a
                      href={routes.blogCategoryPath(category.slug, lang)}
                      className={classNames(
                        "rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600",
                        "transition-colors duration-500 hover:bg-gray-600 hover:bg-opacity-5",
                        {
                          "border-2 border-primary-500 bg-primary-500 bg-opacity-5 text-primary-500":
                            category.slug === currentCategory?.slug,
                        }
                      )}
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
        className={classNames(
          "absolute block h-28 w-56 opacity-25",
          "bottom-0 right-0 -mr-12 rotate-180 transform bg-left-bottom opacity-50"
        )}
      />
    </header>
  )
}

export default BlogHeader
