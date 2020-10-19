import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import WalletDetailsCardStyle from "./WalletDetailsCard.styles";
import { KYC_STATUSES } from "../../../constants/DATA";
import * as appActions from "../../../redux/actions";
import Counter from "../../molecules/Counter/Counter";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    currencies: state.currencies.rates,
    theme: state.user.appSettings.theme,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletDetailsCard extends PureComponent {
  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired,
  };

  navigateToBalanceHistory = () => {
    const { navigateTo, currencies } = this.props;
    if (!currencies) return;
    navigateTo(SCREENS.BALANCE_HISTORY);
  };

  navigateToDeposit = () => {
    const { navigateTo, currencies } = this.props;
    if (!currencies) return;
    navigateTo(SCREENS.DEPOSIT);
  };

  render() {
    const { walletSummary, actions } = this.props;
    const walletDetailsCardStyle = WalletDetailsCardStyle();

    return (
      <Card padding="12 12 12 12">
        <View style={walletDetailsCardStyle.container}>
          <View style={walletDetailsCardStyle.half}>
            <TouchableOpacity onPress={this.navigateToBalanceHistory}>
              <CelText weight="300" type="H6">
                Total balance
              </CelText>
              <Counter
                hideFromRecording
                weight="600"
                type="H3"
                margin="3 0 3 0"
                number={walletSummary.total_amount_usd}
                speed={5}
                usd
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToDeposit}>
              <CelText link>Add coins</CelText>
            </TouchableOpacity>
          </View>

          <Separator vertical />

          <View style={walletDetailsCardStyle.half}>
            <TouchableOpacity
              onPress={() => actions.navigateTo(SCREENS.WALLET_INTEREST)}
            >
              <CelText weight="300" type="H6">
                Total Earnings
              </CelText>
              <Counter
                hideFromRecording
                weight="600"
                type="H3"
                margin="3 0 3 0"
                number={walletSummary.total_interest_earned}
                speed={5}
                usd
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => actions.navigateTo(SCREENS.INTEREST_RATES)}
            >
              <CelText link>Reward Rates</CelText>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  }
}

export default WalletDetailsCard;
