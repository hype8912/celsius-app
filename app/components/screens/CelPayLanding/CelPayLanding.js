import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigNumber from "bignumber.js";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { CEL_PAY_TYPES, EMPTY_STATES, MODALS } from "../../../constants/UI";
import CelPayInfoModal from "../../modals/CelPayInfoModal/CelPayInfoModal";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { renderHodlEmptyState } from "../../../utils/hodl-util";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    user: state.user.profile,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    walletSummary: state.wallet.summary,
    celPaySettings: state.generalData.celPaySettings,
    navHistory: state.nav.history,
    hodlStatus: state.hodl.hodlStatus,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "CelPay",
    right: "profile",
  });

  componentDidMount() {
    const { navHistory, actions } = this.props;
    actions.openModal(MODALS.CELPAY_INFO_MODAL);
    mixpanelAnalytics.navigatedToCelPay(navHistory[0]);
  }

  sendAsLink = () => {
    const { actions } = this.props;

    actions.navigateTo(SCREENS.CEL_PAY_ENTER_AMOUNT);
    mixpanelAnalytics.choseCelPayType(CEL_PAY_TYPES.LINK);
  };

  sendToFriend = () => {
    const { actions } = this.props;

    actions.navigateTo(SCREENS.CEL_PAY_ENTER_AMOUNT, {
      celPayType: CEL_PAY_TYPES.FRIEND,
    });
    mixpanelAnalytics.choseCelPayType(CEL_PAY_TYPES.FRIEND);
  };

  render() {
    // const style = CelPayLandingStyle();
    const {
      kycStatus,
      celpayCompliance,
      walletSummary,
      actions,
      celPaySettings,
      hodlStatus,
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
    if (hodlStatus.isActive) {
      return (
        <StaticScreen
          emptyState={{
            purpose: renderHodlEmptyState(hodlStatus, "celpay"),
          }}
        />
      );
    }
    if (!celpayCompliance.allowed)
      return <StaticScreen emptyState={{ purpose: EMPTY_STATES.COMPLIANCE }} />;

    if (!new BigNumber(walletSummary.total_amount_usd).isGreaterThan(0))
      return (
        <StaticScreen
          emptyState={{ purpose: EMPTY_STATES.INSUFFICIENT_FUNDS }}
        />
      );

    return (
      <RegularLayout
        pullToRefresh={() => actions.getAllTransactions({ type: ["celpay"] })}
      >
        <MultiInfoCardButton
          textButton={"Share as a link"}
          explanation={"Send a direct link with your preferred apps."}
          darkImage={require("../../../../assets/images/hands-in-the-air-dark.png")}
          unicornImage={require("../../../../assets/images/hands-in-the-air-unicorn.png")}
          lightImage={require("../../../../assets/images/hands-in-the-air.png")}
          onPress={this.sendAsLink}
        />
        <MultiInfoCardButton
          textButton={"Send to contacts"}
          explanation={`Send crypto to other Celsians on the network.`}
          darkImage={require("../../../../assets/images/money-currency-union-dark.png")}
          unicornImage={require("../../../../assets/images/money-currency-union-unicorn.png")}
          lightImage={require("../../../../assets/images/money-currency-union.png")}
          onPress={this.sendToFriend}
        />

        <TransactionsHistory
          hasFilter={false}
          additionalFilter={{ type: ["celpay"], limit: 5 }}
        />

        <CelPayInfoModal
          close={actions.closeModal}
          maxTransferAmount={celPaySettings.maximum_transfer_amount}
        />
      </RegularLayout>
    );
  }
}

export default CelPayLanding;
