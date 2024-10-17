import React from "react"
import { useStore } from "@nanostores/react"

import { ChevronDownIcon } from "lucide-react"

import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { t } from "@/i18n"
import { blogDictionary } from "@/i18n/dictionaries/blog"
import { cn } from "@/lib/utils"
import { $locale } from "@/stores/locale-store"

function BlogCategories({
  className,
  children,
  label,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement> & { label?: string }) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const locale = useStore($locale) ?? "en"

  React.useEffect(() => {
    if (isDesktop) {
      setOpen(false)
    }
  }, [isDesktop])

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger className={cn("md:hidden", className)} {...props} asChild>
          <Button className="rounded-full" variant={"secondary"}>
            {label || t(blogDictionary.allPosts, { locale })}
            <ChevronDownIcon className="ml-2 size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-2 p-4">{children}</DrawerContent>
      </Drawer>

      <nav className={cn("hidden flex-wrap items-center gap-2 md:flex", className)}>{children}</nav>
    </>
  )
}

function BlogCategoriesItem({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}

function BlogCategoriesLink({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "px-3 py-2 data-[active]:bg-primary data-[active]:font-semibold data-[active]:text-primary-foreground md:rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export { BlogCategories, BlogCategoriesItem, BlogCategoriesLink }
