import { combineReducers } from "redux";
import { InitialState, ActionType } from "types";
import preloadedState from "redux/initialState";
import plugins from './plugins'
import tabdata from "./tabdata";
import tab from './tab'


export const reducers = {
  plugins,
  tabdata,
  tab
}


const rootReducer = combineReducers(reducers);

export default (
    initialState: InitialState,
    action: ActionType
  ): { [key: string]: any } => {
    const state = initialState || preloadedState;
    return {
      ...rootReducer(state as any, action),
    };
  };