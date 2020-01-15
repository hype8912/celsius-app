import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import CelPayLandingStyle from "./CelPayLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import CelButton from "../../atoms/CelButton/CelButton";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";
import cryptoUtil from "../../../utils/crypto-util";

@connect(
  state => ({
    user: state.user.profile,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "CelPayLanding Screen",
    right: "profile",
  });

  navigateToAllTransactions = () => {
    const { actions } = this.props;
    actions.navigateTo("AllTransactions", { transactionType: ["celpay"] });
  };

  render() {
    // const style = CelPayLandingStyle();
    const {
      user,
      kycStatus,
      celpayCompliance,
      walletSummary,
    } = this.props;

    if (kycStatus !== KYC_STATUSES.pending && !hasPassedKYC())
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_CELPAY }}
        />
      );
    if (kycStatus === KYC_STATUSES.pending && !hasPassedKYC())
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.VERIFICATION_IN_PROCESS_CELPAY }}
        />
      );
    if (!user.celsius_member)
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.NON_MEMBER_CELPAY }}
        />
      );
    if (!celpayCompliance.allowed)
      return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;

    if (!cryptoUtil.isGreaterThan(walletSummary.total_amount_usd, 0))
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      );

    return (
      <RegularLayout>
        <MultiInfoCardButton
          textButton={"Share as a link"}
          explanation={"Send a direct link with your preferred apps."}
          darkImage={require("../../../../assets/images/hands-in-the-air-dark.png")}
          lightImage={require("../../../../assets/images/hands-in-the-air.png")}
        />
        <MultiInfoCardButton
          textButton={"Send to contacts"}
          explanation={`Send crypto to your friends on the network.`}
          darkImage={require("../../../../assets/images/money-currency-union-dark.png")}
          lightImage={require("../../../../assets/images/money-currency-union.png")}
        />
        <TransactionsHistory
          hasFilter={false}
          additionalFilter={{ type: ["celpay"], limit: 5 }}
        />
        <CelButton
          basic
          margin="0 0 15 0"
          onPress={this.navigateToAllTransactions}
        >
          See all
        </CelButton>
      </RegularLayout>
    );
  }
}

export default CelPayLanding;
