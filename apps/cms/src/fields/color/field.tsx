"use client"

import React from "react"
import { HexColorPicker } from "react-colorful"
import { Button, Popup, TextInput, useField } from "@payloadcms/ui"

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

const AppColorPalette = [
  "hsl(var(--background))",
  "hsl(var(--foreground))",
  "hsl(var(--card))",
  "hsl(var(--card-foreground))",
  "hsl(var(--popover))",
  "hsl(var(--popover-foreground))",
  "hsl(var(--primary))",
  "hsl(var(--primary-foreground))",
  "hsl(var(--secondary))",
  "hsl(var(--secondary-foreground))",
  "hsl(var(--muted))",
  "hsl(var(--muted-foreground))",
  "hsl(var(--accent))",
  "hsl(var(--accent-foreground))",
  "hsl(var(--success))",
  "hsl(var(--success-foreground))",
  "hsl(var(--info))",
  "hsl(var(--info-foreground))",
  "hsl(var(--warning))",
  "hsl(var(--warning-foreground))",
  "hsl(var(--gold))",
  "hsl(var(--gold-foreground))",
  "hsl(var(--destructive))",
  "hsl(var(--destructive-foreground))",
  "hsl(var(--border))",
  "hsl(var(--input))",
  "hsl(var(--ring))",
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function ColorField({ field, readOnly, path }: TextFieldClientProps) {
  const { label } = field
  const { value, setValue } = useField<string>({ path })
  const [tab, setTab] = React.useState<"default" | "app">("default")

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
          className=""
          button={<PaletteIcon className="size-6" />}
          disabled={readOnly}
        >
          <div className="mb-4 flex w-full gap-1 px-2 [&>*]:flex-1">
            <Button
              size="small"
              buttonStyle={tab === "default" ? "primary" : "subtle"}
              onClick={() => setTab("default")}
            >
              Default
            </Button>
            <Button
              size="small"
              buttonStyle={tab === "app" ? "primary" : "subtle"}
              onClick={() => setTab("app")}
            >
              App
            </Button>
          </div>

          {tab === "default" && (
            <>
              <HexColorPicker
                className="mx-auto p-5"
                color={value?.startsWith("#") ? value : ""}
                onChange={setValue}
              />
              <div className="mt-4 grid grid-cols-7 gap-2 px-2">
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
            </>
          )}

          {tab === "app" && (
            <>
              <div className="mt-4 flex max-h-[40vh] flex-col gap-2 overflow-auto px-2">
                {AppColorPalette.map((color) => (
                  <div
                    key={color}
                    className="flex cursor-default items-center gap-2"
                    onClick={() => setValue(color)}
                  >
                    <div
                      className={`aspect-square size-4 rounded-sm`}
                      style={{
                        backgroundColor: color,
                        boxShadow:
                          value === color ? "0 0 0 2px var(--theme-elevation-900)" : "none",
                      }}
                    />
                    <span>{color}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Popup>
      </div>
    </div>
  )
}
