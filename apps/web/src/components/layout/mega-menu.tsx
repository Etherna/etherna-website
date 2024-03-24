import { Dropdown } from "@/components/common/dropdown"
import { cn } from "@/utils/classnames"

interface MegaMenuProps {
  children?: React.ReactNode
  toggleRender: React.ReactNode
  toggleClassName?: string
}

function MegaMenu({ children, toggleRender, toggleClassName }: MegaMenuProps) {
  return (
    <Dropdown
      toggleClass={cn("focus:shadow-transparent", toggleClassName)}
      toggleChildren={toggleRender}
      showChevron
    >
      <nav
        className={cn(
          "my-3 w-screen max-w-screen-md rounded-lg border border-gray-100 bg-white p-6 shadow-lg md:w-auto md:min-w-min"
        )}
      >
        {children}
      </nav>
    </Dropdown>
  )
}

function MegaMenuRow({ children }: { children?: React.ReactNode }) {
  return <div className="flex w-full flex-wrap">{children}</div>
}

export { MegaMenu, MegaMenuRow }
