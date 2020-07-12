import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = ({ filename, alt, width, className }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              extension
              publicURL
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(filename)
      })
      if (!image) {
        return null
      }

      if (!image.node.childImageSharp && image.node.extension === "svg") {
        return (
          <img
            src={image.node.publicURL}
            alt={alt}
            className={className}
            width={width || null}
          />
        )
      }

      return <Img alt={alt} fluid={image.node.childImageSharp.fluid} />
    }}
  />
)

Image.propTypes = {
  filename: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
}

export default Image