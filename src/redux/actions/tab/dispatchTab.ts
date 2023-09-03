import {
   DISPATCH_TAB_STATE
} from "constants/action-types/tab/dispatchTab"
import { DispatchType } from "types"

export const dispatchTab = (dispatchAction: DispatchType, data: any): void => {
    dispatchAction({ type:DISPATCH_TAB_STATE, payload: data })
}
