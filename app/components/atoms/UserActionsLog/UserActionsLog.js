import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { View } from "react-native";

import CelText from "../CelText/CelText";
import UserActionsLogStyle from "./UserActionsLog.styles";
import Separator from "../Separator/Separator";
import Icon from "../Icon/Icon";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

const getData = item => {
  if (item.action === "transaction-history") {
    return {
      name: "Csv",
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
      action: "Transaction History Requested",
    };
  }

  if (item.action === "withdrawal-request") {
    return {
      name: "CaretUp",
      color: getColor(COLOR_KEYS.ALERT_STATE),
      action: "Withdraw Request",
    };
  }
  const successfulLoginActionTypes = [
    "successful-login",
    "successful-login-email-and-password",
    "successful-login-google",
    "successful-login-facebook",
    "successful-login-twitter",
  ];
  if (successfulLoginActionTypes.includes(item.action)) {
    return {
      name: "Checked",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "Successful Login",
    };
  }

  if (item.action === "loan-rejected") {
    return {
      name: "Loan",
      color: getColor(COLOR_KEYS.NEGATIVE_STATE),
      action: "Loan Rejected",
    };
  }

  if (item.action === "loan-approved") {
    return {
      name: "Loan",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "Loan Approved",
    };
  }

  if (item.action === "loan-canceled") {
    return {
      name: "Loan",
      color: getColor(COLOR_KEYS.NEGATIVE_STATE),
      action: "Loan Canceled",
    };
  }

  if (item.action === "change-email") {
    return {
      name: "Mail",
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
      action: "Change Email",
    };
  }

  if (item.action === "change-pin") {
    return {
      name: "Lock",
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
      action: "Change Pin",
    };
  }

  if (item.action === "pin-activated") {
    return {
      name: "Lock",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "Set Pin",
    };
  }
  if (item.action === "confirm-celpay") {
    return {
      name: "Mail",
      color: `${getColor(COLOR_KEYS.PRIMARY_BUTTON)}`,
      action: "CelPay Confirmed",
    };
  }
  if (item.action === "loan-apply") {
    return {
      name: "Lock",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "Loan apply",
    };
  }
  if (item.action === "change-password-confirm") {
    return {
      name: "Key",
      color: `${getColor(COLOR_KEYS.POSITIVE_STATE)}`,
      action: "Password changed",
    };
  }
  if (item.action === "2fa-deactivated") {
    return {
      name: "NotSecure",
      color: `${getColor(COLOR_KEYS.NEGATIVE_STATE)}`,
      action: "2FA Deactivated",
    };
  }
  if (item.action === "2fa-deactivation-confirm") {
    return {
      name: "NotSecure",
      color: `${getColor(COLOR_KEYS.PRIMARY_BUTTON)}`,
      action: "2FA Deactivation Confirm ",
    };
  }
  if (item.action === "2fa-activation-confirm") {
    return {
      name: "Shield",
      color: `${getColor(COLOR_KEYS.PRIMARY_BUTTON)}`,
      action: "2FA Activation Confirm ",
    };
  }
  if (item.action === "2fa-activated") {
    return {
      name: "Shield",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "2FA Activated",
    };
  }

  if (item.action === "hodl-mode-deactivate-confirm") {
    return {
      name: "NotSecure",
      color: `${getColor(COLOR_KEYS.PRIMARY_BUTTON)}`,
      action: "HODL Mode Deactivation Confirm ",
    };
  }
  if (item.action === "hodl-mode-activate-confirm") {
    return {
      name: "Shield",
      color: `${getColor(COLOR_KEYS.PRIMARY_BUTTON)}`,
      action: "HODL Mode Activation Confirm ",
    };
  }
  if (item.action === "hodl-mode-activated") {
    return {
      name: "Shield",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "HODL Mode Activated",
    };
  }
  if (item.action === "celpay-claim") {
    return {
      name: "CaretDown",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "CelPay Claimed",
    };
  }
  if (item.action === "withdraw-info") {
    return {
      name: "CaretUp",
      color: getColor(COLOR_KEYS.NEGATIVE_STATE),
      action: "Withdraw",
    };
  }
  if (item.action === "deposit-success") {
    return {
      name: "CaretDown",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "Deposit",
    };
  }
  if (item.action === "confirm-withdrawal-request") {
    return {
      name: "CaretUp",
      color: getColor(COLOR_KEYS.POSITIVE_STATE),
      action: "Withdraw confirm request",
    };
  }
  if (item.action === "withdrawal-address-change") {
    return {
      name: "QrCode",
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
      action: "Withdrawal address change",
    };
  }
  if (item.action === "biometrics-activated") {
    return {
      name: "Fingerprint",
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
      action: "Biometrics activated",
    };
  }
  if (item.action === "biometrics-deactivated") {
    return {
      name: "Fingerprint",
      color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
      action: "Biometrics deactivated",
    };
  }
};

const UserActionsLog = props => {
  const { logData } = props;
  const style = UserActionsLogStyle();
  return (
    <>
      <Separator margin="0 0 10 0" text="User actions log" />
      {logData.map(item => {
        const actions = getData(item);
        if (actions && actions.action) {
          return (
            <View key={item.created_at} style={style.userActionsLogWrapper}>
              <View style={style.userActionsLog}>
                <Icon
                  name={actions.name}
                  viewBox="0 0 29 29"
                  fill={actions.color}
                />
                <CelText
                  style={{ flex: 1, justifyContent: "flex-start" }}
                  type="H5"
                  weight="600"
                >
                  {actions.action}{" "}
                </CelText>
                <CelText type="H6" weight="300">
                  {moment(item.created_at).format("MMMM D, GGGG")}{" "}
                </CelText>
              </View>
              <View style={{ marginBottom: 0 }}>
                {logData[logData.length - 1] !== item ? <Separator /> : null}
              </View>
            </View>
          );
        }
        return null;
      })}
    </>
  );
};

UserActionsLog.propTypes = {
  logData: PropTypes.instanceOf(Array).isRequired,
};

export default UserActionsLog;
