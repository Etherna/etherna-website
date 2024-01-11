import { cn } from "@/utils/classnames"
import { routes } from "@/utils/routes"

import type { Category } from "@/schema/app"
import type { Lang } from "@/utils/lang"

interface CategoryBadgeProps {
  className?: string
  category: Category
  lang: Lang
}

export function CategoryBadge({ className, category, lang }: CategoryBadgeProps) {
  return (
    <a href={routes.blogCategoryPath(category.slug, lang)} className={className}>
      <div
        className={cn(
          "mb-3 inline-block rounded-full px-2",
          "border border-gray-600/50 text-xs font-medium text-white hover:bg-gray-200",
          "transition-colors duration-500"
        )}
        style={{ backgroundColor: category.color ?? undefined }}
      >
        {category.name}
      </div>
    </a>
  )
}
