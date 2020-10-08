import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import NoWithdrawalAddressCard from "../../atoms/NoWithdrawalAddressCard/NoWithdrawalAddressCard";
import WithdrawalAddressCard from "../../atoms/WithdrawalAddressCard/WithdrawalAddressCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { EMPTY_STATES } from "../../../constants/UI";
import StaticScreen from "../StaticScreen/StaticScreen";
import Separator from "../../atoms/Separator/Separator";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    withdrawalAddresses: state.wallet.withdrawalAddresses,
    noWithdrawalAddresses: state.wallet.noWithdrawalAddresses,
    currencies: state.currencies.rates,
    callsInProgress: state.api.callsInProgress,
    currenciesRates: state.currencies.rates,
    hodlStatus: state.hodl.hodlStatus,
    securityOverview: state.security.securityOverview,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawAddressOverview extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Withdrawal Addresses",
    right: "profile",
  });

  componentDidMount() {
    const { actions } = this.props;
    actions.getAllCoinWithdrawalAddresses();
  }

  handlePress = coin => {
    const { actions } = this.props;
    actions.updateFormField("coin", coin);
    actions.navigateTo(SCREENS.VERIFY_PROFILE, {
      onSuccess: () => actions.navigateTo(SCREENS.WITHDRAW_NEW_ADDRESS_SETUP),
    });
  };

  handleLabelPress = (coin, addressLabel) => {
    const { actions } = this.props;
    actions.updateFormFields({
      withdrawAddressLabel: addressLabel,
      coin,
    });
    actions.navigateTo(SCREENS.WITHDRAW_ADDRESS_LABEL);
  };

  renderFromFixNowFlow = () => {
    const { securityOverview, actions } = this.props;
    if (securityOverview.fromFixNow) {
      return (
        <CelText
          margin="20 0 20 0"
          type="H6"
          weight="600"
          align="center"
          color={getColor(COLOR_KEYS.BANNER_INFO)}
          onPress={() => actions.navigateTo(SCREENS.SECURITY_FIX_NOW)}
        >
          Go back to Fix Now
        </CelText>
      );
    }
  };

  renderCoinDetails = key => {
    const { currencies } = this.props;
    const coin = currencies.find(c => c.short === key);
    return `${formatter.capitalize(coin.name)} (${coin.short})`;
  };

  renderNoWithdrawalAddressCoins = () => {
    const {
      noWithdrawalAddresses,
      currenciesRates,
      withdrawalAddresses,
      securityOverview,
    } = this.props;
    if (noWithdrawalAddresses && noWithdrawalAddresses.length > 0) {
      return noWithdrawalAddresses
        .filter(coin => withdrawalAddresses[coin.short] === undefined)
        .map(coin => {
          const imageUrl = currenciesRates.filter(
            image => image.short === coin.short
          )[0].image_url;
          return (
            <NoWithdrawalAddressCard
              imageUrl={imageUrl}
              coinName={formatter.capitalize(coin.name)}
              coinShort={coin.short}
              onPress={() => this.handlePress(coin.short)}
              disabledPress={securityOverview.hodl_mode_active}
            />
          );
        });
    }
  };

  renderWithdrawalAddresses = () => {
    const { withdrawalAddresses, currenciesRates, hodlStatus } = this.props;
    return withdrawalAddresses
      ? Object.keys(withdrawalAddresses).map(key => {
          const imageUrl = currenciesRates.filter(
            image => image.short === key
          )[0].image_url;

          let hours;
          let minutes;

          if (
            withdrawalAddresses[key] &&
            withdrawalAddresses[key].will_unlock_in
          ) {
            hours = withdrawalAddresses[key].will_unlock_in.split(":")[0];
            minutes = withdrawalAddresses[key].will_unlock_in.split(":")[1];
          }

          return withdrawalAddresses[key] ? (
            <View>
              <WithdrawalAddressCard
                imageUrl={imageUrl}
                key={key}
                coinShort={key}
                coinName={this.renderCoinDetails(key)}
                withdrawalAddress={withdrawalAddresses[key]}
                onPress={() => this.handlePress(key)}
                onPressAddressLabel={() =>
                  this.handleLabelPress(key, withdrawalAddresses[key].label)
                }
                hodlStatus={hodlStatus}
              />
              {withdrawalAddresses[key].locked && hours && minutes && (
                <View>
                  <CelText align="center" type="H6">
                    Due to our security protocols, your {key} address will be
                    active in
                  </CelText>

                  <CelText
                    margin="10 0 0 0"
                    align="center"
                    type="H3"
                    weight={"bold"}
                  >
                    {`${hours}h ${minutes}m.`}
                  </CelText>
                </View>
              )}
            </View>
          ) : null;
        })
      : null;
  };

  render() {
    const {
      withdrawalAddresses,
      noWithdrawalAddresses,
      callsInProgress,
    } = this.props;
    // const RenderSelectedCoin = this.renderWithdrawalAddresses;
    const isLoading = apiUtil.areCallsInProgress(
      [API.GET_ALL_COIN_WITHDRAWAL_ADDRESSES],
      callsInProgress
    );
    if (isLoading) return <LoadingScreen />;
    if (
      !Object.keys(withdrawalAddresses).length &&
      noWithdrawalAddresses &&
      noWithdrawalAddresses.length === 0
    )
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NO_WITHDRAWAL_ADDRESSES }}
        />
      );

    return (
      <RegularLayout>
        <View>
          {this.renderFromFixNowFlow()}

          {noWithdrawalAddresses && noWithdrawalAddresses.length > 0 && (
            <Separator text={"ACTION NEEDED"} />
          )}
          {this.renderNoWithdrawalAddressCoins()}

          {withdrawalAddresses && !_.isEmpty(withdrawalAddresses) && (
            <Separator text={"WHITELISTED WITHDRAWAL ADDRESSES"} />
          )}
          {this.renderWithdrawalAddresses()}
        </View>
      </RegularLayout>
    );
  }
}

export default WithdrawAddressOverview;
