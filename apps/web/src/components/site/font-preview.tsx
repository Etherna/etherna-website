import React, { useEffect, useRef, useState } from "react"

interface FontPreviewProps {
  fontFamily: string
  fontWeight: string[]
  importUrl?: string | null
}

export function FontPreview({ fontFamily, fontWeight, importUrl }: FontPreviewProps) {
  const styleRef = useRef<HTMLStyleElement>()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadFont().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importUrl])

  const loadFont = async () => {
    setLoaded(false)

    let fontFaceLoaded = false

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (window.FontFace) {
      try {
        const font = new FontFace(fontFamily, `url(${importUrl})`)
        await font.load()
        document.fonts.add(font)

        fontFaceLoaded = true
      } catch (error) {
        console.error(error)
      }
    }

    if (!fontFaceLoaded) {
      const css = `@import url('${importUrl}')`
      const style = document.createElement("style")
      style.innerText = css

      document.body.appendChild(style)

      if (styleRef.current) {
        styleRef.current.remove()
        styleRef.current = style
      }
    }

    setLoaded(true)
  }

  if (!loaded) return null

  return (
    <div
      className="w-[calc(100%-theme('spacing.10'))] cursor-default select-none overflow-hidden text-center text-4xl absolute-center"
      style={{
        fontFamily,
        fontWeight: fontWeight.length ? Number(fontWeight[0]) : undefined,
      }}
    >
      {new Array(26)
        .fill(0)
        .map((_, i) => String.fromCharCode(65 + i) + String.fromCharCode(97 + i))}
    </div>
  )
}
