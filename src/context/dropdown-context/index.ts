import { useContext, createContext } from "react"

export type DropdownContextState = [show: boolean, setShow: (show: boolean) => void]

export const DropdownContext = createContext<DropdownContextState | undefined>(undefined)

export const useDropdownContext = () => useContext(DropdownContext)!
