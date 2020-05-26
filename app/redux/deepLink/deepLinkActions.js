import ACTIONS from "../../constants/ACTIONS";
import { BRANCH_LINKS } from "../../constants/DATA";
import * as actions from "../actions";

export { addDeepLinkData, handleDeepLink, clearDeepLinkData };

function addDeepLinkData(deepLinkData) {
  return {
    type: ACTIONS.ADD_DEEPLINK_DATA,
    deepLinkData,
  };
}

function handleDeepLink() {
  return (dispatch, getState) => {
    const { deepLinkData } = getState().deepLink;
    dispatch({ type: ACTIONS.DEEPLINK_HANDLED });

    switch (deepLinkData.type) {
      case BRANCH_LINKS.NAVIGATE_TO:
        dispatch(actions.resetToScreen(deepLinkData.screen));
        dispatch(actions.clearDeepLinkData());
        return;
      default:
        return;
    }
  };
}

function clearDeepLinkData() {
  return {
    type: ACTIONS.CLEAR_DEEPLINK_DATA,
  };
}
