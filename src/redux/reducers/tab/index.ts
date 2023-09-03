import ActionType from 'types/ActionType'
import plugins from 'redux/initial-states/plugins'
import ITab from 'types/intial-states/ITab'
import dispatchTab from './dispatchTab'

export default (initialState: ITab, action: ActionType): ITab => {
  const state = initialState || plugins;

  return {
    ...state,
    ...dispatchTab(state, action),
  };
};