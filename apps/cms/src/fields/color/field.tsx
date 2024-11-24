"use client"

import { HexColorPicker } from "react-colorful"
import { Popup, TextInput, useField } from "@payloadcms/ui"

import { PaletteIcon } from "lucide-react"

import type { TextFieldClientProps } from "payload"

const DefaultColorPalette = [
  "#de0a0a", // Red
  "#ee9a00", // Orange
  "#dfdf0c", // Yellow
  "#0bc60b", // Green
  "#05d9d9", // Cyan
  "#1e25de", // Blue
  "#9e10c5", // Purple
  "#dc21dc", // Magenta
  "#da5085", // Pink
  "#A52A2A", // Brown
  "#000000", // Black
  "#555555", // Dark Gray
  "#AAAAAA", // Gray
  "#FFFFFF", // White
]

export function ColorField({ field, readOnly, path }: TextFieldClientProps) {
  const { label } = field
  const { value, setValue } = useField<string>({ path })

  return (
    <div
      className="field-type relative"
      style={{
        ...field.admin?.style,
        width: field.admin?.width,
      }}
    >
      <TextInput
        className="[&_input]:!pl-14"
        label={label ?? "Color"}
        value={value || undefined}
        onChange={setValue}
        path={path}
        readOnly={readOnly}
      />

      <div
        className="absolute bottom-2 left-2.5 size-8 rounded-sm border"
        style={{
          backgroundColor: value,
          borderColor: "var(--theme-elevation-150)",
        }}
      />

      <div className="absolute bottom-3.5 right-3">
        <Popup
          horizontalAlign="right"
          verticalAlign="bottom"
          button={<PaletteIcon className="size-6" />}
          disabled={readOnly}
        >
          <HexColorPicker
            className="mx-auto p-5"
            color={value?.startsWith("#") ? value : ""}
            onChange={setValue}
          />
          <div className="mt-4 grid grid-cols-7 gap-2">
            {DefaultColorPalette.map((color) => (
              <div
                key={color}
                className={`aspect-square w-full rounded-sm`}
                onClick={() => setValue(color)}
                style={{
                  backgroundColor: color,
                  boxShadow: value === color ? "0 0 0 2px var(--theme-elevation-900)" : "none",
                }}
              />
            ))}
          </div>
        </Popup>
      </div>
    </div>
  )
}
