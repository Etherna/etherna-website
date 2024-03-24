import { DropdownContext } from "."

import type { DropdownContextState } from "."

interface DropdownContextProviderProps {
  children?: React.ReactNode
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

export function DropdownContextProvider({
  children,
  showMenu,
  setShowMenu,
}: DropdownContextProviderProps) {
  const store: DropdownContextState = [showMenu, setShowMenu]

  return <DropdownContext.Provider value={store}>{children}</DropdownContext.Provider>
}
