import classNames from "@/utils/classnames"

type ColProps = {
  children?: React.ReactNode
  as?: React.ElementType
  className?: string
}

const Col: React.FC<ColProps> = ({ children, as: As = "div", className }) => {
  return <As className={classNames("px-5", "w-full", className)}>{children}</As>
}

export default Col
