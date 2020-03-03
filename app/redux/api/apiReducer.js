import ACTIONS from '../../constants/ACTIONS';

/**
 * TODO make it a function add JSDoc & desc for return
 */
const initialState = {
  callsInProgress: [],
  error: undefined,
  lastCompletedCall: undefined,
  history: [],
};

export default (state = initialState, action) => {
  const callsInProgress = [...state.callsInProgress];
  const history = [...state.history];
  let callName


  if (action.type === ACTIONS.START_API_CALL) {
    callsInProgress.push(action.callName);
    return {
      ...state,
      callsInProgress,
    }
  }

  // Finish api call and attach an error
  if (action.type === ACTIONS.API_ERROR) {
    callsInProgress.splice(callsInProgress.indexOf(action.callName), 1);
    history.unshift(`${action.callName}_ERROR`);
    return {
      ...state,
      callsInProgress,
      error: action.error,
      history,
    }
  }

  // Clear Api errors
  if (action.type === ACTIONS.CLEAR_API_ERROR) {
    return {
      ...state,
      error: undefined,
    }
  }

  // Finish successful api call
  if (action.type.includes('_SUCCESS') || action.type === ACTIONS.TAKE_CAMERA_PHOTO) {
    callName = action.callName || action.type.slice(0, -8)
    callsInProgress.splice(callsInProgress.indexOf(callName), 1);
    history.unshift(`${callName}_SUCCESS`);
    return {
      ...state,
      callsInProgress,
      lastCompletedCall: callName,
      history,
    }
  }

  // Return unchanged state
  return state;
}
