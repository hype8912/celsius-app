import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import WithdrawalAddressCard from "../../atoms/WithdrawalAddressCard/WithdrawalAddressCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  state => ({
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress,
    currenciesRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawAddressOverview extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Withdrawal addresses ",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getAllCoinWithdrawalAddresses();
  }

  handlePress = coin => {
    const { actions } = this.props;
    actions.updateFormFields({ coin });
    actions.navigateTo("VerifyProfile", {
      onSuccess: () => actions.navigateTo("WithdrawNewAddressSetup"),
    });
  };

  handleLabelPress = (coin, addressLabel) => {
    const { actions } = this.props;
    actions.updateFormFields({
      withdrawAddressLabel: addressLabel,
      coin,
    });
    actions.navigateTo("WithdrawAddressLabel");
  };

  renderCoinDetails = key => {
    const { currencies } = this.props;
    const coin = currencies.find(c => c.short === key);
    return `${formatter.capitalize(coin.name)} - ${coin.short}`;
  };

  renderSelectedCoin = () => {
    const { withdrawalAddresses, currenciesRates } = this.props;
    return withdrawalAddresses
      ? Object.keys(withdrawalAddresses).map(key => {
          const imageUrl = currenciesRates.filter(
            image => image.short === key
          )[0].image_url;
          return withdrawalAddresses[key] ? (
            <WithdrawalAddressCard
              imageUrl={imageUrl}
              key={key}
              coinShort={key}
              withdrawalAddress={withdrawalAddresses[key]}
              onPress={() => this.handlePress(key)}
              onPressAddressLabel={() =>
                this.handleLabelPress(key, withdrawalAddresses[key].label)
              }
            />
          ) : null;
        })
      : null;
  };

  render() {
    const { withdrawalAddresses, callsInProgress } = this.props;
    // const RenderSelectedCoin = this.renderSelectedCoin;

    const isLoading = apiUtil.areCallsInProgress(
      [API.GET_ALL_COIN_WITHDRAWAL_ADDRESSES],
      callsInProgress
    );
    if (isLoading) return <LoadingScreen />;
    if (!Object.keys(withdrawalAddresses).length)
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NO_WITHDRAWAL_ADDRESSES }}
        />
      );

    return (
      <RegularLayout>
        <View>
          <Card color={STYLES.COLORS.CELSIUS_BLUE}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, paddingRight: 5 }}>
                <Icon
                  name={"Info"}
                  width="25"
                  height="25"
                  fill={STYLES.COLORS.WHITE}
                />
              </View>
              <View style={{ flex: 6 }}>
                <CelText type={"H5"} weight={"300"} color={STYLES.COLORS.WHITE}>
                  For your security, if changes are made to a withdrawal
                  address, withdrawals of that coin will be unavailable for 24
                  hours.
                </CelText>
              </View>
            </View>
          </Card>
          {this.renderSelectedCoin()}
        </View>
      </RegularLayout>
    );
  }
}

export default WithdrawAddressOverview;
