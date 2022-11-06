import React from "react"
import classNames from "@utils/classnames"

import classes from "@styles/components/common/FormGroup.module.scss"

type FormGroupProps = {
  children?: React.ReactNode
  className?: string
  label?: string
  labelFor?: string
  error?: string
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  label,
  labelFor,
  error,
}) => {
  return (
    <div className={classNames(classes.formGroup, className)}>
      {label && (
        <label htmlFor={labelFor}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <small className={classes.formGroupError}>{error}</small>
      )}
    </div>
  )
}

export default FormGroup
