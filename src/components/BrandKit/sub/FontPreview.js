import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

const FontPreview = ({ fontFamily, fontWeight, importUrl }) => {
  const styleRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    loadFont()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importUrl])

  const loadFont = async () => {
    setLoaded(false)

    let fontFaceLoaded = false

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
    <div className="font-preview-text" style={{
      fontFamily,
      fontWeight: fontWeight && fontWeight.length && fontWeight[0]
    }}>
      {new Array(26).fill(0).map((_, i) => (
        String.fromCharCode(65 + i) + String.fromCharCode(97 + i)
      ))}
    </div>
  )
}

FontPreview.propTypes = {
  fontName: PropTypes.string,
  importUrl: PropTypes.string.isRequired,
}

export default FontPreview
