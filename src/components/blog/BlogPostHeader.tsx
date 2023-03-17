import { useTranslation } from "react-i18next"

import CategoryBadge from "./CategoryBadge"
import Avatar from "@/components/common/Avatar"
import Breadcrumb from "@/components/common/Breadcrumb"
import Col from "@/components/common/Col"
import Container from "@/components/common/Container"
import Image from "@/components/common/Image"
import Row from "@/components/common/Row"
import classNames from "@/utils/classnames"
import dayjs from "@/utils/dayjs"
import routes from "@/utils/routes"

import type { Category, AstroImg, User } from "@/schema/app"
import type { Lang } from "@/utils/lang"

type BlogPostHeaderProps = {
  author: User
  postTitle: string
  image: AstroImg | null
  published: string
  updated: string | null
  category: Category | null
  lang: Lang
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  author,
  postTitle,
  image,
  published,
  updated,
  category,
  lang,
}) => {
  const { t } = useTranslation("blog")

  const publishedDate = dayjs(published).locale(lang)
  const updatedDate = updated ? dayjs(updated).locale(lang) : null

  return (
    <header
      className={classNames("relative -mt-16 flex flex-wrap justify-end", {
        "min-h-[32rem] md:min-h-[36rem]": image != null,
      })}
    >
      {image && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            data={image}
            className="absolute inset-0 overflow-hidden bg-cover bg-center bg-no-repeat opacity-25 blur-lg"
          />
        </div>
      )}

      <div className="mx-auto mt-20 w-full">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <Breadcrumb.Item title="Etherna" path={routes.homePath(lang)} />
                <Breadcrumb.Item title="Blog" path={routes.blogPath(lang)} />
                {category && (
                  <Breadcrumb.Item
                    title={category.name}
                    path={routes.blogCategoryPath(category.slug, lang)}
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
          {image && <Image data={image} className="h-full w-full flex-1" objectFit="cover" />}
        </div>
      </div>
    </header>
  )
}

export default BlogPostHeader
