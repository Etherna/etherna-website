import { ProseBlock } from "../blocks/prose-block"
import { AwardsBlock } from "@/components/blocks/awards-block"
import { BentoBlock } from "@/components/blocks/bento-block"
import { BrandBlock } from "@/components/blocks/brand-block"
import { ClientsBlock } from "@/components/blocks/clients-block"
import { CtaBlock } from "@/components/blocks/cta-block"
import { FAQBlock } from "@/components/blocks/faq-block"
import { FeaturesBlock } from "@/components/blocks/features-block"
import { FormBlock } from "@/components/blocks/form-block"
import { GridBlock } from "@/components/blocks/grid-block"
import { JobsBlock } from "@/components/blocks/jobs-block"
import { MilestonesBlock } from "@/components/blocks/milestones-block"
import { RelatedPostsBlock } from "@/components/blocks/related-posts-block"
import { StatsBlock } from "@/components/blocks/stats-block"
import { TeamBlock } from "@/components/blocks/team-block"
import { TestimonialsBlock } from "@/components/blocks/testimonials-block"
import { TextBlock } from "@/components/blocks/text-block"

import type { Locale } from "@/i18n/types"
import type { Page } from "@payload-types"

interface BlocksProps {
  blocks: Page["layout"]
  locale: Locale
}

export function Blocks({ blocks, locale }: BlocksProps) {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case "awards":
            return <AwardsBlock key={index} locale={locale} {...block} />
          case "grid":
            return <GridBlock key={index} locale={locale} {...block} />
          case "bento":
            return <BentoBlock key={index} locale={locale} {...block} />
          case "brand":
            return <BrandBlock key={index} locale={locale} {...block} />
          case "clients":
            return <ClientsBlock key={index} locale={locale} {...block} />
          case "cta":
            return <CtaBlock key={index} locale={locale} {...block} />
          case "faq":
            return <FAQBlock key={index} locale={locale} {...block} />
          case "features":
            return <FeaturesBlock key={index} locale={locale} {...block} />
          case "form":
            return <FormBlock key={index} locale={locale} {...block} />
          case "milestones":
            return <MilestonesBlock key={index} locale={locale} {...block} />
          case "prose":
            return <ProseBlock key={index} locale={locale} {...block} />
          case "relatedPosts":
            return <RelatedPostsBlock key={index} locale={locale} {...block} />
          case "stats":
            return <StatsBlock key={index} locale={locale} {...block} />
          case "testimonials":
            return <TestimonialsBlock key={index} locale={locale} {...block} />
          case "team":
            return <TeamBlock key={index} locale={locale} {...block} />
          case "jobs":
            return <JobsBlock key={index} locale={locale} {...block} />
          case "text":
            return <TextBlock key={index} locale={locale} {...block} />
        }
      })}
    </>
  )
}
