import { use } from "react"

import { Header as LayoutHeader } from "@/components/layout/header"

import type { Locale, LocalizedPath } from "@/i18n/types"
import type { fetchHeader } from "@/queries/fetch-header"

interface HeaderProps {
  locale: Locale
  path: string
  localizedPaths: LocalizedPath[]
  fetchHeaderPromise: ReturnType<typeof fetchHeader>
}

export function Header({ locale, path, localizedPaths, fetchHeaderPromise }: HeaderProps) {
  const header = use(fetchHeaderPromise)

  return (
    <LayoutHeader
      locale={locale}
      navItems={header.navItems}
      path={path}
      localizedPaths={localizedPaths}
    />
  )
}
