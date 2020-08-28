import ACTIONS from "../../constants/ACTIONS";
import { DEEP_LINKS } from "../../constants/DATA";
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
    const user = getState().user.profile;
    if (deepLinkData) {
      if (!deepLinkData.type) return;

      dispatch({ type: ACTIONS.DEEPLINK_HANDLED });

      switch (deepLinkData.type) {
        case DEEP_LINKS.NAVIGATE_TO:
          if (!user.id) return;

          dispatch(actions.resetToScreen(deepLinkData.screen));
          dispatch(actions.clearDeepLinkData());
          return;

        case DEEP_LINKS.TRANSFER:
        case DEEP_LINKS.INDIVIDUAL_REFERRAL:
        case DEEP_LINKS.COMPANY_REFERRAL:
          dispatch(actions.registerBranchLink(deepLinkData));
          return;

        default:
          return;
      }
    }
    return;
  };
}

function clearDeepLinkData() {
  return {
    type: ACTIONS.CLEAR_DEEPLINK_DATA,
  };
}
