import { Dropdown } from "@/components/common/dropdown"
import { Image } from "@/components/common/image"
import { cn } from "@/utils/classnames"

import type { AstroImg } from "@/schema/app"
import type { Lang, LocalizedPaths } from "@/utils/lang"

interface LangSwitcherProps {
  toggleClassName?: string
  lang: string
  locales: { code: string; name: string; flag: AstroImg }[]
  localizedPaths?: LocalizedPaths
}

export function LangSwitcher({
  toggleClassName,
  lang,
  locales,
  localizedPaths,
}: LangSwitcherProps) {
  const currentLocaleFlag = locales.find(({ code }) => code === lang)?.flag
  return (
    <Dropdown
      toggleClass={cn(
        "border-4 border-transparent rounded-full transition duration-500",
        "hover:bg-gray-400 focus:outline-0",
        toggleClassName
      )}
      toggleChildren={currentLocaleFlag && <LangFlag flag={currentLocaleFlag} />}
    >
      <nav className="mt-2 flex-col rounded border-gray-300 bg-white py-1 shadow">
        {locales.map(({ code, name, flag }) => {
          const url = localizedPaths?.[code as Lang]
          return (
            <a
              key={code}
              href={url}
              className={cn(
                "m-1 flex cursor-pointer rounded-sm px-5 py-2",
                "text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                {
                  "border-blue-400 text-gray-800": code === lang,
                  "pointer-events-none cursor-default opacity-40": !url,
                }
              )}
              aria-label={`Switch to ${name}`}
            >
              <LangFlag
                flag={flag}
                className={cn("mr-3 opacity-40", {
                  "opacity-100": code === lang,
                })}
                name={name}
              />
              <span>{name}</span>
            </a>
          )
        })}
      </nav>
    </Dropdown>
  )
}

function LangFlag({
  flag,
  className,
  name,
}: {
  flag: AstroImg
  name?: string
  className?: string
}) {
  return (
    <div
      className={cn("block h-5 w-5 overflow-hidden rounded-full border border-gray-200", className)}
    >
      <Image data={flag} className="h-full w-full" alt={name} />
    </div>
  )
}
