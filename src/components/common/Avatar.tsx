import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

import classes from "@styles/components/common/Avatar.module.scss"

import { GatsbyImageData } from "@definitions/sources"

type AvatarProps = {
  id?: number
  imageData?: GatsbyImageData
}

type AvatarStaticQuery = {
  images: {
    nodes: Array<{
      directusId: number
      localFile: {
        childImageSharp: GatsbyImageData
      }
    }>
  }
}

const Avatar: React.FC<AvatarProps> = ({ id, imageData }) => {
  if (imageData) {
    return (
      <div className={classes.avatar}>
        <GatsbyImage image={imageData} alt="" />
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

const QueryAvatar: React.FC<{ id: number }> = ({ id }) => {
  const data = useStaticQuery<AvatarStaticQuery>(graphql`{
    images: allDirectusFile(filter: {type: {regex: "/image/(jpeg)|(png)/"}}) {
      nodes {
        directusId
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 250
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
      }
    }
  }
  `)

  const img = data.images.nodes.find(img => img.directusId === id)

  if (img) {
    return (
      <div className={classes.avatar}>
        <GatsbyImage image={img.localFile.childImageSharp} objectFit="cover" alt="" />
      </div>
    )
  }

  return null
}

export default Avatar
