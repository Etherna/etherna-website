import React from "react"

import { cn } from "@/utils/classnames"

interface SpinnerProps extends React.ComponentProps<"div"> {
  size?: number | string
}

const ticksCount = 12
const tickWidth = "8%"

export function Spinner({ className, size }: SpinnerProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        width: size,
        height: size,
      }}
    >
      {Array(ticksCount)
        .fill(0)
        .map((_, i) => {
          return (
            <div
              className={cn(
                "animate-tick-fade absolute right-1/2 h-1/2 origin-bottom scale-95 transform",
                "after:absolute after:inset-x-0 after:top-0 after:h-1/2 after:rounded-full after:bg-current",
              )}
              style={
                {
                  width: tickWidth,
                  transform: `rotate(${i * 30}deg)`,
                  animationDelay: `-${(ticksCount - i) * 0.1}s`,
                  opacity: `${0.1 + (0.9 / (ticksCount - 1)) * i}`,
                  "--tw-translate-x": parseInt(tickWidth) / 2,
                } as React.CSSProperties & { "--tw-translate-x": number }
              }
              key={i}
            />
          )
        })}
    </div>
  )
}
