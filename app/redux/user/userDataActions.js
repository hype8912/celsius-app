import _ from "lodash";
import moment from "moment";

import ACTIONS from "../../constants/ACTIONS";
import API from "../../constants/API";
import { apiError, startApiCall } from "../api/apiActions";
import { showMessage, closeModal } from "../ui/uiActions";
import { setFormErrors, updateFormField } from "../forms/formsActions";
import apiUtil from "../../utils/api-util";
import userDataService from "../../services/user-data-service";
import {
  getUserKYCStatus,
  isUserLoggedIn,
} from "../../utils/user-util/user-util";
import { KYC_STATUSES } from "../../constants/DATA";
import interestUtil from "../../utils/interest-util";
import { SCREENS } from "../../constants/SCREENS";
import { navigateTo } from "../nav/navActions";

export {
  getUserAppSettings,
  setUserAppSettings,
  getLinkedBankAccount,
  linkBankAccount,
  setHodlProps,
  getUserStatus,
  getUserAppBootstrap,
};

/**
 * Get linked bank account info
 */
function getLinkedBankAccount() {
  return async dispatch => {
    dispatch(startApiCall(API.GET_LINKED_BANK_ACCOUNT));

    try {
      const res = await userDataService.getLinkedBankAccount();
      dispatch({
        type: ACTIONS.GET_LINKED_BANK_ACCOUNT_SUCCESS,
        bankAccountInfo: res.data,
      });
    } catch (err) {
      dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.GET_LINKED_BANK_ACCOUNT, err));
    }
  };
}

/**
 * Set Bank account info
 *
 * @param {Object} bankAccountInfo
 * @param {string} bankAccountInfo.bank_name
 * @param {string} bankAccountInfo.bank_routing_number
 * @param {string} bankAccountInfo.account_type
 * @param {string} bankAccountInfo.bank_account_number
 * @param {string} bankAccountInfo.swift
 * @param {string} bankAccountInfo.iban
 * @param {string} bankAccountInfo.location
 */
function linkBankAccount(bankAccountInfo) {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.LINK_BANK_ACCOUNT));
      const bankRes = await userDataService.linkBankAccount(bankAccountInfo);
      dispatch({ type: ACTIONS.LINK_BANK_ACCOUNT_SUCCESS });
      dispatch(updateFormField("bankInfo", bankRes.data));
      dispatch(navigateTo(SCREENS.CONFIRM_YOUR_LOAN));
    } catch (err) {
      if (err.status === 422) {
        dispatch(setFormErrors(apiUtil.parseValidationErrors(err)));
      } else {
        dispatch(showMessage("error", err.msg));
      }
      dispatch(apiError(API.LINK_BANK_ACCOUNT, err));
    }
  };
}

/**
 * Gets app settings for user
 */
function getUserAppSettings() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_APP_SETTINGS));
      const userAppData = await userDataService.getUserAppSettings();
      dispatch({
        type: ACTIONS.GET_APP_SETTINGS_SUCCESS,
        userAppData: userAppData.data,
      });
    } catch (e) {
      dispatch(apiError(API.GET_APP_SETTINGS, e));
      dispatch(showMessage("error", e.msg));
    }
  };
}

/**
 * Sets app settings for user
 *
 * @param {Object} data
 * @param {boolean} data.interest_in_cel
 */
function setUserAppSettings(data) {
  return async (dispatch, getState) => {
    try {
      dispatch(startApiCall(API.SET_APP_SETTINGS));
      const appSettings = getState().user.appSettings;

      const newData = { ...data };

      // Stringify JSON payloads
      if (newData.interest_in_cel_per_coin) {
        newData.interest_in_cel_per_coin = JSON.stringify(
          newData.interest_in_cel_per_coin
        );
      }
      if (newData.user_triggered_actions) {
        newData.user_triggered_actions = JSON.stringify(
          newData.user_triggered_actions
        );
      }

      const userAppData = await userDataService.setUserAppSettings(newData);
      const newSettings = userAppData.data;

      dispatch({
        type: ACTIONS.SET_APP_SETTINGS_SUCCESS,
        userAppData: newSettings,
      });

      const currentDate = moment.utc();

      const newDataKeys = Object.keys(newData);

      if (
        newDataKeys.includes("interest_in_cel") ||
        newDataKeys.includes("interest_in_cel_per_coin")
      ) {
        const coins = Object.keys(newSettings.interest_in_cel_per_coin);

        const changedCoins = [];
        const coinsInCel = [];

        coins.forEach(c => {
          if (newSettings.interest_in_cel_per_coin[c]) {
            coinsInCel.push(c);
          }

          if (
            newSettings.interest_in_cel_per_coin[c] !==
            appSettings.interest_in_cel_per_coin[c]
          ) {
            changedCoins.push(c);
          }
        });
        if (newSettings.interest_in_cel !== appSettings.interest_in_cel) {
          if (currentDate.day() <= 5 && currentDate.hour() < 17) {
            if (newSettings.interest_in_cel && changedCoins === coinsInCel) {
              return dispatch(
                showMessage(
                  "success",
                  `Congrats! Starting next Monday, ${currentDate
                    .day(8)
                    .format(
                      "DD MMMM"
                    )}, you will receive interest income in CEL on all transferred coins.`
                )
              );
            }
            if (!newSettings.interest_in_cel)
              return dispatch(
                showMessage(
                  "warning",
                  `You’re missing out on better rates! Upgrade your interest settings at any time and unlock even greater rewards by choosing to earn interest income in CEL.`
                )
              );
          } else {
            if (newSettings.interest_in_cel) {
              return dispatch(
                showMessage(
                  "success",
                  `Congrats! You have chosen to earn a reward income in CEL for all transferred coins. Interest has already been calculated for this week, so you will receive interest in CEL beginning Monday, ${currentDate
                    .day(15)
                    .format("DD MMMM")}. `
                )
              );
            }
            if (!newSettings.interest_in_cel)
              return dispatch(
                showMessage(
                  "success",
                  `You have chosen to earn a reward income in-kind for all transferred coins. Interest has already been calculated for this week, so you will receive interest in-kind beginning Monday, ${currentDate
                    .day(15)
                    .format("DD MMMM")}.`
                )
              );
          }
        }

        if (
          !_.isEqual(
            newSettings.interest_in_cel_per_coin,
            appSettings.interest_in_cel_per_coin
          )
        ) {
          if (currentDate.day() <= 5 && currentDate.hour() < 17) {
            if (coinsInCel.length) {
              return dispatch(
                showMessage(
                  "success",
                  `Congrats! Starting next Monday, ${currentDate
                    .day(8)
                    .format(
                      "DD MMMM"
                    )}, you will receive interest income on selected coins in CEL.`
                )
              );
            }
            return dispatch(
              showMessage(
                "success",
                `Starting next Monday, ${currentDate
                  .day(8)
                  .format(
                    "DD MMMM"
                  )}, you will receive interest income on selected coins in in original coins.`
              )
            );
          }

          if (coinsInCel.length) {
            return dispatch(
              showMessage(
                "success",
                `Congrats! You have chosen to earn interest income in CEL. Interest has already been calculated for this week, so you will receive interest in CEL beginning Monday, ${currentDate
                  .day(15)
                  .format("DD MMMM")}`
              )
            );
          }
          return dispatch(
            showMessage(
              "success",
              `You have chosen to earn interest income in ${changedCoins.join(
                ", "
              )}. Interest has already been calculated for this week, so you will receive interest in selected  coins beginning Monday, ${currentDate
                .day(15)
                .format("DD MMMM")}. `
            )
          );
        }
      }
    } catch (e) {
      dispatch(apiError(API.SET_APP_SETTINGS, e));
      dispatch(showMessage("error", e.msg));
    }
  };
}

/**
 * polling of userStatus (kyc, hodl) every 30 seconds
 */

function getUserStatus() {
  return async dispatch => {
    const status = getUserKYCStatus();
    const isLoggedIn = isUserLoggedIn();

    if (!isLoggedIn) return;

    dispatch(startApiCall(API.POLL_USER_DATA));
    try {
      const res = await userDataService.getUserStatus();
      const hodlStatus = res.data.hodlModeStatus;
      const kyc = res.data.kycStatus;
      const twoFAStatus = res.data.twoFactorStatus;
      const newStatus = res.data.kycStatus.status;

      dispatch({
        type: ACTIONS.POLL_USER_DATA_SUCCESS,
        hodlStatus,
        kyc,
        twoFAStatus,
      });

      if (newStatus === KYC_STATUSES.permanently_rejected) {
        dispatch(closeModal());
        return dispatch(navigateTo(SCREENS.KYC_FINAL_REJECTION));
      }

      if (newStatus !== status) {
        dispatch(closeModal());
        if (newStatus === KYC_STATUSES.passed) {
          return dispatch(navigateTo(SCREENS.WALLET_LANDING));
        }

        if (newStatus === KYC_STATUSES.rejected) {
          return dispatch(navigateTo(SCREENS.WALLET_LANDING));
        }
      }
    } catch (err) {
      if (err.status !== 429) dispatch(showMessage("error", err.msg));
      dispatch(apiError(API.POLL_USER_DATA, err));
    }
  };
}

/**
 *
 */
function setHodlProps(activeHodlMode) {
  return {
    type: ACTIONS.SET_HODL_PROPS,
    activeHodlMode,
  };
}

/**
 * Gets app boostrap.
 */
function getUserAppBootstrap() {
  return async dispatch => {
    try {
      dispatch(startApiCall(API.GET_APP_BOOTSTRAP));

      const userAppData = await userDataService.getUserAppBootstrap();

      // NOTE(fj) BE returns cel_rate as "0" every time
      const interestRates = interestUtil.getLoyaltyRates(
        userAppData.data.loyalty
      );

      dispatch({
        type: ACTIONS.GET_APP_BOOTSTRAP_SUCCESS,
        user: {
          ...userAppData.data.user,
          kyc: userAppData.data.kyc,
        },
        appSettings: userAppData.data.user_settings,
        loyaltyInfo: userAppData.data.loyalty,
        complianceInfo: userAppData.data.compliance,
        interestRates,
      });
    } catch (e) {
      dispatch(apiError(API.GET_APP_BOOTSTRAP, e));
      dispatch(showMessage("error", e.msg));
    }
  };
}
