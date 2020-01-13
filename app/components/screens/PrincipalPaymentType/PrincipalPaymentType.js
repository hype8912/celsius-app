import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { COIN_CARD_TYPE } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import PrincipalPaymentTypeStyle from "./PrincipalPaymentType.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";

@connect(
  state => ({
    coins: state.compliance.loan.collateral_coins,
    walletCoins: state.wallet.summary.coins,
    formData: state.forms.formData,
    allLoans: state.loans.allLoans,
    activeLoan: state.loans.activeLoan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PrincipalPaymentType extends Component {
  static navigationOptions = () => ({
    title: "Principal Payment Type",
  });

  constructor(props) {
    super(props);

    const { actions, navigation } = props;
    const id = navigation.getParam("id");

    actions.setActiveLoan(id);
  }

  handleSelectCoin = async coin => {
    const { actions, navigation } = this.props;
    const id = navigation.getParam("id");

    actions.updateFormField("coin", coin);
    await actions.updateLoanSettings(id, { principal_payment_asset: coin });
    actions.navigateBack();
    this.renderMessage(coin);
  };

  renderMessage = coin => {
    const { actions } = this.props;
    actions.showMessage(
      "success",
      `You have successfully set up principal payout in ${coin.toUpperCase()}.`
    );
  };

  render() {
    const { actions, coins, walletCoins, activeLoan } = this.props;
    const style = PrincipalPaymentTypeStyle();

    if (!activeLoan) return null;

    const availableCoins = walletCoins
      .filter(coin => coins.includes(coin.short))
      .sort((a, b) => Number(b.amount_usd) - Number(a.amount_usd));

    return (
      <RegularLayout fabType="hide">
        <View style={{ alignItems: "center" }}>
          <CelText
            margin={"0 0 10 0"}
            weight={"300"}
            type={"H4"}
            align={"center"}
          >
            Choose a coin from your wallet for your loan principal payment
          </CelText>
        </View>

        <View style={style.wrapper}>
          {availableCoins.map(coin => (
            <CollateralCoinCard
              key={coin.short}
              handleSelectCoin={this.handleSelectCoin}
              coin={coin}
              type={COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD}
              amountNeededUsd={activeLoan.loan_amount_usd}
            />
          ))}
        </View>

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
          <CelText type="H5" weight={"500"} margin={"0 0 10 5"}>
            Make sure you have enough coins
          </CelText>
          <CelText type="H5" margin={"0 0 0 5"}>
            Add more coins to make sure you have enough in your wallet for your
            principal payment.
          </CelText>
        </Card>
      </RegularLayout>
    );
  }
}

export default PrincipalPaymentType;
