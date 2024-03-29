import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react"

import { cn } from "@/utils/classnames"

import type { PropsWithChildren } from "react"

interface PaginationProps {
  className?: string
  page: number
  pagesCount: number
  linkResolver: (page: number) => string
  onClick?: (page: number, e: React.MouseEvent) => void
}

function Pagination({
  className,
  page: currentPage,
  pagesCount,
  linkResolver,
  onClick,
}: PaginationProps) {
  return (
    <nav className={cn("flex items-center space-x-3 text-gray-600", className)}>
      <PaginationItem
        page={1}
        href={linkResolver(1)}
        disabled={currentPage === 1}
        onClick={e => onClick?.(1, e)}
      >
        <ChevronsLeftIcon size={16} />
      </PaginationItem>

      <ol className="flex items-center space-x-2">
        {Array.from({ length: pagesCount }, (_, i) => i + 1).map(page => (
          <PaginationItem
            key={page}
            className={cn(page !== currentPage && ["hidden sm:flex"])}
            page={page}
            active={currentPage === page}
            href={linkResolver(page)}
            onClick={e => onClick?.(page, e)}
          />
        ))}
      </ol>

      <PaginationItem
        page={pagesCount}
        href={linkResolver(pagesCount)}
        disabled={currentPage === pagesCount}
        onClick={e => onClick?.(pagesCount, e)}
      >
        <ChevronsRightIcon size={16} />
      </PaginationItem>
    </nav>
  )
}

interface PaginationItemProps extends PropsWithChildren {
  className?: string
  page: number
  href: string
  active?: boolean
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
}

function PaginationItem({
  children,
  className,
  page,
  active,
  href,
  disabled,
  onClick,
}: PaginationItemProps) {
  const activeLink = !active && !disabled
  return (
    <a
      className={cn(
        "rounded border border-gray-200 px-3 py-1.5 text-sm font-medium text-current hover:text-current",
        {
          "border-primary-600 bg-primary-500 text-white hover:text-white": active,
          "cursor-default": disabled || !activeLink,
          "opacity-50": disabled,
        },
        className
      )}
      href={activeLink ? href : undefined}
      onClick={activeLink ? onClick : undefined}
    >
      {children ?? page}
    </a>
  )
}

export { Pagination, PaginationItem }
