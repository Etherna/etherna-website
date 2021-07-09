import React from "react"
import PropTypes from "prop-types"

import HeadMeta from "@components/HeadMeta"
import AdminDashboard from "@components/AdminDashboard"
import { LocalizedPage } from "@utils/localizedPage"

const AdminPage = () => {
  return (
    <LocalizedPage>
      <HeadMeta title="Directus Admin Area" />

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
