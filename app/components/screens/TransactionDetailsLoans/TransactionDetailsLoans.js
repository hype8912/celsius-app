import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";

// import TransactionDetailsLoansStyle from "./TransactionDetailsLoans.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TxInfoSection from "../../atoms/TxInfoSection/TxInfoSection";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";
import CelButton from "../../atoms/CelButton/CelButton";
import CollateralLoanCard from "../../molecules/CollateralLoanCard/CollateralLoanCard";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";

class TransactionDetailsLoans extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    // const style = TransactionDetailsLoansStyle();
    const { transaction, navigateTo } = this.props;
    const transactionProps = transaction.uiProps;

    return (
      <RegularLayout>
        <View>
          <TxInfoSection
            margin="40 0 20 0"
            transaction={transaction}
            transactionProps={transactionProps}
          />

          <CollateralLoanCard
            navigateTo={navigateTo}
            transaction={transaction}
          />

          <TxBasicSection
            label={"Date"}
            value={moment(transaction.time).format("D MMM YYYY")}
          />

          <TxBasicSection
            label={"Time"}
            value={moment.utc(transaction.time).format("h:mm A (z)")}
          />

          {transaction.type.includes("UNLOCKED") ? (
            <Card>
              <CelText align={"left"} type={"H5"} weight={"600"}>
                Successfully Completed Loan
              </CelText>
              <CelText align={"left"} type={"H6"}>
                Your collateral is now released and ready to earn interest
                again.
              </CelText>
            </Card>
          ) : null}

          {transaction.type.includes("LOCKED") ? (
            <View style={{ marginTop: 20 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <CelText>
                    {transaction.coin.toUpperCase()} margin call at:
                  </CelText>
                  <CelText>
                    {formatter.usd(transaction.loan_data.margin)}
                  </CelText>
                </View>
                <Card>
                  <CelText type="H6" style={{ opacity: 0.7 }}>
                    If {transaction.coin.toUpperCase()} drops below{" "}
                    {formatter.usd(transaction.loan_data.margin)} you will get a
                    notification asking for additional collateral.
                  </CelText>
                </Card>
                <Separator margin="20 0 20 0" />
              </View>
              <View style={{ marginBottom: 20 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <CelText>Liquidation at:</CelText>
                  <CelText>
                    {formatter.usd(transaction.loan_data.liquidation)}
                  </CelText>
                </View>
                <Card>
                  <CelText type="H6" style={{ opacity: 0.7 }}>
                    If {transaction.coin.toUpperCase()} drops below{" "}
                    {formatter.usd(transaction.loan_data.liquidation)} we will
                    sell some of your collateral to cover the margin.
                  </CelText>
                </Card>
              </View>
            </View>
          ) : null}

          <CelButton
            margin={"20 0 0 0"}
            basic
            onPress={() => navigateTo("WalletLanding")}
          >
            Go Back to Wallet
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default TransactionDetailsLoans;
