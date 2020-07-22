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

@connect(
  state => ({
    currencies: state.currencies.rates,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WalletDetailsCard extends PureComponent {
  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired,
  };

  navigateToBalanceHistory = () => {
    const { actions, currencies } = this.props;
    if (!currencies) return;
    actions.navigateTo("BalanceHistory");
  };

  navigateToDeposit = () => {
    const { actions, currencies } = this.props;
    if (!currencies) return;
    actions.navigateTo("Deposit");
  };

  render() {
    const { walletSummary, actions } = this.props;
    const walletDetailsCardStyle = WalletDetailsCardStyle();

    return (
      <Card padding="12 12 12 12">
        <View style={walletDetailsCardStyle.container}>
          <View>
            <TouchableOpacity onPress={this.navigateToBalanceHistory}>
              <CelText weight="300" type="H6">
                Total Wallet balance
              </CelText>
              <Counter
                weight="600"
                type="H3"
                margin="3 0 3 0"
                number={walletSummary.total_amount_usd}
                speed={5}
                usd
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToDeposit}>
              <CelText link>Deposit coins</CelText>
            </TouchableOpacity>
          </View>

          <Separator vertical />

          <View>
            <TouchableOpacity
              onPress={() => actions.navigateTo("WalletInterest")}
            >
              <CelText weight="300" type="H6">
                Total Interest earned
              </CelText>
              <Counter
                weight="600"
                type="H3"
                margin="3 0 3 0"
                number={walletSummary.total_interest_earned}
                speed={5}
                usd
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => actions.navigateTo("InterestRates")}
            >
              <CelText link>Rates this week</CelText>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  }
}

export default WalletDetailsCard;
