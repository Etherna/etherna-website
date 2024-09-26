import { cn } from "@/utils/classnames"

function BlogCategories({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("container py-12", className)} {...props}>
      {children}
    </ul>
  )
}

function BlogCategoriesItem({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn("text-lg", className)} {...props}>
      {children}
    </li>
  )
}

function BlogCategoriesLink({ className, children, ...props }: React.ComponentProps<"a">) {
  return (
    <a className={cn("text-lg", className)} {...props}>
      {children}
    </a>
  )
}

export { BlogCategories, BlogCategoriesItem, BlogCategoriesLink }
