
import {DispatchType, ApiAction} from 'types';
import {API_REQUEST} from 'constants/action-types/apiActions';
import fetchHelper from 'helpers/fetchHelper';
import handleFetchError from 'helpers/handleFetchError';

type ActionType = {
  type: string;
  payload: ApiAction;
};

let currentActions = [] as Array<{url: string; action: ActionType}>;
const pendingActions = [] as Array<{url: string; action: ActionType}>;

const processAction = async (
  dispatch: DispatchType,
  next: DispatchType,
  action: ActionType,
) => {
  const {type, payload = {} as Record<string, any>} = action || {};

  try {
    if (type !== API_REQUEST) {
      next(action);
      return;
    }
    if (!payload.url) {
      return;
    }
    currentActions.push({url: payload.url, action});

    if (typeof payload?.onStart === 'function') {
      await payload.onStart()(dispatch);
    }

    const {data, meta} = await fetchHelper({
      method: payload.method,
      url: payload.url,
      data: payload.data,
      resType: payload.resType,
      options: payload.options,
      params: payload.params,
      headers: payload.headers,
    });
    if (typeof payload?.onSuccess === 'function') {
      if (meta) {
        await payload.onSuccess(data, meta)(dispatch);
      } else {
        await payload.onSuccess(data)(dispatch);
      }
    }
  } catch (e: any) {
    const error = handleFetchError(e) as {[key: string]: string} | any;

    if (typeof payload?.onFailure === 'function') {
      await payload.onFailure(error)(dispatch);
    }
  }
  if (typeof payload?.onEnd === 'function') {
    await payload.onEnd()(dispatch);
  }

  currentActions = currentActions.filter(({url}) => url !== payload.url);
  if (pendingActions.length) {
    const {action: action_} = pendingActions.shift() || {};
    if (action_) {
      setTimeout(() => {
        processAction(dispatch, next, action_);
      }, 1000);
    }
  }
};

export default ({dispatch}: {dispatch: DispatchType}) =>
  (next: DispatchType) =>
  async (action: ActionType): Promise<void> => {
    await processAction(dispatch, next, action);
  };
