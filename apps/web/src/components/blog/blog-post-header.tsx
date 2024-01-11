import { useTranslation } from "react-i18next"

import { CategoryBadge } from "./category-badge"
import { Avatar } from "@/components/common/Avatar"
import { Breadcrumb } from "@/components/common/Breadcrumb"
import { Col } from "@/components/common/Col"
import { Container } from "@/components/common/Container"
import { Image } from "@/components/common/Image"
import { Row } from "@/components/common/Row"
import { cn } from "@/utils/classnames"
import dayjs from "@/utils/dayjs"
import routes from "@/utils/routes"

import type { AstroImg, Category, User } from "@/schema/app"
import type { Lang } from "@/utils/lang"

interface BlogPostHeaderProps {
  author: User
  postTitle: string
  image: AstroImg | null
  published: string
  updated: string | null
  category: Category | null
  lang: Lang
}

export function BlogPostHeader({
  author,
  postTitle,
  image,
  published,
  updated,
  category,
  lang,
}: BlogPostHeaderProps) {
  const { t } = useTranslation("blog")

  const publishedDate = dayjs(published).locale(lang)
  const updatedDate = updated ? dayjs(updated).locale(lang) : null

  return (
    <header
      className={cn("relative -mt-16 flex flex-wrap justify-end", {
        "min-h-[32rem] md:min-h-[36rem]": Boolean(image),
      })}
    >
      {image && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            className="absolute inset-0 overflow-hidden bg-cover bg-center bg-no-repeat opacity-25 blur-lg"
            data={image}
          />
        </div>
      )}

      <div className="mx-auto mt-20 w-full">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item path={routes.homePath(lang)} title="Etherna" />
                <Breadcrumb.Item path={routes.blogPath(lang)} title="Blog" />
                {category && (
                  <Breadcrumb.Item
                    path={routes.blogCategoryPath(category.slug, lang)}
                    title={category.name}
                  />
                )}
                <Breadcrumb.Item title={postTitle} isLast />
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="mx-auto -mb-16 flex w-full max-w-prose flex-col items-center justify-end text-base lg:text-lg">
        {author.avatar && <Avatar className="h-10 w-10" src={author.avatar} />}
        <h4 className="mb-2 text-base">
          {author.first_name} {author.last_name}
        </h4>

        <div className="mb-2 text-sm font-semibold text-gray-600">
          {publishedDate.format("LL")}

          {updatedDate && (
            <>
              <span> – </span>
              <span className="text-gray-800">
                {t`updated`} {updatedDate.format("LL")}
              </span>
            </>
          )}
        </div>

        {category && <CategoryBadge className="mb-6" category={category} lang={lang} />}

        <div className="flex w-full flex-col">
          {image && <Image className="h-full w-full flex-1" data={image} objectFit="cover" />}
        </div>
      </div>
    </header>
  )
}

export default BlogPostHeader
