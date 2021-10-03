import React from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

import "./avatar.scss"
import { parseFluidImage } from "@utils/dataParser"

const Avatar = ({ id, fluid }) => {
  if (fluid) {
    return (
      <div className="avatar">
        <GatsbyImage image={fluid} />
      </div>
    );
  }

  if (typeof id === "number") {
    return (
      <QueryAvatar id={id} />
    )
  }

  return null
}

const QueryAvatar = ({ id }) => {
  const data = useStaticQuery(graphql`{
  images: allDirectusFile(filter: {type: {regex: "/image/(jpeg)|(png)/"}}) {
    nodes {
      directusId
      localFile {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
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
        <GatsbyImage image={parseFluidImage(img)} objectFit="cover" objectPosition="50% 50%" />
      </div>
    );
  }

  return null
}

Avatar.propTypes = {
  id: PropTypes.number,
  fluid: PropTypes.object,
}

export default Avatar
