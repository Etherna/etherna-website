import { cn } from "@/utils/classnames"

interface SectionTitleProps {
  title: string
  className?: string
  anchorLink?: string
  elRef?: React.LegacyRef<HTMLHeadingElement>
}

export function SectionTitle({ className, title, anchorLink, elRef }: SectionTitleProps) {
  return (
    <h2
      ref={elRef}
      className={cn(
        "group relative inline-flex items-center justify-center text-gray-800 hover:text-gray-800 hover:opacity-80",
        className
      )}
    >
      <span
        className={cn(
          "absolute left-0 block -translate-x-full translate-y-3 pr-2 text-[0.75em] leading-none opacity-0",
          "text-primary-500 hover:text-primary-300 group-hover:translate-y-0 group-hover:opacity-100",
          "transition duration-300 ease-in-out"
        )}
      >
        #
      </span>
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
