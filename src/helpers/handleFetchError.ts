import {NETWORK_ERROR, UNEXPECTED_ERROR} from 'constants/errorMessages';

/**
 * @param {object} error
 * @returns {boolean} true if the token has expired otherwise false
 */
export default (
  error: any,
): {error?: string; message?: string; status?: number} => {
  try {
    if (error.data) {
      return {status: error?.status, ...error.data};
    }

    if (error instanceof Error) {
      return {
        status: (error as any)?.status || 500,
        error: String(error.message || UNEXPECTED_ERROR).replace(
          'TypeError:',
          '',
        ),
        message: String(error.message || UNEXPECTED_ERROR).replace(
          'TypeError:',
          '',
        ),
      };
    }

    return {
      status: error?.status || 500,
      error: UNEXPECTED_ERROR,
      message: UNEXPECTED_ERROR,
    };
  } catch (e) {
    return {
      status: error?.status || 500,
      error: NETWORK_ERROR,
      message: NETWORK_ERROR,
    };
  }
};
