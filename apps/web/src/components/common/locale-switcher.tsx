import { ChevronDownIcon } from "lucide-react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LocaleFlag } from "./locale-flag"
import { t } from "@/i18n"
import { langsDictionary } from "@/i18n/dictionaries/langs"
import { LOCALES } from "@/lang/consts"
import { localized } from "@/lang/utils"
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
      <DropdownMenuContent>
        {LOCALES.map((loc) => (
          <DropdownMenuItem key={loc} className="space-x-2" asChild>
            <a
              href={localized(
                localizedPaths.find((path) => path.locale === loc)?.path ?? route("/"),
                loc,
              )}
            >
              <LocaleFlag
                locale={loc}
                className={cn("size-6 overflow-hidden rounded-full", {
                  "opacity-40 saturate-[50%]":
                    loc !== locale && !localizedPaths.some((path) => path.locale === loc),
                })}
              />
              <span
                className={cn({
                  "text-sky-600": loc === locale,
                })}
              >
                {t(langsDictionary[loc], { locale: loc })}
              </span>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
