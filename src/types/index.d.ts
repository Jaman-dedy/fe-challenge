declare global {
  namespace NodeJS {
    interface Global {
      HermesInternal: string;
    }
  }
}

export type ActionType = import('./ActionType').default;
export {default as InitialState} from './initial-states';
export type DispatchType = import('./DispatchType').default;
export {default as ApiAction} from './IApiAction';
export {default as IState} from './initial-states/IState';
