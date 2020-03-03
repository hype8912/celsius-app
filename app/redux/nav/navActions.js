import { NavigationActions, StackActions } from 'react-navigation';
import ACTIONS from '../../constants/ACTIONS'
import analytics from "../../utils/analytics";

let _navigator;

export {
  navigateTo,
  navigateBack,
  setTopLevelNavigator,
  setActiveScreen,
  resetToFlow,
};


/**
 * TODO add JSDoc
 */
function setActiveScreen(screenName) {
  return dispatch => {
      dispatch({type: ACTIONS.SET_ACTIVE_SCREEN, payload: {screenName}})
  }
}


/**
 * Sets _navigator
 * @param {Object} navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}


/**
 * Navigates to a screen
 * @param {string} routeName - name of the screen
 * @param {Object} params - parameters for the next screen
 */
function navigateTo(routeName, params) {
  return () => {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );

    analytics.navigated(routeName)
  }
}

/**
 * Navigates back
 */
function navigateBack(backScreenName) {
  return () => {

    // If back button leads to VerifyProfile, skip it and go back one more screen
    if (backScreenName === 'VerifyProfile') {
      analytics.navigated('Back')
      // n: 2 indicates we want to navigate 2 screens back
      // return () => {
        _navigator.dispatch(
          StackActions.pop({ n: 2 })
        )
      // }
    }

    analytics.navigated(backScreenName)
    // return () => {
      _navigator.dispatch(
        NavigationActions.back()
      );
//    }
  }
}

function resetToFlow(flow) {
  return () => {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: flow })
        ]
      })
    )
  }
}
