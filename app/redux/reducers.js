import { combineReducers } from 'redux';

import api from './api/apiReducer';
import ui from './ui/uiReducer';
import user from './user/userReducer';
import generalData from './generalData/generalDataReducer';
import wallet from './wallet/walletReducer';
import branch from './branch/branchReducer';
import transfers from './transfers/transfersReducer';
import loans from './loans/loansReducer';
import apiKeys from './apiKeys/apiKeysReducer';
import app from './app/appReducer';
import ACTIONS from "../constants/ACTIONS";
import camera from './camera/cameraReducer';
import forms from './forms/formsReducer';
import currencies from './currencies/currenciesReducer';
import transactions from './transactions/transactionsReducer';
import graph from './graph/graphReducer';
import nav from './nav/navReducer'
import community from './community/communityReducer';
import compliance from './compliance/complianceReducer';
// NOTE(fj): plop reduxGen importing new Reducer here

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
  // NOTE(fj): plop reduxGen inserting new Reducer here
})

function rootReducer(state, action) {
  let newState = state;
  if (action.type === ACTIONS.RESET_APP) newState = undefined;
  if (action.type === ACTIONS.LOGOUT_USER) newState = undefined;
  return appReducers(newState, action)
}

export default rootReducer;

