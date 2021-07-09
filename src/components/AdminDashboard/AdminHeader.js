import React from "react"
import { Link } from "gatsby"

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="admin-header-logo">
        <Link to="/">
          <img
            src={require("@images/logo.svg").default}
            alt="Etherna"
          />
        </Link>
      </div>
      <div className="admin-header-home">
        <Link to="/">
          ← Back to Etherna
        </Link>
      </div>
      <div className="admin-header-backend">
        <a
          href={process.env.DIRECTUS_URL}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Backend →
        </a>
      </div>
    </header>
  )
}

export default AdminHeader
