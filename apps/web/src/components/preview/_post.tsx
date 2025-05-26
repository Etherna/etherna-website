import { Suspense, use } from "react"

import { ArrowLeftIcon } from "lucide-react"

import {
  PostContent,
  PostDate,
  PostLocaleSwitcher,
  PostMetas,
  PostMinutesRead,
  PostShare,
  PostThumbnail,
  PostTitle,
  Post as PostWrapper,
} from "../blog/post"
import { PostAuthors } from "../blog/post-authors"
import { RichText } from "../common/rich-text"
import { Main } from "../layout/main"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Footer } from "./_footer"
import { Header } from "./_header"
import { t } from "@/i18n"
import { blogDictionary } from "@/i18n/dictionaries/blog"
import { localized } from "@/i18n/utils"
import { stripLexicalTags } from "@/lib/lexical"
import { route } from "@/lib/routes"
import { formatPostDate, getMinutesRead } from "@/lib/string"
import { fetchFooter } from "@/queries/fetch-footer"
import { fetchHeader } from "@/queries/fetch-header"

import type { Locale } from "@/i18n/types"
import type { fetchPost } from "@/queries/fetch-post"
import type { Category, User } from "@payload-types"

interface PostProps {
  path: string
  locale: Locale
  accessToken: string
  fetchPostPromise: ReturnType<typeof fetchPost>
}

export function Post({ path, locale, accessToken, fetchPostPromise }: PostProps) {
  const { post, localizedPaths } = use(fetchPostPromise)

  const mainCategory = post.categories?.[0] as Category | undefined

  return (
    <>
      <Suspense>
        <Header
          locale={locale}
          path={path}
          localizedPaths={localizedPaths}
          fetchHeaderPromise={fetchHeader({
            locale,
            accessToken,
          })}
        />
      </Suspense>
      <Main>
        <PostWrapper>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={localized(route("/blog"), locale)}>
                  <ArrowLeftIcon className="mr-1 inline size-3" />
                  <span>{t(blogDictionary.pageTitle, { locale })}</span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {mainCategory && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="font-semibold text-foreground"
                      href={localized(
                        route("/blog/category/:category", { category: mainCategory.slug ?? "-" }),
                        locale,
                      )}
                    >
                      {mainCategory.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          <PostTitle>{post.title}</PostTitle>

          {post.authors && <PostAuthors className="text-sm" authors={post.authors as User[]} />}

          <PostLocaleSwitcher localizedPaths={localizedPaths} locale={locale} />

          {post.thumbnail && <PostThumbnail image={post.thumbnail.bundled?.image} />}

          <PostMetas>
            <PostMinutesRead>
              {t(blogDictionary.minutesRead, {
                locale,
                params: { minutes: getMinutesRead(stripLexicalTags(post.content)) },
              })}
            </PostMinutesRead>
            <PostDate>{formatPostDate(post, locale)}</PostDate>
          </PostMetas>

          <PostContent>
            <RichText nodes={post.content.root.children} />
          </PostContent>

          <PostShare href={`${import.meta.env.BASE_URL}${path}`} title={post.title} />
        </PostWrapper>
      </Main>
      <Suspense>
        <Footer
          locale={locale}
          localizedPaths={localizedPaths}
          fetchFooterPromise={fetchFooter({
            locale,
            accessToken,
          })}
        />
      </Suspense>
    </>
  )
}
