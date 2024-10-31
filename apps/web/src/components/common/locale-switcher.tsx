import { CheckCircleIcon, ChevronDownIcon, CircleCheckIcon, CircleIcon } from "lucide-react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LocaleFlag } from "./locale-flag"
import { t } from "@/i18n"
import { LOCALES } from "@/i18n/consts"
import { langsDictionary } from "@/i18n/dictionaries/langs"
import { localized } from "@/i18n/utils"
import { route } from "@/lib/routes"
import { cn } from "@/lib/utils"

import type { Locale, LocalizedPath } from "@/i18n/types"

interface LocaleSwitcherProps {
  variant?: "default" | "compact"
  locale: Locale
  localizedPaths: LocalizedPath[]
}

export function LocaleSwitcher({
  variant = "default",
  locale,
  localizedPaths,
}: LocaleSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("h-6 p-0 text-muted-foreground", {
            "w-6": variant === "compact",
          })}
          variant={"ghost"}
        >
          <LocaleFlag locale={locale} className="size-6 overflow-hidden rounded-full" />
          {variant === "default" && (
            <span className="ml-2">{t(langsDictionary[locale], { locale })}</span>
          )}
          {variant === "default" && <ChevronDownIcon className="ml-2 size-4 opacity-50" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((loc) => {
          const isCurrentLocale = loc === locale
          const avaiableLangSwitch = localizedPaths.find((path) => path.locale === loc)
          const isLangSwitchAvailable = !!avaiableLangSwitch

          return (
            <DropdownMenuItem key={loc} className="space-x-2" asChild>
              <a href={localized(avaiableLangSwitch?.path ?? route("/"), loc)}>
                {isCurrentLocale ? (
                  <CircleCheckIcon className="size-4 text-primary" />
                ) : isLangSwitchAvailable ? (
                  <CircleCheckIcon className="size-4 text-border" />
                ) : (
                  <CircleIcon className="size-4 text-border" />
                )}

                <LocaleFlag locale={loc} className="size-6 overflow-hidden rounded-full" />

                <span
                  className={cn({
                    "text-sky-600": isCurrentLocale,
                  })}
                >
                  {t(langsDictionary[loc], { locale: loc })}
                </span>
              </a>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
