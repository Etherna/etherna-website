import Dropdown from "@/components/common/Dropdown"
import Image from "@/components/common/Image"
import classNames from "@/utils/classnames"

import type { AstroImg } from "@/schema/app"
import type { Lang, LocalizedPaths } from "@/utils/lang"

type LangSwitcherProps = {
  toggleClassName?: string
  lang: string
  locales: { code: string; name: string; flag: AstroImg }[]
  localizedPaths?: LocalizedPaths
}

const LangSwitcher: React.FC<LangSwitcherProps> = ({
  toggleClassName,
  lang,
  locales,
  localizedPaths,
}) => {
  const currentLocaleFlag = locales.find(({ code }) => code === lang)?.flag
  return (
    <Dropdown
      toggleClass={classNames(
        "border-4 border-transparent rounded-full transition duration-500",
        "hover:bg-gray-400 focus:outline-0",
        toggleClassName
      )}
      toggleChildren={<LangFlag flag={currentLocaleFlag!} />}
    >
      <nav className="mt-2 flex-col rounded border-gray-300 bg-white py-1 shadow">
        {locales.map(({ code, name, flag }) => {
          const url = localizedPaths?.[code as Lang]
          return (
            <a
              href={url}
              className={classNames(
                "m-1 flex cursor-pointer rounded-sm px-5 py-2",
                "text-sm font-semibold text-gray-600 hover:bg-gray-200 hover:text-gray-800",
                {
                  "border-blue-400 text-gray-800": code === lang,
                  "pointer-events-none cursor-default opacity-40": !url,
                }
              )}
              aria-label={`Switch to ${name}`}
              key={code}
            >
              <LangFlag
                flag={flag}
                className={classNames("mr-3 opacity-40", {
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

const LangFlag: React.FC<{ flag: AstroImg; name?: string; className?: string }> = ({
  flag,
  className,
  name,
}) => {
  return (
    <div
      className={classNames(
        "block h-5 w-5 overflow-hidden rounded-full border border-gray-200",
        className
      )}
    >
      <Image data={flag} className="h-full w-full" alt={name} />
    </div>
  )
}

export default LangSwitcher
