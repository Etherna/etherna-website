import classes from "@/styles/components/layout/LangSwitcher.module.scss"

import Dropdown from "@/components/common/Dropdown"
import classNames from "@/utils/classnames"

import type { LocalizedPaths, Lang } from "@/utils/lang"

type LangSwitcherProps = {
  toggleClassName?: string
  lang: string
  locales: { code: string; name: string; flag: string }[]
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
      toggleClass={classNames(classes.langMenuToggle, toggleClassName)}
      toggleChildren={
        <div className={classes.langImage}>{<img src={currentLocaleFlag} alt="" />}</div>
      }
    >
      <nav className={classes.langSwitcherMenu}>
        {locales.map(({ code, name, flag }) => {
          const url = localizedPaths?.[code as Lang]
          return (
            <a
              href={url}
              className={classNames(classes.langSwitcherMenuItem, {
                // [classes.active]: code === locale,
                "pointer-events-none cursor-default opacity-40": !url,
              })}
              aria-label={`Switch to ${name}`}
              key={code}
            >
              <div className={classes.langImage}>
                <img src={flag} alt={name} />
              </div>
              <span>{name}</span>
            </a>
          )
        })}
      </nav>
    </Dropdown>
  )
}

export default LangSwitcher
