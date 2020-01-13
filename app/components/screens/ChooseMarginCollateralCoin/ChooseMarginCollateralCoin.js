import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import ChooseMarginCollateralCoinStyle from "./ChooseMarginCollateralCoin.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Icon from "../../atoms/Icon/Icon";
import CollateralCoinCard from "../../molecules/CollateralCoinCard/CollateralCoinCard";
import { COIN_CARD_TYPE } from "../../../constants/UI";

@connect(
  state => ({
    coins: state.compliance.loan.collateral_coins,
    walletCoins: state.wallet.summary.coins,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ChooseMarginCollateralCoin extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Choose Collateral",
    right: "profile",
  });

  handleSelectCoin = async coin => {
    const { actions, navigation } = this.props;
    const loan = navigation.getParam("loan");

    actions.navigateTo("VerifyProfile", {
      onSuccess: () => actions.lockMarginCallCollateral(loan.id, coin),
    });
  };

  render() {
    const { actions, coins, walletCoins, navigation } = this.props;
    const style = ChooseMarginCollateralCoinStyle();
    const loan = navigation.getParam("loan");

    const availableCoins = walletCoins
      .filter(coin => coins.includes(coin.short))
      .sort((a, b) => Number(a.amount_usd) < Number(b.amount_usd));

    return (
      <View style={{ flex: 1 }}>
        <RegularLayout fabType="hide">
          <View style={{ alignItems: "center" }}>
            <CelText
              margin={"0 0 10 0"}
              weight={"300"}
              type={"H4"}
              align={"center"}
            >
              Choose a coin to use as a collateral to cover margin call prices:
            </CelText>
          </View>

          <View style={style.wrapper}>
            {availableCoins.map(coin => (
              <CollateralCoinCard
                key={coin.short}
                handleSelectCoin={this.handleSelectCoin}
                coin={coin}
                type={COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD}
                isMarginCall={loan.margin_call_activated}
                marginCall={loan.margin_call}
              />
            ))}
          </View>
          <TouchableOpacity
            style={style.addMoreCoinsList}
            onPress={() =>
              actions.navigateTo("Deposit", {
                coin: loan.margin_call.collateral_coin,
                loan,
                isMarginWarning: true,
              })
            }
          >
            <Icon fill={"gray"} width="17" height="17" name="CirclePlus" />
            <CelText type="H5" margin={"0 0 0 5"}>
              Deposit coins
            </CelText>
          </TouchableOpacity>
        </RegularLayout>
      </View>
    );
  }
}

export default ChooseMarginCollateralCoin;
