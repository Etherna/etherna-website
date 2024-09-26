import { cn } from "@/lib/utils"

export function Body({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex min-h-screen flex-col", className)} {...props}>
      {children}
    </div>
  )
}
