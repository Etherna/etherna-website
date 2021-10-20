import React from "react"

import { DropdownContext, DropdownContextState } from "."

type DropdownContextProviderProps = {
  showMenu: boolean
  setShowMenu: (show: boolean) => void
}

const DropdownContextProvider: React.FC<DropdownContextProviderProps> = ({
  children,
  showMenu,
  setShowMenu
}) => {
  const store: DropdownContextState = [showMenu, setShowMenu]

  return (
    <DropdownContext.Provider value={store}>
      {children}
    </DropdownContext.Provider>
  )
}

export default DropdownContextProvider
