import classes from "@/styles/components/common/Avatar.module.scss"

import classNames from "@/utils/classnames"

type AvatarProps = {
  id?: number
  src: string
  alt?: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ id, src, alt, className }) => {
  return (
    <div className={classNames(classes.avatar, className)}>
      <img src={src} alt={alt} />
    </div>
  )
}

export default Avatar
