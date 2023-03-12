import classes from "@/styles/components/common/Alert.module.scss"

import classNames from "@/utils/classnames"

type AlertProps = {
  children?: React.ReactNode
  className?: string
  type?: "success" | "danger" | "warning" | "info"
  title?: string
  onClose?(): void
}

const Alert: React.FC<AlertProps> = ({ children, className, type = "success", title, onClose }) => {
  return (
    <div
      className={classNames(classes.alert, className, {
        [classes.alertSuccess]: type === "success",
        [classes.alertDanger]: type === "danger",
        [classes.alertWarning]: type === "warning",
        [classes.alertInfo]: type === "info",
      })}
    >
      <div className={classes.alertHeader}>
        {title && <div className={classes.alertTitle}>{title}</div>}

        {onClose && (
          <button className={classes.alertClose} onClick={onClose}>
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
