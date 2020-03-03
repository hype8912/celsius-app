import Branch from "react-native-branch";

import store from '../redux/store';
import * as actions from "../redux/actions";
import logger from '../utils/logger-util';

export default {
  initBranch,
  getReferralId, // TODO not needed anymore, referralLinkId is removed
}

/**
 * Initialize & Subscribe to Branch
 */
function initBranch() {
  return async dispatch => {
    try {
      Branch.subscribe((deepLink) => {
        // Use for standalone debugging
        // logger.logme(deepLink)
  
        if (!deepLink || !deepLink.params["+clicked_branch_link"] || deepLink.error || !deepLink.params) return;
        dispatch(actions.registerBranchLink(deepLink));
      });
    } catch (error) {
      logger.err(error)
    }
  }
}


/**
 * Gets the id of the referral the user used for registrations. handles branch link and manual entering of code
 */
function getReferralId() {
  const registeredLink = store.getState().branch.registeredLink;
  const referralLinkId = store.getState().branch.referralLinkId;

  return registeredLink ? registeredLink.id : referralLinkId
}
