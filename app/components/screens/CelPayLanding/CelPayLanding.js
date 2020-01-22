import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import CelButton from "../../atoms/CelButton/CelButton";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES, MODALS } from "../../../constants/UI";
import cryptoUtil from "../../../utils/crypto-util";
import CelPayInfoModal from "../../modals/CelPayInfoModal/CelPayInfoModal";

@connect(
  state => ({
    user: state.user.profile,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    celpayCompliance: state.compliance.celpay,
    walletSummary: state.wallet.summary,
    celPaySettings: state.generalData.celPaySettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CelPayLanding extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Choose how to CelPay",
  });

  componentDidMount() {
    this.props.actions.openModal(MODALS.CELPAY_INFO_MODAL);
  }

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
      actions,
      celPaySettings,
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
          onPress={() => actions.navigateTo("CelPayEnterAmount")}
        />
        <MultiInfoCardButton
          textButton={"Send to contacts"}
          explanation={`Send crypto to other Celsians on the network.`}
          darkImage={require("../../../../assets/images/money-currency-union-dark.png")}
          lightImage={require("../../../../assets/images/money-currency-union.png")}
          onPress={() => actions.navigateTo("CelPayChooseFriend")}
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

        <CelPayInfoModal close={actions.closeModal} maxTransferAmount={celPaySettings.maximum_transfer_amount}/>
      </RegularLayout>
    );
  }
}

export default CelPayLanding;
