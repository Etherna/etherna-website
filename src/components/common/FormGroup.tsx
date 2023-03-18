import classNames from "@/utils/classnames"

import type { PropsWithChildren } from "react"

type FormGroupProps = PropsWithChildren<{
  className?: string
  label?: string
  labelFor?: string
  error?: string
}>

const FormGroup: React.FC<FormGroupProps> = ({ children, className, label, labelFor, error }) => {
  return (
    <div className={classNames("mb-4 md:mb-6", className)}>
      {label && (
        <label className="mb-2 text-sm font-semibold text-gray-700" htmlFor={labelFor}>
          {label}
        </label>
      )}
      {children}
      {error && <small className="mt-1 text-xs font-medium text-red-500">{error}</small>}
    </div>
  )
}

export default FormGroup
