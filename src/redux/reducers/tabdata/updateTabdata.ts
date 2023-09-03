import { ActionType } from "types"
import {
  UPDATE_TABDATA_FAILURE,
  UPDATE_TABDATA_START,
  UPDATE_TABDATA_SUCCESS,
  UPDATE_TABDATA_CLEAR
} from "constants/action-types/tabdata/updateTabdata copy"
import ITabdata from "types/intial-states/ITabdata"

export default (
  state: ITabdata,
  { type, payload }: ActionType
): { [key: string]: any } | null => {
  switch (type) {
    case UPDATE_TABDATA_START:
      return {
        ...state,
        tabdata: {
          ...state.tabdata,
          loading: true,
          error: {
            ...state.tabdata.error
          },
          success: false
        }
      }
    case UPDATE_TABDATA_FAILURE:
      return {
        ...state,
        tabdata: {
          ...state.tabdata,
          error: payload?.error,
          loading: false,
          success: false
        }
      }
    case UPDATE_TABDATA_CLEAR:
      return {
        ...state,
        tabdata: {
          ...state.tabdata,
          data: {},
          error: {},
          loading: false,
          success: false
        }
      }
    case UPDATE_TABDATA_SUCCESS:
      return {
        ...state,
        tabdata: {
          ...state.tabdata,
          data: payload || state.tabdata.data,
          error: {},
          loading: false,
          success: true
        }
      }
    default:
      return null
  }
}
