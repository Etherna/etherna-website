import React, { useEffect } from "react"

import Header from "./Header"
import Footer from "./Footer"

type LayoutProps = {
  transparentHeader?: boolean
  showLandingMenu?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, transparentHeader, showLandingMenu }) => {
  useEffect(() => {
    if (typeof window === "undefined") return

    const wwwPattern = "www."

    if (window.location.origin.includes(wwwPattern)) {
      const { origin, pathname, search } = window.location
      const url = `${origin.replace(wwwPattern, "")}${pathname}${search}`

      window.location.href = url
    }
  }, [])

  return (
    <>
      <Header
        transparent={transparentHeader}
        showLandingMenu={showLandingMenu}
      />

      <main>
        {children}
      </main>

      <Footer />

      <section id="modals"></section>
    </>
  )
}

export default Layout
