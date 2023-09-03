import IPlugins from "./IPlugins"
import ITabdata from './ITabdata'
import ITab from './ITab'

interface InitialState {
  plugins: IPlugins;
  tabdata: ITabdata;
  tab: ITab;
}

export default InitialState
