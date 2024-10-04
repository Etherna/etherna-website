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

import type { Page } from "@payload-types"

interface BlocksProps {
  blocks: Page["layout"]
}

export function Blocks({ blocks }: BlocksProps) {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case "awards":
            return <AwardsBlock key={index} {...block} />
          case "grid":
            return <GridBlock key={index} {...block} />
          case "bento":
            return <BentoBlock key={index} {...block} />
          case "brand":
            return <BrandBlock key={index} {...block} />
          case "clients":
            return <ClientsBlock key={index} {...block} />
          case "cta":
            return <CtaBlock key={index} {...block} />
          case "faq":
            return <FAQBlock key={index} {...block} />
          case "features":
            return <FeaturesBlock key={index} {...block} />
          case "form":
            return <FormBlock key={index} {...block} />
          case "milestones":
            return <MilestonesBlock key={index} {...block} />
          case "relatedPosts":
            return <RelatedPostsBlock key={index} {...block} />
          case "stats":
            return <StatsBlock key={index} {...block} />
          case "testimonials":
            return <TestimonialsBlock key={index} {...block} />
          case "team":
            return <TeamBlock key={index} {...block} />
          case "jobs":
            return <JobsBlock key={index} {...block} />
          case "text":
            return <TextBlock key={index} {...block} />
        }
      })}
    </>
  )
}
