import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { COIN_CARD_TYPE } from "../../../constants/UI";
import * as appActions from "../../../redux/actions";
import BorrowCollateralStyle from "./BorrowCollateral.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";
import userBehaviorUtil from "../../../utils/user-behavior-util";

@connect(
  state => ({
    coins: state.compliance.loan.collateral_coins,
    walletCoins: state.wallet.summary.coins,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowCollateral extends Component {
  static navigationOptions = () => ({
    title: "Collateral",
    right: "profile",
  });

  handleSelectCoin = coin => {
    const { actions } = this.props;
    actions.updateFormField("collateralCoin", coin);
    userBehaviorUtil.loanCollateral(coin);

    actions.navigateTo("BorrowLoanOption");
  };

  render() {
    const { actions, coins, walletCoins, formData } = this.props;
    const style = BorrowCollateralStyle();

    const availableCoins = walletCoins
      .filter(coin => coins.includes(coin.short))
      .sort((a, b) => b.amount_usd - a.amount_usd);

    return (
      <View style={{ flex: 1 }}>
        <HeadingProgressBar steps={6} currentStep={2} />
        <RegularLayout fabType="hide">
          <View style={{ alignItems: "center" }}>
            <CelText
              margin={"0 0 10 0"}
              weight={"300"}
              type={"H4"}
              align={"center"}
            >
              Choose a coin to use as a collateral for a {formData.loanAmount}{" "}
              {formData.coin} loan:
            </CelText>
          </View>

          <View style={style.wrapper}>
            {availableCoins.map(coin => (
              <CollateralCoinCard
                key={coin.short}
                handleSelectCoin={this.handleSelectCoin}
                coin={coin}
                type={COIN_CARD_TYPE.COLLATERAL_COIN_CARD}
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
              Add more coins to make sure you have enough in your wallet for
              your monthly loan payment.
            </CelText>
          </Card>
        </RegularLayout>
      </View>
    );
  }
}

export default BorrowCollateral;
