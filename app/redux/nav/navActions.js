import { NavigationActions, StackActions } from "react-navigation";
import ACTIONS from "../../constants/ACTIONS";
import userBehavior from "../../utils/mixpanel-analytics";

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
    dispatch({ type: ACTIONS.SET_ACTIVE_SCREEN, payload: { screenName } });
  };
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

    userBehavior.navigated(routeName);
  };
}

/**
 * Navigates back
 */
function navigateBack(backScreenName) {
  return (dispatch, getState) => {
    const { activeScreen } = getState().nav;

    // If back button leads to Camera screens during KYC process, it should be skipped
    if (
      activeScreen === "KYCCheckPhotos" &&
      backScreenName === "ConfirmCamera"
    ) {
      _navigator.dispatch(
        NavigationActions.navigate({ routeName: "KYCAddressInfo" })
      );
    } else if (
      ["KTCTaxpayer"].indexOf(activeScreen) &&
      backScreenName === "ConfirmCamera"
    ) {
      _navigator.dispatch(
        NavigationActions.navigate({ routeName: "KYCAddressProof" })
      );
    } else if (backScreenName === "VerifyProfile") {
      // If back button leads to VerifyProfile, skip it and go back one more screen
      userBehavior.navigated("Back");
      _navigator.dispatch(StackActions.pop({ n: 2 }));
    } else {
      _navigator.dispatch(NavigationActions.back());
    }

    userBehavior.navigated(backScreenName);
  };
}

function resetToFlow(flow, params) {
  return () => {
    _navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: flow, params })],
      })
    );
  };
}
