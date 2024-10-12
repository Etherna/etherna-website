import { RichText } from "../common/rich-text"
import {
  TextColumns,
  TextColumnsContentColumn,
  TextColumnsDescription,
  TextColumnsMainColumn,
  TextColumnsSubtitle,
  TextColumnsTitle,
} from "../layout/text-columns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { BaseBlock } from "./base-block"
import { isNotEmptyLexical } from "@/lib/lexical"

import type { BlockProps } from "./base-block"
import type { FAQBlock } from "@payload-types"

export function FAQBlock({
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
  faqs,
}: BlockProps<FAQBlock>) {
  return (
    <BaseBlock blockId={id} blockType={blockType} background={background}>
      <TextColumns
        className="gap-6 md:gap-8 lg:gap-10"
        centered={centered ?? false}
        inline={!forceFullWidth && !centered}
      >
        <TextColumnsMainColumn>
          {subtitle && (
            <TextColumnsSubtitle size={titleSize ?? "default"}>{subtitle}</TextColumnsSubtitle>
          )}

          {title && (
            <TextColumnsTitle tag={heading} size={titleSize ?? "sm"}>
              {title}
            </TextColumnsTitle>
          )}

          {isNotEmptyLexical(text) && (
            <TextColumnsDescription>
              <RichText nodes={text.root.children} />
            </TextColumnsDescription>
          )}
        </TextColumnsMainColumn>
        <TextColumnsContentColumn inlineSize={"lg"}>
          <Accordion type="multiple">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <RichText nodes={faq.text?.root.children ?? []} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TextColumnsContentColumn>
      </TextColumns>
    </BaseBlock>
  )
}
