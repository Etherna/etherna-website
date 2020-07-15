import React from "react"
import PropTypes from "prop-types"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import "./avatar.scss"
import { parseFluidImage } from "@utils/dataParser"

const Avatar = ({ id, fluid }) => {
  if (fluid) {
    return (
      <div className="avatar">
        <Img fluid={fluid} />
      </div>
    )
  }

  if (typeof id === "number") {
    return (
      <QueryAvatar id={id} />
    )
  }

  return null
}

const QueryAvatar = ({ id }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allDirectusFile(filter: {type: {regex: "/image/(jpeg)|(png)/"}}) {
        nodes {
          directusId
          localFile {
            childImageSharp {
              fluid {
                aspectRatio
                base64
                originalImg
                originalName
                presentationHeight
                presentationWidth
                sizes
                src
                srcSet
              }
            }
          }
        }
      }
    }
  `)

  const img = data.images.nodes.find(img => img.directusId === id)

  if (img) {
    return (
      <div className="avatar">
        <Img
          fluid={parseFluidImage(img)}
          objectFit="cover"
          objectPosition="50% 50%"
        />
      </div>
    )
  }

  return null
}

Avatar.propTypes = {
  id: PropTypes.number,
  fluid: PropTypes.object,
}

export default Avatar
