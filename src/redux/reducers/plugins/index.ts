import ActionType from 'types/ActionType'
import plugins from 'redux/initial-states/plugins'
import IPlugins from 'types/intial-states/IPlugins'
import fetchPlugins from './fetchPlugins'

export default (initialState: IPlugins, action: ActionType): IPlugins => {
  const state = initialState || plugins;

  return {
    ...state,
    ...fetchPlugins(state, action),
  };
};