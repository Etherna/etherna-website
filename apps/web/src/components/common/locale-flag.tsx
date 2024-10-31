import { EnFlag, ItFlag } from "@/components/assets/flags"

import type { Locale } from "@/i18n/types"

interface LocaleFlagProps extends React.ComponentProps<"svg"> {
  locale: Locale
}

const LocaleFlagMap = {
  it: ItFlag,
  en: EnFlag,
} as const satisfies Record<Locale, React.FC<React.ComponentProps<"svg">>>

export function LocaleFlag({ className, locale, ...props }: LocaleFlagProps) {
  const Icon = LocaleFlagMap[locale]

  if (!Icon) {
    throw new Error(`Unsupported locale: '${locale}'`)
  }

  return <Icon className={className} {...props} />
}
