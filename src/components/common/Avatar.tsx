import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

import classes from "@styles/components/common/Avatar.module.scss"

import { GatsbyImageData } from "@definitions/sources"
import classNames from "classnames"

type AvatarProps = {
  id?: number
  imageData?: GatsbyImageData
  className?: string
}

type AvatarStaticQuery = {
  images: {
    nodes: Array<{
      directusId: number
      localFile: {
        childImageSharp: {
          gatsbyImageData: GatsbyImageData
        }
      }
    }>
  }
}

const Avatar: React.FC<AvatarProps> = ({ id, imageData, className }) => {
  if (imageData) {
    return (
      <div className={classNames(classes.avatar, className)}>
        <GatsbyImage image={imageData} alt="" />
      </div>
    )
  }

  if (typeof id === "number") {
    return (
      <QueryAvatar id={id} className={className} />
    )
  }

  return null
}

const QueryAvatar: React.FC<{ id: number, className?: string }> = ({ id, className }) => {
  const data = useStaticQuery<AvatarStaticQuery>(graphql`{
    images: allDirectusFile(filter: {type: {regex: "/image/(jpeg)|(png)/"}}) {
      nodes {
        directusId
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 250
              placeholder: BLURRED
              formats: [AUTO, WEBP]
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
      <div className={classNames(classes.avatar, className)}>
        <GatsbyImage image={img.localFile.childImageSharp.gatsbyImageData} objectFit="cover" alt="" />
      </div>
    )
  }

  return null
}

export default Avatar
