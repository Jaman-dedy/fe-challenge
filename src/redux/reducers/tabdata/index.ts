import ActionType from 'types/ActionType'
import plugins from 'redux/initial-states/plugins'
import ITabdata from 'types/intial-states/ITabdata'
import fetchTabdata from './fetchTabdata'

export default (initialState: ITabdata, action: ActionType): ITabdata => {
  const state = initialState || plugins;

  return {
    ...state,
    ...fetchTabdata(state, action),
  };
};