import Branch from "react-native-branch";

import store from "../redux/store";
import mixpanelAnalytics from "./mixpanel-analytics";
import { addDeepLinkData, handleDeepLink } from "./deepLink-util";

export default {
  initBranch,
  getReferralId, // TODO not needed anymore, referralLinkId is removed
};

/**
 * Initialize & Subscribe to Branch
 */
function initBranch() {
    try {
      Branch.subscribe(async deepLink => {
        if (
          !deepLink ||
          !deepLink.params["+clicked_branch_link"] ||
          deepLink.error ||
          !deepLink.params
        ) {
          return;
        }

        const deepLinkData = {
          ...deepLink,
          type: deepLink.params.type || deepLink.params.link_type,
        };
        await addDeepLinkData(deepLinkData)
        await handleDeepLink()
      });
    } catch (error) {
      mixpanelAnalytics.logError("branchUtil.initBranch", error);
    }
}

/**
 * Gets the id of the referral the user used for registrations. handles branch link and manual entering of code
 */
function getReferralId() {
  const registeredLink = store.getState().branch.registeredLink;
  const referralLinkId = store.getState().branch.referralLinkId;

  return registeredLink ? registeredLink.id : referralLinkId;
}
