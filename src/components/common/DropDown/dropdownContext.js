import React, { useContext, createContext } from "react"

const DropdownContext = createContext()

export const DropdownContextProvider = ({ children, showMenu, setShowMenu }) => {
  const store = [showMenu, setShowMenu]

  return (
    <DropdownContext.Provider value={store}>
      {children}
    </DropdownContext.Provider>
  )
}

export const useDropdownContext = () => useContext(DropdownContext)
