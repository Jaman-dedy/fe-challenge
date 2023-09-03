import IFetchArgs from './IFetchArgs';
import DispatchType from './DispatchType';

export interface ApiAction extends IFetchArgs {
  params?: {[key: string]: string};
  onStart?: () => (
    dispatch: DispatchType,
  ) => void | boolean | Promise<void | boolean>;
  onSuccess?: (
    data?: {[key: string]: any} | [] | string[] | Array<[]>,
    meta?: {[key: string]: any},
  ) => (dispatch: DispatchType) => void | boolean | Promise<void | boolean>;
  onFailure?: (
    error?: any,
  ) => (dispatch: DispatchType) => void | boolean | Promise<void | boolean>;

  onEnd?: () => (
    dispatch: DispatchType,
  ) => void | boolean | Promise<void | boolean>;
}

export default ApiAction;
