import { useTranslation } from "react-i18next"

import { CategoryBadge } from "./category-badge"
import { Avatar } from "@/components/common/avatar"
import { Breadcrumb, BreadcrumbItem } from "@/components/common/breadcrumb"
import { Col } from "@/components/common/col"
import { Container } from "@/components/common/container"
import { Image } from "@/components/common/image"
import { Row } from "@/components/common/row"
import { cn } from "@/utils/classnames"
import { dayjs } from "@/utils/dayjs"
import { routes } from "@/utils/routes"

import type { ParsedPostAuthor, ParsedPostCategory } from "@/queries/fetch-post-data"
import type { AstroImageAsset } from "@/utils/data-parser"
import type { Lang } from "@/utils/lang"

interface BlogPostHeaderProps {
  author: ParsedPostAuthor
  postTitle: string
  image: AstroImageAsset | null
  published: string
  updated: string | null
  category: ParsedPostCategory | null
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
                <BreadcrumbItem href={routes.homePath(lang)} title="Etherna" />
                <BreadcrumbItem href={routes.blogPath(lang)} title="Blog" />
                {category && (
                  <BreadcrumbItem
                    href={routes.blogCategoryPath(category.slug, lang)}
                    title={category.name}
                  />
                )}
                <BreadcrumbItem title={postTitle} isLast />
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="mx-auto -mb-12 mt-12 flex w-full max-w-prose flex-col items-center justify-end text-base lg:text-lg">
        {author.avatar && <Avatar className="h-10 w-10" src={author.avatar} />}
        <h4 className="mb-2 text-base">
          {author.firstName} {author.lastName}
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
