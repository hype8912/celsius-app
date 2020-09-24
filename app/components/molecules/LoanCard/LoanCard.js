import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import moment from "moment";
import _ from "lodash";

import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import formatter from "../../../utils/formatter";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

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

    const { transaction, loan } = props;

    if (transaction) {
      data = {
        interestAmount: transaction.loan_data.loan_amount,
        loanAssetShort: transaction.loan_data.loan_asset_short,
        loanTransactionTime: transaction.time,
        loanNumber: transaction.loan_data.loan_number,
      };
    }
    if (loan) {
      data = {
        interestAmount: loan.loan_amount,
        loanAssetShort: loan.coin_loan_asset,
        loanTransactionTime: loan.created_at,
        loanNumber: loan.id,
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
          color: getColor(COLOR_KEYS.BANNER_INFO),
        };
      case TRANSACTION_TYPES.COLLATERAL_PENDING:
        return {
          status: "Pending Loan",
          color: getColor(COLOR_KEYS.FAIR),
        };
      case TRANSACTION_TYPES.COLLATERAL_LOCKED:
        return {
          status: "Active Loan",
          color: getColor(COLOR_KEYS.BANNER_INFO),
        };
      case TRANSACTION_TYPES.LOAN_INTEREST:
        return {
          status: "Active Loan",
          color: getColor(COLOR_KEYS.BANNER_INFO),
        };
      case TRANSACTION_TYPES.LOAN_PRINCIPAL_RECEIVED:
        return {
          status: "Active Loan",
          color: getColor(COLOR_KEYS.BANNER_INFO),
        };
      case TRANSACTION_TYPES.LOAN_PRINCIPAL_PAYMENT:
        return {
          status: "Completed Loan",
          color: getColor(COLOR_KEYS.POSITIVE_STATE),
        };
      case TRANSACTION_TYPES.COLLATERAL_UNLOCKED:
        if (transaction.loan_data.status === "active") {
          return {
            status: "Active Loan",
            color: getColor(COLOR_KEYS.BANNER_INFO),
          };
        }
        if (transaction.loan_data.status === "rejected") {
          return {
            status: "Rejected Loan",
            color: getColor(COLOR_KEYS.NEGATIVE_STATE),
          };
        }
        if (transaction.loan_data.status === "completed") {
          return {
            status: "Completed Loan",
            color: getColor(COLOR_KEYS.POSITIVE_STATE),
          };
        }
        if (transaction.loan_data.status === "cancelled") {
          return {
            status: "Cancelled Loan",
            color: getColor(COLOR_KEYS.NEGATIVE_STATE),
          };
        }
        break;
      case TRANSACTION_TYPES.COLLATERAL_LIQUIDATED:
        return {
          status: "Completed Loan",
          color: getColor(COLOR_KEYS.NEGATIVE_STATE),
        };
      default: {
        return {
          status: "",
          color: getColor(COLOR_KEYS.BANNER_INFO),
        };
      }
    }
  };

  render() {
    const { transaction, navigateTo, closeModal } = this.props;
    const { data } = this.state;
    let status = "Active Loan";
    let color = getColor(COLOR_KEYS.BANNER_INFO);
    if (transaction && transaction.type) {
      status = this.getPropsFromTransaction(transaction).status;
      color = this.getPropsFromTransaction(transaction).color;
    }

    if (transaction && transaction.type && transaction.type === "MARGIN_CALL")
      return (
        <Card noBorder padding="15 15 15 15">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <CelText
              weight={"500"}
              color={color}
            >{`${status} - #${transaction.loan_data.loan_number}`}</CelText>
          </View>
          <CelText type="H2" align="left" weight="600">
            {formatter.crypto(data.interestAmount, data.loanAssetShort, {
              precision: 2,
            })}
          </CelText>
        </Card>
      );

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
              color={getColor(COLOR_KEYS.BANNER_INFO)}
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
