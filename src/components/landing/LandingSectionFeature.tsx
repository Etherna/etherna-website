import React, { useRef } from "react"
import classNames from "classnames"

import classes from "@styles/components/landing/LandingSectionFeature.module.scss"

import ViewportObserver from "@components/layout/ViewportObserver"

type LandingSectionFeatureProps = {
  feature: {
    title: string
    description: string
    icon?: string
  }
  count: number
}

const LandingSectionFeature: React.FC<LandingSectionFeatureProps> = ({ feature, count }) => {
  const iconRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descrpitionRef = useRef<HTMLParagraphElement>(null)

  return (
    <div className={classNames("col", {
      // fix purge css
      "sm:w-1/2": count === 2,
      "sm:w-1/3": count === 3,
      "sm:w-1/3 mx-auto": count === 4,
    })}>
      <div className={classes.landingFeature}>
        {feature.icon && (
          <ViewportObserver childrenRef={iconRef} viewportClassName="animation-active">
            <div className={classNames(classes.landingFeatureIcon, "fade-in-up", "delay-150")} ref={iconRef}>
              <img src={feature.icon} alt={feature.title} />
            </div>
          </ViewportObserver>
        )}
        <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
          <h3 className={classNames(classes.landingFeatureTitle, "fade-in-up", "delay-200")} ref={titleRef}>
            {feature.title}
          </h3>
        </ViewportObserver>
        <ViewportObserver childrenRef={descrpitionRef} viewportClassName="animation-active" offset={50}>
          <p className={classNames(classes.landingFeatureDescription, "fade-in-up", "delay-300")} ref={descrpitionRef}>
            {feature.description}
          </p>
        </ViewportObserver>
      </div>
    </div>
  )
}

export default LandingSectionFeature