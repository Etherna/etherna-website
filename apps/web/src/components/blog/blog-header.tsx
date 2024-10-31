import { cn } from "@/lib/utils"

function BlogContent({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("mb-12 flex flex-col gap-12", className)} {...props}>
      {children}
    </section>
  )
}

function BlogHeader({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header className={cn("pt-24", className)} {...props}>
      <div className="container flex flex-col items-start gap-4 py-6 md:gap-8">{children}</div>
    </header>
  )
}

function BlogTitle({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-4xl font-bold text-gradient", className)} {...props}>
      {children}
    </h1>
  )
}

export { BlogContent, BlogHeader, BlogTitle }
