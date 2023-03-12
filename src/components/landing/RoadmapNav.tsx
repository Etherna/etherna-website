import React, { useState, useRef, useEffect, useMemo } from "react"

import classes from "@/styles/components/landing/RoadmapNav.module.scss"

import { quadraticBezier } from "@/utils/bezier"
import { solarLongitudeScroll } from "@/utils/meridians"

type RoadmapNavProps = {
  latitude: number
  longitude: number
  startLongitude: number
}

const RoadmapNav: React.FC<RoadmapNavProps> = ({ latitude, longitude, startLongitude }) => {
  const [imageEl, setImageEl] = useState<HTMLDivElement>()
  const [globeSize, setGlobeSize] = useState(128)
  const timer = useRef<number>()

  useEffect(() => {
    onResize()
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageEl])

  const onResize = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setGlobeSize(imageEl?.clientWidth ?? 128)
    }, 250) as unknown as number
  }

  const [scrollX, location] = useMemo(() => {
    const latitudePercent = (latitude * 0.8 + 50) / (50 + 85) // [85,-50] are the image latitude boundaries
    const location = quadraticBezier(1 - latitudePercent, 50, 0, 65, 50, 50, 100)

    const scrollX = solarLongitudeScroll(longitude, startLongitude, globeSize) + (location.x - 50)

    return [scrollX, location]
  }, [latitude, longitude, startLongitude, globeSize])

  return (
    <div className={classes.roadmapNav}>
      <div
        className={classes.roadmapNavWorld}
        style={{ backgroundPositionX: `${scrollX}px` }}
        ref={el => el && setImageEl(el)}
      />
      <div className={classes.roadmapNavMeridian}>
        <svg strokeWidth="1.5" viewBox="0 0 100 100">
          <path
            id="meridian_path"
            className={classes.meridian}
            d="M 50 0 Q 65 50, 50 100"
            fill="none"
          />
          <circle className={classes.meridianLoc} cx={location.x} cy={location.y} r="4" />
        </svg>
      </div>
    </div>
  )
}

export default RoadmapNav
