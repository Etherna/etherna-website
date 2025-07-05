import { z } from "astro/zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RichText } from "../common/rich-text"
import {
  TextColumns,
  TextColumnsContentColumn,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Spinner } from "../ui/spinner"
import { Textarea } from "../ui/textarea"
import { BaseBlock } from "./base-block"
import { t } from "@/i18n"
import { formDictionary } from "@/i18n/dictionaries/form"
import { isNotEmptyLexical } from "@/lib/lexical"
import { cn } from "@/lib/utils"

import type { BlockProps } from "./base-block"
import type { Locale } from "@/i18n/types"
import type { FormBlock, Form as FormType } from "@payload-types"

type Field = NonNullable<FormType["fields"]>[number]

const refine = (type: Zod.ZodSchema, field: Field, locale: Locale) => {
  switch (field.blockType) {
    case "text":
    case "email":
    case "textarea":
    case "select": {
      if (field.required) {
        return (type as Zod.ZodString).min(1, {
          message: t(formDictionary.required, { locale }),
        })
      } else {
        return type.optional()
      }
    }
    case "acceptance":
    case "checkbox": {
      if (field.required) {
        return type.refine((value) => value === true, {
          message: t(formDictionary.required, { locale }),
        })
      } else {
        return type.optional()
      }
    }
    case "number": {
      if (field.required) {
        return (type as Zod.ZodNumber).refine((value) => value != null && !isNaN(value), {
          message: t(formDictionary.required, { locale }),
        })
      } else {
        return type.optional()
      }
    }
    case "message":
      break
  }
}

export function FormBlock({
  id,
  blockType,
  title,
  subtitle,
  text,
  background,
  heading,
  centered,
  forceFullWidth,
  titleSize,
  form: _formBlock,
  locale,
}: BlockProps<FormBlock>) {
  const formBlock = _formBlock as FormType
  const schema = z.object(
    Object.fromEntries(
      (formBlock.fields ?? []).map((field) => {
        switch (field.blockType) {
          case "text":
          case "textarea":
          case "select":
            return [
              field.name,
              refine(
                z.string({
                  required_error: t(formDictionary.required, { locale }),
                }),
                field,
                locale,
              ),
            ]
          case "email":
            return [
              field.name,
              refine(
                z
                  .string({
                    required_error: t(formDictionary.required, { locale }),
                  })
                  .email({
                    message: t(formDictionary.email, { locale }),
                  }),
                field,
                locale,
              ),
            ]
          case "number":
            return [
              field.name,
              refine(
                z.coerce.number({
                  invalid_type_error: t(formDictionary.number, { locale }),
                  required_error: t(formDictionary.required, { locale }),
                }),
                field,
                locale,
              ),
            ]
          case "checkbox":
            return [
              field.name,
              refine(
                z.boolean({
                  required_error: t(formDictionary.required, { locale }),
                }),
                field,
                locale,
              ),
            ]
          default:
            return ["msg", z.unknown()]
        }
      }),
    ),
  )
  const form = useForm({
    resolver: zodResolver(schema),
  })
  const isInline = !forceFullWidth && !centered

  const submit = async (values: z.infer<typeof schema>) => {
    try {
      const dataToSend = Object.entries(values).map(([name, value]) => ({
        field: name,
        value,
      }))

      const response = await fetch(import.meta.env.PUBLIC_PAYLOAD_URL + "/api/form-submissions", {
        method: "POST",
        body: JSON.stringify({
          form: formBlock.id,
          submissionData: dataToSend,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      if (formBlock.confirmationType === "redirect") {
        window.location.href = formBlock.redirect?.url ?? window.location.href
      } else {
        form.reset(
          Object.fromEntries(
            (formBlock.fields ?? [])
              .filter((f) => f.blockType !== "message")
              .map((field) => [field.name, undefined]),
          ),
        )
      }
    } catch (error) {
      form.setError("root", {
        message: (error as Error).message,
      })
    }
  }

  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns centered={centered ?? false} inline={isInline}>
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "lg"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn
          className={cn({
            "max-w-md": isInline,
          })}
          inlineSize={"lg"}
        >
          <Form {...form}>
            <form
              className="flex flex-col flex-wrap gap-[var(--form-gap)] xs:flex-row"
              onSubmit={form.handleSubmit(submit)}
              style={{
                ["--form-gap" as string]: "1rem",
              }}
            >
              {formBlock.fields?.map((formField, i) =>
                formField.blockType !== "message" ? (
                  <FormField
                    key={i}
                    name={formField.name}
                    render={({ field }) => (
                      <FormItem
                        className=""
                        style={{
                          flexBasis: formField.width
                            ? `calc(${formField.width}% - var(--form-gap) * 0.5)`
                            : "100%",
                        }}
                      >
                        <FormLabel>
                          {formField.label && typeof formField.label === "object" ? (
                            <RichText nodes={formField.label.root.children} />
                          ) : (
                            formField.label
                          )}
                        </FormLabel>
                        <FormControl>
                          {(() => {
                            switch (formField.blockType) {
                              case "text":
                              case "email":
                              case "number":
                                return <Input {...field} value={field.value ?? ""} />
                              case "textarea":
                                return <Textarea {...field} value={field.value ?? ""} />
                              case "acceptance":
                              case "checkbox":
                                return <Checkbox {...field} />
                              case "select":
                                return (
                                  <Select
                                    {...field}
                                    value={field.value ?? ""}
                                    defaultValue={formField.defaultValue ?? undefined}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger
                                      ref={field.ref}
                                      className="w-full"
                                      onBlur={field.onBlur}
                                    >
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {formField.options?.map((option, i) => (
                                        <SelectItem key={i} value={option.value}>
                                          {option.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )
                              default:
                                return null
                            }
                          })()}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <div>
                    <RichText nodes={formField.message?.root.children ?? []} />
                  </div>
                ),
              )}

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Spinner className="mr-2 size-[1em]" />}
                {formBlock.submitButtonLabel}
              </Button>

              {form.formState.errors.root?.message && (
                <Alert variant={"destructive"}>
                  <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                </Alert>
              )}

              {form.formState.isSubmitSuccessful && formBlock.confirmationType === "message" && (
                <Alert className="text-sm" variant={"success"}>
                  <RichText nodes={formBlock.confirmationMessage?.root.children ?? []} />
                </Alert>
              )}
            </form>
          </Form>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
