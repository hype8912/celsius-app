import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import BorrowCollateralStyle from "./BorrowCollateral.styles";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import formatter from "../../../utils/formatter";
import ProgressBar from "../../atoms/ProgressBar/ProgressBar";

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    walletCoins: state.wallet.summary.coins,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowCollateral extends Component {

  static navigationOptions = () => ({
    title: "Collateral",
    right: "profile"
  });

  handleSelectCoin = (coin) => {
    const { actions } = this.props

    actions.updateFormField('coin', coin)
    actions.navigateTo('BorrowLoanOption')
  }

  renderButton = (coin) => {
    const { formData } = this.props
    const name = formatter.capitalize(coin.name);
    const crypto = formatter.crypto(coin.amount, coin.short, {precision: 2});
    const fiat = formatter.usd(coin.amount_usd);
    const style = BorrowCollateralStyle();
    const collateralAmount = formData.loanAmount * 2

    const color = coin.amount_usd < collateralAmount ? "rgba(239,70,26,1)" : "rgba(60,71,84,0.7)";

    return (
      <View key={coin.name} style={style.coinWrapper}>
        <CircleButton
          onPress={() => this.handleSelectCoin(coin.short)}
          type={"coin"}
          icon={`Icon${coin.short}`}
          disabled={coin.amount_usd < collateralAmount}
        />
        <CelText weight={"500"} align="center" style={{marginTop: 10}}>{name}</CelText>
        <CelText weight={"300"} align="center" style={{color}}>{crypto}</CelText>
        <CelText weight={"300"} align="center" style={{color}}>{fiat}</CelText>
      </View>
    );
  };

  render() {
    const { actions, coins, walletCoins } = this.props;
    const style = BorrowCollateralStyle();

    const availableCoins = walletCoins.filter(coin => coins.includes(coin.short));

    return (
      <RegularLayout>
        <View style={{alignItems: 'center'}}>
          <ProgressBar steps={6} currentStep={2}/>
          <CelText margin={"30 0 30 0"} weight={"300"}>Choose a coin to use as a collateral:</CelText>
        </View>

        <View style={style.wrapper}>
          {availableCoins.map(coin => this.renderButton(coin))}
        </View>

        <CelButton margin="50 0 30 0" onPress={() => actions.navigateTo("Deposit")}>
          Deposit more funds
        </CelButton>

      </RegularLayout>
    );
  }
}

export default BorrowCollateral
