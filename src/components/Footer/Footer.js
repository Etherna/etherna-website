import React from "react"
import { Link } from "gatsby"

import SocialMenu from "@components/SocialMenu"

import "./footer.scss"

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-container">
        <img src={require("@images/logo-footer.svg")} alt="Etherna" />

        <SocialMenu />

        <div className="footer-notice">
          <div className="copyright">
            Copyright© {new Date().getFullYear()} Etherna Sagl. All rights reserved.
          </div>
          <nav className="footer-menu">
            <Link to="privacy-policy">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer