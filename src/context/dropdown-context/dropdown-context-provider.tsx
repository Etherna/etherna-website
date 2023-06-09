import { DropdownContext } from "."

import type { DropdownContextState } from "."

type DropdownContextProviderProps = {
  children?: React.ReactNode
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

const DropdownContextProvider: React.FC<DropdownContextProviderProps> = ({
  children,
  showMenu,
  setShowMenu,
}) => {
  const store: DropdownContextState = [showMenu, setShowMenu]

  return <DropdownContext.Provider value={store}>{children}</DropdownContext.Provider>
}

export default DropdownContextProvider
