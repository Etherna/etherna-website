import { Dispatch } from "react"

import { DropdownContextActions } from "@context/dropdown-context"

export type CommentsContextValue = [state: DropdownState, dispatch: Dispatch<DropdownContextActions>]

export interface DropdownState {

}
