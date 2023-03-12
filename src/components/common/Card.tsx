import classes from "@/styles/components/common/Card.module.scss"

import classNames from "@/utils/classnames"

type CardProps = {
  children?: React.ReactNode
  className?: string
  size?: "large"
}

const Card: React.FC<CardProps> = ({ children, className, size }) => {
  return (
    <div
      className={classNames(classes.card, className, {
        [classes.cardLg]: size === "large",
      })}
    >
      {children}
    </div>
  )
}

export default Card
