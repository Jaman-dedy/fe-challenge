import {
    FETCH_TABDATA_FAILURE,
    FETCH_TABDATA_START,
    FETCH_TABDATA_SUCCESS,
    FETCH_TABDATA_CLEAR
  } from "constants/action-types/tabdata/fetchTabdata"
  import { DispatchType } from "types"
  import apiAction from "helpers/apiAction"
  
  export const clearAction = (dispatchAction: DispatchType): void => {
    dispatchAction({ type: FETCH_TABDATA_CLEAR })
  }
  
  export default (onSuccess?: () => void) =>
    async (dispatchAction: DispatchType): Promise<void> => {
      dispatchAction(
        apiAction({
          method: "GET",
          url: '/tabdata',
          onStart:
            () =>
            (dispatch): void => {
              clearAction(dispatchAction)
              dispatch({ type: FETCH_TABDATA_START })
            },
          onSuccess:
            (res: any) =>
            async (dispatch): Promise<void> => {
              dispatch({ type: FETCH_TABDATA_SUCCESS, payload: res })
  
              if (typeof onSuccess === "function") {
                onSuccess()
              }
            },
  
          onFailure:
            err =>
            async (dispatch): Promise<void> => {
              dispatch({
                type: FETCH_TABDATA_FAILURE,
                payload: { error: err }
              })
            }
        })
      )
    }
  