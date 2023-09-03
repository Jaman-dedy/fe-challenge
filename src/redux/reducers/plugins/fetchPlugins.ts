import { ActionType } from "types"
import {
  FETCH_PLUGINS_FAILURE,
  FETCH_PLUGINS_START,
  FETCH_PLUGINS_SUCCESS,
  FETCH_PLUGINS_CLEAR
} from "constants/action-types/plugins/fetchPlugins"
import IPlugins from "types/intial-states/IPlugins"

export default (
  state: IPlugins,
  { type, payload }: ActionType
): { [key: string]: any } | null => {
  switch (type) {
    case FETCH_PLUGINS_START:
      return {
        ...state,
        plugins: {
          ...state.plugins,
          loading: true,
          error: {
            ...state.plugins.error
          },
          success: false
        }
      }
    case FETCH_PLUGINS_FAILURE:
      return {
        ...state,
        plugins: {
          ...state.plugins,
          error: payload?.error,
          loading: false,
          success: false
        }
      }
    case FETCH_PLUGINS_CLEAR:
      return {
        ...state,
        plugins: {
          ...state.plugins,
          data: {},
          error: {},
          loading: false,
          success: false
        }
      }
    case FETCH_PLUGINS_SUCCESS:
      return {
        ...state,
        plugins: {
          ...state.plugins,
          data: payload || state.plugins.data,
          error: {},
          loading: false,
          success: true
        }
      }
    default:
      return null
  }
}
