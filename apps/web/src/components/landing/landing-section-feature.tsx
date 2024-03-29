import { FeatureBgIcon } from "@/components/assets/landing"

import { Col } from "@/components/common/col"
import { cn } from "@/utils/classnames"

interface LandingSectionFeatureProps {
  feature: {
    title: string
    description: string
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  }
  count: number
}

export function LandingSectionFeature({ feature, count }: LandingSectionFeatureProps) {
  return (
    <Col
      className={cn({
        // fix purge css
        "sm:w-1/2": count === 2,
        "sm:w-1/3": count >= 3,
      })}
    >
      <div className="mb-8 px-6">
        {feature.icon && (
          <div className="relative mx-auto flex h-36 w-36 justify-around">
            <FeatureBgIcon className="absolute inset-0 drop-shadow-light" />
            <feature.icon className="z-1" />
          </div>
        )}
        <h3 className="mx-auto mb-2 max-w-sm font-semibold text-gray-800">{feature.title}</h3>
        <p className="mx-auto max-w-sm text-gray-600">{feature.description}</p>
      </div>
    </Col>
  )
}
