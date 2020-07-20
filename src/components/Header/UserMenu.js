import React from "react"
import { Link } from "gatsby"

import { getCurrentUser } from "@utils/admin"
import gravatar from "@utils/gravatar"

const UserMenu = () => {
  const currentUser = getCurrentUser()

  return currentUser ? (
    <Link to="/admin" className="user-menu-link">
      <div className="user-menu-avatar">
        <img src={currentUser.avatar || gravatar(currentUser.email)} alt={currentUser.name} />
      </div>
    </Link>
  ) : null
}

export default UserMenu
