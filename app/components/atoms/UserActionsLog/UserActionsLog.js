import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { View } from "react-native";

import CelText from "../CelText/CelText";
import UserActionsLogStyle from "./UserActionsLog.styles";
import Separator from "../Separator/Separator";
import Icon from "../Icon/Icon";
import STYLES from "../../../constants/STYLES";

const getData = item => {
  if (item.action === "transaction-history") {
    return {
      name: "Csv",
      color: STYLES.COLORS.CELSIUS_BLUE,
      action: "Transaction History Requested",
    };
  }

  if (item.action === "withdrawal-request") {
    return {
      name: "CaretUp",
      color: STYLES.COLORS.ORANGE,
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
      color: STYLES.COLORS.GREEN,
      action: "Successful Login",
    };
  }

  if (item.action === "loan-rejected") {
    return {
      name: "Loan",
      color: STYLES.COLORS.RED,
      action: "Loan Rejected",
    };
  }

  if (item.action === "loan-approved") {
    return {
      name: "Loan",
      color: STYLES.COLORS.GREEN,
      action: "Loan Approved",
    };
  }

  if (item.action === "loan-canceled") {
    return {
      name: "Loan",
      color: STYLES.COLORS.RED,
      action: "Loan Canceled",
    };
  }

  if (item.action === "change-email") {
    return {
      name: "Mail",
      color: STYLES.COLORS.CELSIUS_BLUE,
      action: "Change Email",
    };
  }

  if (item.action === "change-pin") {
    return {
      name: "Lock",
      color: STYLES.COLORS.CELSIUS_BLUE,
      action: "Change Pin",
    };
  }

  if (item.action === "pin-activated") {
    return { name: "Lock", color: STYLES.COLORS.GREEN, action: "Set Pin" };
  }
  if (item.action === "confirm-celpay") {
    return {
      name: "Mail",
      color: `${STYLES.COLORS.CELSIUS_BLUE}`,
      action: "CelPay Confirmed",
    };
  }
  if (item.action === "loan-apply") {
    return { name: "Lock", color: STYLES.COLORS.GREEN, action: "Loan apply" };
  }
  if (item.action === "change-password-confirm") {
    return {
      name: "Key",
      color: `${STYLES.COLORS.GREEN}`,
      action: "Password changed",
    };
  }
  if (item.action === "2fa-deactivated") {
    return {
      name: "NotSecure",
      color: `${STYLES.COLORS.RED}`,
      action: "2FA Deactivated",
    };
  }
  if (item.action === "2fa-deactivation-confirm") {
    return {
      name: "NotSecure",
      color: `${STYLES.COLORS.CELSIUS_BLUE}`,
      action: "2FA Deactivation Confirm ",
    };
  }
  if (item.action === "2fa-activation-confirm") {
    return {
      name: "Shield",
      color: `${STYLES.COLORS.CELSIUS_BLUE}`,
      action: "2FA Activation Confirm ",
    };
  }
  if (item.action === "2fa-activated") {
    return {
      name: "Shield",
      color: STYLES.COLORS.GREEN,
      action: "2FA Activated",
    };
  }

  if (item.action === "hodl-mode-deactivate-confirm") {
    return {
      name: "NotSecure",
      color: `${STYLES.COLORS.CELSIUS_BLUE}`,
      action: "HODL Mode Deactivation Confirm ",
    };
  }
  if (item.action === "hodl-mode-activate-confirm") {
    return {
      name: "Shield",
      color: `${STYLES.COLORS.CELSIUS_BLUE}`,
      action: "HODL Mode Activation Confirm ",
    };
  }
  if (item.action === "hodl-mode-activated") {
    return {
      name: "Shield",
      color: STYLES.COLORS.GREEN,
      action: "HODL Mode Activated",
    };
  }
  if (item.action === "celpay-claim") {
    return {
      name: "CaretDown",
      color: STYLES.COLORS.GREEN,
      action: "CelPay Claimed",
    };
  }
  if (item.action === "withdraw-info") {
    return {
      name: "CaretUp",
      color: `${STYLES.COLORS.RED}`,
      action: "Withdraw",
    };
  }
  if (item.action === "deposit-success") {
    return {
      name: "CaretDown",
      color: STYLES.COLORS.GREEN,
      action: "Deposit",
    };
  }
  if (item.action === "confirm-withdrawal-request") {
    return {
      name: "CaretUp",
      color: `${STYLES.COLORS.GREEN}`,
      action: "Withdraw confirm request",
    };
  }
  if (item.action === "withdrawal-address-change") {
    return {
      name: "QrCode",
      color: `${STYLES.COLORS.CELSIUS_BLUE}`,
      action: "Withdrawal address change",
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
