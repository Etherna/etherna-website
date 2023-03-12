import classes from "@/styles/components/landing/SectionTitle.module.scss"

import classNames from "@/utils/classnames"

type SectionTitleProps = {
  title: string
  className?: string
  anchorLink?: string
  elRef?: React.LegacyRef<HTMLHeadingElement>
}

const SectionTitle: React.FC<SectionTitleProps> = ({ className, title, anchorLink, elRef }) => {
  return (
    <h2 className={classNames(classes.sectionTitle, className)} ref={elRef}>
      {anchorLink ? (
        <a
          className="text-gray-800 hover:text-gray-800 hover:opacity-80"
          href={anchorLink.replace(/^#?/, "#")}
        >
          {title}
        </a>
      ) : (
        title
      )}
    </h2>
  )
}

export default SectionTitle
