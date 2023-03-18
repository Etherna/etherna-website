import Dropdown from "@/components/common/Dropdown"
import classNames from "@/utils/classnames"

type MenuProps = {
  children?: React.ReactNode
  toggleRender: React.ReactNode
  toggleClassName?: string
}

const Menu: React.FC<MenuProps> = ({ children, toggleRender, toggleClassName }) => {
  return (
    <Dropdown
      toggleClass={classNames("focus:shadow-transparent", toggleClassName)}
      toggleChildren={toggleRender}
      showChevron={true}
    >
      <nav
        className={classNames(
          "my-3 w-screen max-w-screen-md rounded-lg border border-gray-100 bg-white p-6 shadow-lg md:w-auto md:min-w-min"
        )}
      >
        {children}
      </nav>
    </Dropdown>
  )
}

const Row: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="flex w-full flex-wrap">{children}</div>
}

const MegaMenu = {
  Menu,
  Row,
}

export default MegaMenu
