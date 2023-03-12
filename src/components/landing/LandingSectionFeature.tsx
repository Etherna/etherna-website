import classes from "@/styles/components/landing/LandingSectionFeature.module.scss"

import Col from "@/components/common/Col"
import classNames from "@/utils/classnames"

type LandingSectionFeatureProps = {
  feature: {
    title: string
    description: string
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  }
  count: number
}

const LandingSectionFeature: React.FC<LandingSectionFeatureProps> = ({ feature, count }) => {
  return (
    <Col
      className={classNames({
        // fix purge css
        "sm:w-1/2": count === 2,
        "sm:w-1/3": count === 3,
        "mx-auto sm:w-1/3": count === 4,
      })}
    >
      <div className={classes.landingFeature}>
        {feature.icon && (
          <div className={classNames(classes.landingFeatureIcon)}>
            {feature.icon && <feature.icon />}
          </div>
        )}
        <h3 className={classNames(classes.landingFeatureTitle)}>{feature.title}</h3>
        <p className={classNames(classes.landingFeatureDescription)}>{feature.description}</p>
      </div>
    </Col>
  )
}

export default LandingSectionFeature
