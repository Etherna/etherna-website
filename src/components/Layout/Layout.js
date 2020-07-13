import React from "react"
import PropTypes from "prop-types"

import Header from "@components/Header"
import Footer from "@components/Footer"

const Layout = ({ children, transparentHeader, showLandingMenu }) => {
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
