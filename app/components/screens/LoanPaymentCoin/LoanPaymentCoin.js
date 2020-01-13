import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import LoanPaymentCoinStyle from "./LoanPaymentCoin.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Icon from "../../atoms/Icon/Icon";
import Card from "../../atoms/Card/Card";
import { COIN_CARD_TYPE, LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";
import { LOAN_INTEREST_COINS } from "../../../constants/DATA";

@connect(
  state => ({
    currencyRates: state.currencies.rates,
    walletSummary: state.wallet.summary,
    loanCompliance: state.compliance.loan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanPaymentCoin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const reason = navigation.getParam("reason");

    let title = "Pay with Crypto";
    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      title = "Prepay with Crypto";
    }

    return {
      title,
      right: "profile",
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: {},
    };
  }

  handleSelectCoin = async coinShort => {
    const { actions, navigation } = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      actions.updateFormField("coin", coinShort);
      actions.navigateTo("LoanPrepaymentPeriod", { id, reason });
    }

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      this.setState({ isLoading: { [coinShort]: true } });
      await actions.updateLoanSettings(id, {
        interest_payment_asset: coinShort,
      });
      actions.showMessage(
        "success",
        `You have successfully changed interest payment method to ${coinShort}`
      );
      actions.navigateTo("ChoosePaymentMethod", { id, reason });
      this.setState({ isLoading: { [coinShort]: false } });
    }

    if (reason === LOAN_PAYMENT_REASONS.MANUAL_INTEREST) {
      actions.navigateTo("VerifyProfile", {
        onSuccess: () => actions.payMonthlyInterest(id, coinShort),
      });
    }
  };

  render() {
    const { walletSummary, currencyRates, actions } = this.props;
    const { isLoading } = this.state;
    const style = LoanPaymentCoinStyle();

    const availableCoins = walletSummary.coins
      .filter(coin => coin.amount_usd > 0)
      .filter(coin => LOAN_INTEREST_COINS.includes(coin.short))
      .sort((a, b) => Number(b.amount_usd) - Number(a.amount_usd));

    return (
      <RegularLayout>
        <CelText margin={"0 0 10 0"} align={"center"} weight={"300"}>
          Choose a coin from your wallet to complete your payment
        </CelText>
        {availableCoins.map(coin => (
          <CollateralCoinCard
            key={coin.short}
            handleSelectCoin={this.handleSelectCoin}
            coin={currencyRates.find(cr => cr.short === coin.short)}
            type={COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD}
            isLoading={isLoading[coin.short]}
          />
        ))}

        <TouchableOpacity
          style={style.addMoreCoinsList}
          onPress={() => actions.navigateTo("Deposit")}
        >
          <Icon fill={"gray"} width="17" height="17" name="CirclePlus" />
          <CelText type="H5" margin={"0 0 0 5"}>
            Deposit coins
          </CelText>
        </TouchableOpacity>

        <Card close>
          <CelText weight={"500"} type={"H5"}>
            Make sure you have enough coins
          </CelText>
          <CelText margin={"10 0 5 0"} weight={"300"} type={"H5"}>
            Add more coins to make sure you have enough in your wallet for your
            payment.
          </CelText>
        </Card>
      </RegularLayout>
    );
  }
}

export default LoanPaymentCoin;
