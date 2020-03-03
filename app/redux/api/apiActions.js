import ACTIONS from '../../constants/ACTIONS';

export {
  startApiCall,
  apiError,
}

/**
 * Called before every api call
 * @param {string} callName - call from API.js
 * @returns {Object} - Action
 */
function startApiCall(callName) {
  return {
    type: ACTIONS.START_API_CALL,
    callName,
  }
}

/**
 * Sets the api error
 * @param {string} callName - call from API.js
 * @param {Object} error - error caught in promise
 * @returns {Object} - Action
 */
function apiError(callName, error) {
  return dispatch => {

    const errTimeout = setTimeout(() => {
      dispatch(clearApiError());
      clearTimeout(errTimeout);
    }, 5000);

    dispatch({
      type: ACTIONS.API_ERROR,
      callName,
      error,
    })
  }
}

/**
 * Clears API error
 * @returns {Object} - Action
 */
function clearApiError() {
  return {
    type: ACTIONS.CLEAR_API_ERROR,
  }
}
