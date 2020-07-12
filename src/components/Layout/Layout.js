import React from "react"
import PropTypes from "prop-types"

import Header from "@components/Header"
import Footer from "@components/Footer"

const Layout = ({ children, transparentHeader }) => {
  return (
    <>
      <Header transparent={transparentHeader} />

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
}

Layout.defaultProps = {
  transparentHeader: false
}

export default Layout
