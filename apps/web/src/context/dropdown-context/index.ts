import { createContext, useContext } from "react"

export type DropdownContextState = [show: boolean, setShow: (show: boolean) => void]

export const DropdownContext = createContext<DropdownContextState | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useDropdownContext = () => useContext(DropdownContext)!
