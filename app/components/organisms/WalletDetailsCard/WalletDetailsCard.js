import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import Card from '../../atoms/Card/Card';
import CelText from '../../atoms/CelText/CelText';
import Separator from '../../atoms/Separator/Separator';
import WalletDetailsCardStyle from "./WalletDetailsCard.styles";
import formatter from '../../../utils/formatter';
import STYLES from '../../../constants/STYLES';
import { MODALS } from "../../../constants/UI";
import { KYC_STATUSES } from "../../../constants/DATA";
import * as appActions from "../../../redux/actions";
import { hasPassedKYC } from "../../../utils/user-util";

@connect(
  state => ({
      kycStatus: state.user.profile.kyc
        ? state.user.profile.kyc.status
        : KYC_STATUSES.collecting,

  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class WalletDetailsCard extends PureComponent {

  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object).isRequired,
    navigateTo: PropTypes.func.isRequired
  };

  navigateToBalanceHistory = () =>{
    const {actions} = this.props;
    if (hasPassedKYC()) return actions.navigateTo('BalanceHistory')
    actions.navigateTo("KYCLanding");
  };

  navigateToDeposit = () => {
    const {actions} = this.props;
    if (hasPassedKYC()) return actions.navigateTo('Deposit')
    actions.navigateTo("KYCLanding");
  };
  openInterestModal = () => this.props.openModal(MODALS.TODAY_INTEREST_RATES_MODAL);

  render() {
    const { walletSummary, actions } = this.props;
    const walletDetailsCardStyle = WalletDetailsCardStyle();

    return (
      <Card padding='12 12 12 12'>
        <View style={walletDetailsCardStyle.container}>
          <View>
            <TouchableOpacity onPress={this.navigateToBalanceHistory}>
              <CelText weight='300' type="H6">Total Wallet balance</CelText>
              <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(walletSummary.total_amount_usd)}</CelText>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.navigateToDeposit}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Deposit coins</CelText>
            </TouchableOpacity>
          </View>

          <Separator vertical/>

          <View>
            <TouchableOpacity onPress={() => actions.navigateTo('WalletInterest')}>
              <CelText weight='300' type="H6">Total Interest earned</CelText>
              <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(walletSummary.total_interest_earned)}</CelText>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.openInterestModal}>
              <CelText color={STYLES.COLORS.CELSIUS_BLUE}>Rates this week</CelText>
            </TouchableOpacity>
          </View>
        </View>


      </Card>
    );
  }
}

export default WalletDetailsCard
