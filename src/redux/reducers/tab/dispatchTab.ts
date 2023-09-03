import { ActionType } from "types"
import {
  DISPATCH_TAB_STATE
} from "constants/action-types/tab/dispatchTab"
import ITab from "types/intial-states/ITab"

export default (
  state: ITab,
  { type, payload }: ActionType
): { [key: string]: any } | null => {
  switch (type) {
    case DISPATCH_TAB_STATE:
      return {
        ...state,
        tab: {
          ...state.tab,
          data: payload || state.tab.data,
          error: {},
          loading: false,
          success: true
        }
      }
    default:
      return null
  }
}
