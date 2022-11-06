import React from "react"
import { PageProps } from "gatsby"

import HeadMeta from "@components/layout/HeadMeta"
import { LocalizedPage } from "@context/locale-context/localized-page"
import AdminDashboard from "@components/admin/AdminDashboard"

type AdminPageProps = PageProps<any, {
  locale: string
}>

const AdminPage: React.FC<AdminPageProps> = () => {
  return (
    <LocalizedPage>
      <HeadMeta title="Directus Admin Area" />

      <AdminDashboard />
    </LocalizedPage>
  )
}

export default AdminPage
