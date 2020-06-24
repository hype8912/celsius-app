import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import _ from "lodash";

import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import { TRANSACTION_TYPES } from "../../../constants/DATA";

class LoanCard extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    loan: PropTypes.instanceOf(Object),
    closeModal: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    let data;

    if (props.transaction) {
      data = {
        interestAmount: props.transaction.loan_data.loan_amount,
        loanAssetShort: props.transaction.loan_data.loan_asset_short,
        loanTransactionTime: props.transaction.time,
        loanNumber: props.transaction.loan_data.loan_number,
      };
    }
    if (props.loan) {
      data = {
        interestAmount: props.loan.loan_amount,
        loanAssetShort: props.loan.coin_loan_asset,
        loanTransactionTime: props.loan.created_at,
        loanNumber: props.loan.id,
      };
    }
    this.state = {
      data,
    };
  }

  getPropsFromTransaction = transaction => {
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
        return {
          status: "",
          color: STYLES.COLORS.CELSIUS_BLUE,
        };
      }
    }
  };

  render() {
    const { transaction, navigateTo, closeModal } = this.props;
    const { data } = this.state;
    let status = "Active Loan";
    let color = STYLES.COLORS.CELSIUS_BLUE;
    if (transaction && transaction.type) {
      status = this.getPropsFromTransaction(transaction).status;
      color = this.getPropsFromTransaction(transaction).color;
    }

    return (
      <View>
        {!_.isEmpty(data) ? (
          <Card noBorder padding="15 15 15 15">
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Icon
                name="TransactionLoan"
                width={20}
                height={20}
                fill={color}
              />
              <CelText color={color}>{status}</CelText>
            </View>

            <CelText type="H2" align="left" weight="600" margin="10 15 10 0">
              {formatter.crypto(data.interestAmount, data.loanAssetShort, {
                precision: 2,
              })}
            </CelText>

            <Separator margin="12 0 12 0" />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CelText type="H6" align="left">
                Loan initiated:
              </CelText>
              <CelText type="H6" align="left">
                {moment(data.loanTransactionTime).format("D MMM YYYY")}
              </CelText>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <CelText type="H6" align="left">
                Loan ID:
              </CelText>
              <CelText type="H6" align="left">{`#${data.loanNumber}`}</CelText>
            </View>
            <Separator margin="12 0 12 0" />

            <CelText
              color={STYLES.COLORS.CELSIUS_BLUE}
              align={"left"}
              onPress={() => {
                navigateTo("LoanRequestDetails", {
                  id: data.loanNumber,
                });
                if (closeModal) closeModal();
              }}
            >
              See Loan Overview
            </CelText>
          </Card>
        ) : null}
      </View>
    );
  }
}
export default LoanCard;
