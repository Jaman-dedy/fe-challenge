import {
    UPDATE_TABDATA_FAILURE,
    UPDATE_TABDATA_START,
    UPDATE_TABDATA_SUCCESS,
    UPDATE_TABDATA_CLEAR
  } from "constants/action-types/tabdata/updateTabdata copy"
  import { DispatchType } from "types"
  import apiAction from "helpers/apiAction"
  
  export const clearAction = (dispatchAction: DispatchType): void => {
    dispatchAction({ type: UPDATE_TABDATA_CLEAR })
  }
  
  export default (data: any, onSuccess?: () => void) =>
    async (dispatchAction: DispatchType): Promise<void> => {
      dispatchAction(
        apiAction({
          method: "PUT",
          url: `/tabdata/${data?.title}`,
          data,
          onStart:
            () =>
            (dispatch): void => {
              clearAction(dispatchAction)
              dispatch({ type: UPDATE_TABDATA_START })
            },
          onSuccess:
            (res: any) =>
            async (dispatch): Promise<void> => {
              dispatch({ type: UPDATE_TABDATA_SUCCESS, payload: res })
  
              if (typeof onSuccess === "function") {
                onSuccess()
              }
            },
  
          onFailure:
            err =>
            async (dispatch): Promise<void> => {
              dispatch({
                type: UPDATE_TABDATA_FAILURE,
                payload: { error: err }
              })
            }
        })
      )
    }
  