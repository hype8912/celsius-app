import React, { Component } from "react";
import { Linking, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PaymentCard from "../../molecules/PaymentCard/PaymentCard";
import {
  COIN_CARD_TYPE,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../constants/UI";
import CelButton from "../../atoms/CelButton/CelButton";
import ConfirmPaymentModal from "../../modals/ConfirmPaymentModal/ConfirmPaymentModal";
import { LOAN_PAYMENT_TYPES } from "../../../constants/DATA";
import Card from "../../atoms/Card/Card";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    currencyRates: state.currencies.rates,
    walletSummary: state.wallet.summary.coins,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrincipalOverviewScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Principal Payment",
    right: "profile",
  });

  constructor(props) {
    super(props);

    const { navigation, allLoans } = props;
    const loanId = navigation.getParam("id");

    this.state = {
      loan: allLoans.find(l => l.id === loanId),
      isLoading: false,
    };
  }

  payPrincipal = async () => {
    const { actions } = this.props;
    this.setState({ isLoading: true });
    actions.openModal(MODALS.CONFIRM_PAYMENT);
    this.setState({ isLoading: false });
  };

  render() {
    const { loan, isLoading } = this.state;
    const { walletSummary } = this.props;
    if (!loan) return null;
    const coin = walletSummary.find(cr => cr.short === loan.coin_loan_asset);
    const canPay = coin.amount_usd.isGreaterThanOrEqualTo(loan.loan_amount_usd);

    return (
      <RegularLayout>
        <View>
          <Card
            styles={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <CelText type={"H6"}>Loan ID:</CelText>
            <CelText
              type={"H6"}
              color={getColor(COLOR_KEYS.HEADLINE)}
            >{`Active Loan #${loan.id}`}</CelText>
          </Card>
          <PaymentCard
            coin={coin}
            type={COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD}
            loan={loan}
            reason={LOAN_PAYMENT_REASONS.PRINCIPAL}
            handleSelectCoin={() => this.onPress(loan)}
            isLoading={isLoading}
          />
        </View>
        <View>
          {canPay && (
            <CelButton
              margin={"20 0 0 0"}
              onPress={this.payPrincipal}
              loading={isLoading}
              disabled={isLoading}
            >
              Confirm Payment
            </CelButton>
          )}
          <CelText
            margin={"20 0 20 0"}
            align={"center"}
            weight={"300"}
            type={"H4"}
          >
            Need help? Contact our
            <CelText
              weight={"300"}
              type={"H4"}
              link
              onPress={() => Linking.openURL("mailto:loans@celsius.network")}
            >
              {" Lending Support."}
            </CelText>
          </CelText>
        </View>
        <ConfirmPaymentModal
          coin={loan.coin_loan_asset}
          paymentType={LOAN_PAYMENT_TYPES.PRINCIPAL_PAYMENT}
          loanId={loan.id}
        />
      </RegularLayout>
    );
  }
}

export default PrincipalOverviewScreen;
