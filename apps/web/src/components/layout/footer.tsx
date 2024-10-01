import React from "react"

import { Logo } from "../assets/brand"
import { LocaleSwitcher } from "../common/locale-switcher"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

import type { Locale, LocalizedPath } from "@/lang/types"
import type { Footer } from "@payload-types"

type FooterGroups = NonNullable<Footer["groups"]>
type FooterGroup = FooterGroups[number]
type FooterLegalLinks = NonNullable<Footer["legalLinks"]>

interface FooterProps extends React.ComponentProps<"footer"> {
  locale: Locale
  localizedPaths: LocalizedPath[]
  groups: FooterGroups
  legalLinks: FooterLegalLinks
  companyName: string
}

export function Footer({
  className,
  locale,
  localizedPaths,
  groups,
  legalLinks,
  companyName,
  ...props
}: FooterProps) {
  return (
    <footer className={cn("bg-background pb-8 pt-16", className)} {...props}>
      <div className="container flex flex-col gap-10 md:gap-16">
        <h2 className="sr-only">Footer</h2>
        <FooterRowHeader />
        <FooterRowGroups groups={groups ?? []} locale={locale} />
        <FooterRowLegal
          legalLinks={legalLinks ?? []}
          locale={locale}
          localizedPaths={localizedPaths}
        />
        <FooterRowFootnotes companyName={companyName} />
      </div>
    </footer>
  )
}

function FooterRowHeader({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col items-start", className)} {...props}>
      <Logo className="dark h-7 opacity-50 brightness-0" />
      {children}
    </div>
  )
}

function FooterRowGroups({
  className,
  groups,
  ...props
}: React.ComponentProps<"ul"> & { groups: FooterGroups; locale: Locale }) {
  const [value, setValue] = React.useState<string[]>([])
  const isLargeScreen = useMediaQuery("(min-width: 768px)")

  React.useEffect(() => {
    if (isLargeScreen) {
      setValue(groups.map((group) => group.id ?? group.title))
    } else {
      setValue([])
    }
  }, [isLargeScreen, groups])

  return (
    <Accordion type="multiple" value={value} onValueChange={setValue} asChild>
      <ul
        className={cn("flex flex-col gap-8 md:flex-row md:justify-between", className)}
        {...props}
      >
        {groups.map((group, index) => (
          <FooterRowGroup key={index} group={group} />
        ))}
      </ul>
    </Accordion>
  )
}

function FooterRowGroup({
  className,
  group,
  ...props
}: React.ComponentProps<"li"> & { group: FooterGroup }) {
  const isLargeScreen = useMediaQuery("(min-width: 768px)")

  return (
    <AccordionItem value={group.id ?? group.title} asChild>
      <li className={cn("md:border-b-0", className)} {...props}>
        <AccordionTrigger
          className={cn("pt-0 text-sm text-secondary-foreground md:pb-0 [&_svg]:md:hidden", {
            "pointer-events-none": isLargeScreen,
          })}
          asChild
        >
          {group.title}
        </AccordionTrigger>
        <AccordionContent asChild>
          <ul className="mt-2 flex flex-col">
            {group.groupItems?.map((item, index) => (
              <li key={index}>
                <FooterRowLink href={item.link.url ?? ""}>{item.link.label}</FooterRowLink>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </li>
    </AccordionItem>
  )
}

function FooterRowLegal({
  children,
  className,
  legalLinks,
  locale,
  localizedPaths,
  ...props
}: React.ComponentProps<"div"> & {
  legalLinks: FooterLegalLinks
  locale: Locale
  localizedPaths: LocalizedPath[]
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8",
        className,
      )}
      {...props}
    >
      <LocaleSwitcher locale={locale} localizedPaths={localizedPaths} />
      <h2 className="sr-only">Legal</h2>
      <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        {legalLinks.map((link, index) => (
          <li key={index}>
            <FooterRowLink href={link.link.url ?? ""}>{link.link.label}</FooterRowLink>
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

function FooterRowLink({ children, className, href }: React.ComponentProps<"a">) {
  return (
    <a
      href={href}
      className={cn("text-sm text-muted-foreground/60 hover:text-muted-foreground/100", className)}
    >
      {children}
    </a>
  )
}

function FooterRowFootnotes({
  className,
  companyName,
  ...props
}: React.ComponentProps<"div"> & { companyName: string }) {
  return (
    <div className={cn("text-xs font-light text-muted-foreground/60", className)} {...props}>
      Copyright© {new Date().getFullYear()} {companyName}. All rights reserved.
    </div>
  )
}
