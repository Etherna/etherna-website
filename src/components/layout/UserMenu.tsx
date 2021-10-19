import React from "react"
import { Link } from "gatsby"

import { getCurrentUser } from "@utils/admin"
import gravatar from "@utils/gravatar"

type UserMenuProps = {
  linkClassName?: string
  avatarClassName?: string
}

const UserMenu: React.FC<UserMenuProps> = ({ linkClassName, avatarClassName }) => {
  const currentUser = getCurrentUser()

  return currentUser ? (
    <Link to="/admin" className={linkClassName}>
      <div className={avatarClassName}>
        <img src={currentUser.avatar || gravatar(currentUser.email)} alt={currentUser.name} />
      </div>
    </Link>
  ) : null
}

export default UserMenu
