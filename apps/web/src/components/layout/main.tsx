import { cn } from "@/lib/utils"

export function Main({ className, children, ...props }: React.ComponentProps<"main">) {
  return (
    <main className={cn("flex min-h-dvh flex-col", className)} {...props}>
      {children}
    </main>
  )
}
