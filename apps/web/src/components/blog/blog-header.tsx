import { cn } from "@/lib/utils"

function BlogHeader({ className, children, ...props }: React.ComponentProps<"header">) {
  return (
    <header className={cn("container py-12", className)} {...props}>
      {children}
    </header>
  )
}

function BlogTitle({ className, children, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1 className={cn("text-4xl font-bold", className)} {...props}>
      {children}
    </h1>
  )
}

export { BlogHeader, BlogTitle }
