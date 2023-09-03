import {
    FETCH_PLUGINS_FAILURE,
    FETCH_PLUGINS_START,
    FETCH_PLUGINS_SUCCESS,
    FETCH_PLUGINS_CLEAR
  } from "constants/action-types/plugins/fetchPlugins"
  import { DispatchType } from "types"
  import apiAction from "helpers/apiAction"
  
  export const clearAction = (dispatchAction: DispatchType): void => {
    dispatchAction({ type: FETCH_PLUGINS_CLEAR })
  }
  
  export default (onSuccess?: () => void) =>
    async (dispatchAction: DispatchType): Promise<void> => {
      dispatchAction(
        apiAction({
          method: "GET",
          url: '/plugins',
          onStart:
            () =>
            (dispatch): void => {
              clearAction(dispatchAction)
              dispatch({ type: FETCH_PLUGINS_START })
            },
          onSuccess:
            (res: any) =>
            async (dispatch): Promise<void> => {
              dispatch({ type: FETCH_PLUGINS_SUCCESS, payload: res })
  
              if (typeof onSuccess === "function") {
                onSuccess()
              }
            },
  
          onFailure:
            err =>
            async (dispatch): Promise<void> => {
              dispatch({
                type: FETCH_PLUGINS_FAILURE,
                payload: { error: err }
              })
            }
        })
      )
    }
  