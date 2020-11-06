import { combineReducers } from "redux";

import api from "./api/apiReducer";
import ui from "./ui/uiReducer";
import user from "./user/userReducer";
import generalData from "./generalData/generalDataReducer";
import wallet from "./wallet/walletReducer";
import branch from "./campaign/campaignReducer";
import transfers from "./transfers/transfersReducer";
import loans from "./loans/loansReducer";
import apiKeys from "./apiKeys/apiKeysReducer";
import app from "./app/appReducer";
import ACTIONS from "../constants/ACTIONS";
import camera from "./camera/cameraReducer";
import forms from "./forms/formsReducer";
import currencies from "./currencies/currenciesReducer";
import transactions from "./transactions/transactionsReducer";
import graph from "./graph/graphReducer";
import nav from "./nav/navReducer";
import community from "./community/communityReducer";
import compliance from "./compliance/complianceReducer";
import kyc from "./kyc/kycReducer";
import contacts from "./contacts/contactsReducer";
import loyalty from "./loyalty/loyaltyReducer";
import security from "./userSecurity/userSecurityReducer";
import biometrics from "./biometrics/biometricsReducer";
import auth from "./userAuth/userAuthReducer";
import hodl from "./hodl/hodlReducer";
import animations from "./animations/animationsReducer";
import deepLink from "./deepLink/deepLinkReducer";
import buyCoins from "./buyCoins/buyCoinsReducer";
import Constants from "../../constants";
// NOTE(fj): plop reduxGen importing new Reducer here

const { STORYBOOK } = Constants;

const appReducers = combineReducers({
  api,
  user,
  ui,
  generalData,
  wallet,
  branch,
  transfers,
  loans,
  apiKeys,
  app,
  camera,
  forms,
  currencies,
  transactions,
  graph,
  nav,
  community,
  compliance,
  kyc,
  contacts,
  loyalty,
  security,
  biometrics,
  auth,
  hodl,
  animations,
  deepLink,
  buyCoins,
  // NOTE(fj): plop reduxGen inserting new Reducer here
});

function rootReducer(state, action) {
  let newState = state;
  const newAction = action;
  if (action.type === ACTIONS.RESET_APP) newState = undefined;
  if (action.type === ACTIONS.LOGOUT_USER) newState = undefined;
  if (action.type === ACTIONS.SET_WHOLE_STATE) newState = action.state;

  // ignore all actions when in Storybook mode
  const enabledActions = [ACTIONS.SET_WHOLE_STATE];
  if (STORYBOOK && !enabledActions.includes(action.type)) {
    newAction.true = action.type;
    newAction.type = ACTIONS.BLOCKED_ACTION;
  }

  return appReducers(newState, action);
}

export default rootReducer;
