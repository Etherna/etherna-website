import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type BreadcrumbProps = PropsWithChildren<{
  className?: string
}>

type BreadcrumbItemProps = {
  title: string
  path?: string
  isLast?: boolean
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ title, path, isLast }) => {
  const LinkWrapper: React.FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
  }) =>
    path ? (
      <a href={path} className={className}>
        {children}
      </a>
    ) : (
      <>{children}</>
    )

  return (
    <li
      className={classNames("flex items-center text-sm text-gray-500", {
        "last-of-type:font-semibold last-of-type:text-gray-800": isLast,
      })}
    >
      <LinkWrapper
        className={classNames("text-gray-500 hover:text-gray-700", {
          "text-gray-800 hover:text-black": isLast,
        })}
      >
        {title}
      </LinkWrapper>

      {!isLast && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 px-2" viewBox="0 0 320 512">
          <path
            fill="#bbbbbb"
            fillRule="nonzero"
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      )}
    </li>
  )
}

export const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem
} = ({ children, className }) => {
  return <ol className={classNames("flex flex-wrap", className)}>{children}</ol>
}
Breadcrumb.Item = BreadcrumbItem

export default Breadcrumb
