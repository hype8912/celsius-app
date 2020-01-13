import React from "react";
import { View } from "react-native";
import moment from "moment";
import _ from "lodash";

import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import CelButton from "../../atoms/CelButton/CelButton";
import { TRANSACTION_TYPES } from "../../../constants/DATA";

function getPropsFromTransaction(transaction) {
  switch (transaction.type) {
    case TRANSACTION_TYPES.MARGIN_CALL:
      return {
        status: "Active Loan",
        color: STYLES.COLORS.CELSIUS_BLUE,
      };
    case TRANSACTION_TYPES.COLLATERAL_PENDING:
      return {
        status: "Pending Loan",
        color: STYLES.COLORS.ORANGE,
      };
    case TRANSACTION_TYPES.COLLATERAL_LOCKED:
      return {
        status: "Active Loan",
        color: STYLES.COLORS.CELSIUS_BLUE,
      };
    case TRANSACTION_TYPES.LOAN_INTEREST:
      return {
        status: "Active Loan",
        color: STYLES.COLORS.CELSIUS_BLUE,
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
      return {
        status: "Active Loan",
        color: STYLES.COLORS.CELSIUS_BLUE,
      };
    case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
      return {
        status: "Completed Loan",
        color: STYLES.COLORS.GREEN,
      };
    case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
      if (transaction.loan_data.unlock_reason === "rejected") {
        return {
          status: "Rejected Loan",
          color: STYLES.COLORS.RED,
        };
      }
      if (transaction.loan_data.unlock_reason === "finished") {
        return {
          status: "Completed Loan",
          color: STYLES.COLORS.GREEN,
        };
      }
      if (transaction.loan_data.unlock_reason === "cancelled") {
        return {
          status: "Cancelled Loan",
          color: STYLES.COLORS.RED,
        };
      }
      break;
    case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
      return {
        status: "Completed Loan",
        color: STYLES.COLORS.RED,
      };
    default: {
      return {};
    }
  }
}

const CollateralLoanCard = ({ transaction, navigateTo }) => {
  const { status, color } = getPropsFromTransaction(transaction);

  // note(srdjan) card is hidden for loan_data is empty object in BE
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
      {!_.isEmpty(transaction.loan_data) ? (
        <Card padding="15 15 15 15">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="TransactionLoan" width={20} height={20} fill={color} />
            <CelText color={color}>{status}</CelText>
          </View>

          <CelText type="H2" align="center" weight="600" margin="10 0 10 0">
            {formatter.crypto(
              transaction.loan_data.loan_amount,
              transaction.loan_data.loan_asset_short,
              { precision: 2 }
            )}
          </CelText>
          <CelText type="H6" align="center">
            Loan initiated: {moment(transaction.time).format("D MMM YYYY")}
          </CelText>

          <Separator margin="12 0 12 0" />

          <CelButton
            basic
            onPress={() =>
              navigateTo("LoanRequestDetails", {
                id: transaction.loan_data.loan_number,
              })
            }
          >
            See Loan Overview
          </CelButton>
        </Card>
      ) : null}
    </View>
  );
};

export default CollateralLoanCard;
