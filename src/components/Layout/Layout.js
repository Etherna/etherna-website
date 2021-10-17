import React, { useEffect } from "react"
import PropTypes from "prop-types"

import Header from "@components/Header"
import Footer from "@components/Footer"

const Layout = ({ children, transparentHeader, showLandingMenu }) => {
  useEffect(() => {
    if (typeof window === "undefined") return

    const wwwPattern = "www."

    if (window.location.origin.includes(wwwPattern)) {
      const { origin, pathname, search } = window.location
      const url = `${origin.replace(wwwPattern, "")}${pathname}${search}`

      window.location = url
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  transparentHeader: PropTypes.bool,
  showLandingMenu: PropTypes.bool,
}

Layout.defaultProps = {
  transparentHeader: false,
  showLandingMenu: false,
}

export default Layout
