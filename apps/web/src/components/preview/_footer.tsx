import { use } from "react"

import { Footer as LayoutFooter } from "@/components/layout/footer"
import { Locale, LocalizedPath } from "@/i18n/types"
import { fetchFooter } from "@/queries/fetch-footer"

import type { Footer } from "@payload-types"

interface FooterProps {
  locale: Locale
  localizedPaths: LocalizedPath[]
  fetchFooterPromise: ReturnType<typeof fetchFooter>
}

export function Footer({ locale, localizedPaths, fetchFooterPromise }: FooterProps) {
  const { footer, company } = use(fetchFooterPromise)

  return (
    <LayoutFooter
      locale={locale}
      localizedPaths={localizedPaths}
      groups={footer.groups}
      companyName={company.companyName}
      legalLinks={footer.legalLinks ?? []}
    />
  )
}
