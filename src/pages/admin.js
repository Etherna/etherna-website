import React from "react"
import PropTypes from "prop-types"

import SEO from "@components/SEO"
import AdminDashboard from "@components/AdminDashboard"
import { LocalizedPage } from "@utils/localizedPage"

const AdminPage = () => {
  return (
    <LocalizedPage>
      <SEO title="Directus Admin Area" />

      <AdminDashboard />
    </LocalizedPage>
  )
}

AdminPage.propTypes = {
  pageContext: PropTypes.shape({
    locale: PropTypes.string
  })
}

export default AdminPage
