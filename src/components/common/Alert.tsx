import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type AlertProps = PropsWithChildren<{
  className?: string
  type?: "success" | "danger" | "warning" | "info"
  title?: string
  onClose?(): void
}>

const Alert: React.FC<AlertProps> = ({ children, className, type = "success", title, onClose }) => {
  return (
    <div
      className={classNames(
        "block w-full rounded border px-4 py-3",
        {
          "border-green-200 bg-green-100 text-green-600": type === "success",
          "border-red-200 bg-red-100 text-red-600": type === "danger",
          "border-yellow-200 bg-yellow-100 text-yellow-600": type === "warning",
          "border-blue-200 bg-blue-100 text-blue-600": type === "info",
        },
        className
      )}
    >
      <div className="flex items-center justify-between">
        {title && <div className="block font-bold">{title}</div>}

        {onClose && (
          <button
            className={classNames(
              "ml-auto rounded-full bg-transparent p-2 text-2xl leading-none focus:outline-0"
            )}
            onClick={onClose}
          >
            <span className="m-auto" aria-hidden="true">
              &times;
            </span>
          </button>
        )}
      </div>
      <span>{children}</span>
    </div>
  )
}

export default Alert
