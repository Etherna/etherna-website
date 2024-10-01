import React from "react"

import { ChevronDownIcon } from "lucide-react"

import { Logo } from "../assets/brand"
import { LocaleSwitcher } from "../common/locale-switcher"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Button } from "../ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { ScrollArea } from "../ui/scroll-area"
import { localized } from "@/lang/utils"
import { route } from "@/lib/routes"
import { cn } from "@/lib/utils"

import type { Locale, LocalizedPath } from "@/lang/types"
import type { Header } from "@payload-types"

interface HeaderProps extends React.ComponentProps<"header"> {
  path: string
  localizedPaths: LocalizedPath[]
  locale: Locale
  navItems: Header["navItems"]
}

export function Header({
  className,
  path,
  localizedPaths,
  locale,
  navItems,
  ...props
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <header className={cn("fixed top-4 z-10 flex w-full", className)} {...props}>
      <div className="container">
        <div
          className={cn(
            "flex h-14 flex-col rounded-[1.75rem] border bg-card/90 px-4 shadow-sm backdrop-blur transition-all duration-500",
            {
              "h-80 md:h-14": menuOpen,
            },
          )}
        >
          <div className="flex h-14 w-full shrink-0 items-center gap-4">
            <a href={localized(route("/"), locale)}>
              <Logo className="h-6" />
            </a>
            <div className="flex flex-1">
              <div className="mx-auto hidden md:flex">
                <NavMenu variant="desktop" path={path} navItems={navItems} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Button
                className={cn("h-6 overflow-hidden rounded-full bg-muted text-xs md:hidden", {
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground":
                    menuOpen,
                })}
                variant={"ghost"}
                size={"sm"}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <ChevronDownIcon
                  className={cn("mr-1 size-4 transition-transform", {
                    "rotate-180": menuOpen,
                  })}
                />
                Menu
              </Button>
              <LocaleSwitcher variant="compact" locale={locale} localizedPaths={localizedPaths} />
            </div>
          </div>

          <div className="w-full flex-1 overflow-hidden md:hidden">
            <NavMenu variant="mobile" path={path} navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  )
}

function NavMenu({
  variant,
  path,
  navItems,
}: {
  variant: "mobile" | "desktop"
  path: string
  navItems: Header["navItems"]
}) {
  return variant === "mobile" ? (
    <ScrollArea className="h-full">
      <div className="flex flex-col">
        {(navItems ?? []).map((navItem, i) => (
          <React.Fragment key={i}>
            {navItem.link.sublinks?.length ? (
              <Accordion type="single" collapsible>
                <AccordionItem value="link">
                  <AccordionTrigger className="py-0">
                    <MobileLink className="border-b-0">{navItem.link.label}</MobileLink>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-1">
                      {navItem.link.sublinks.map((sublink, i) => (
                        <a
                          key={i}
                          className={navigationMenuTriggerStyle()}
                          href={sublink.link.url ?? ""}
                          target={sublink.link.newTab ? "_blank" : undefined}
                        >
                          {sublink.link.label}
                        </a>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <MobileLink
                href={navItem.link.url ?? ""}
                target={navItem.link.newTab ? "_blank" : undefined}
                data-active={path.startsWith(navItem.link.url ?? "") || undefined}
              >
                {navItem.link.label}
              </MobileLink>
            )}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ) : (
    <NavigationMenu>
      <NavigationMenuList>
        {(navItems ?? []).map((navItem, i) => (
          <React.Fragment key={i}>
            {navItem.link.sublinks?.length ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  data-active={path.startsWith(navItem.link.url ?? "") || undefined}
                >
                  {navItem.link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {navItem.link.sublinks.map((sublink, i) => (
                      <NavigationMenuLink
                        key={i}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "h-auto w-full justify-start py-3",
                        )}
                        href={sublink.link.url ?? ""}
                        target={sublink.link.newTab ? "_blank" : undefined}
                        data-active={path.startsWith(sublink.link.url ?? "") || undefined}
                      >
                        {sublink.link.label}
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href={navItem.link.url ?? ""}
                  target={navItem.link.newTab ? "_blank" : undefined}
                  data-active={path.startsWith(navItem.link.url ?? "") || undefined}
                >
                  {navItem.link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </React.Fragment>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileLink({ href, className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "flex h-11 w-full justify-start border-b px-0 py-3 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50",
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </a>
  )
}
