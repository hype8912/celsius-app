import React, { Component } from "react";
// import { View } from 'react-native';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import MultiInfoCardButton from "../../molecules/MultiInfoCardButton/MultiInfoCardButton";
import { EMPTY_STATES, MODALS } from "../../../constants/UI";
import GetCoinsInfoModal from "../../modals/GetCoinsInfoModal/GetCoinsInfoModal";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import SimplexPaymentsHistory from "../../molecules/SimplexPaymentsHistory/SimplexPaymentsHistory";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";
import StaticScreen from "../StaticScreen/StaticScreen";

@connect(
  state => ({
    formData: state.forms.formData,
    navHistory: state.nav.history,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    simplexCompliance: state.compliance.simplex,
    gemCompliance: state.compliance.gem,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GetCoinsLanding extends Component {
  static propTypes = {
    type: PropTypes.string,
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Buy Coins",
    right: "profile",
  });

  componentDidMount() {
    const { actions, navHistory } = this.props;
    actions.openModal(MODALS.GET_COINS_INFO_MODAL);
    actions.getCrytpoLimits();
    mixpanelAnalytics.navigatedToBuyCoins(navHistory[0]);
  }

  render() {
    const {
      actions,
      kycStatus,
      simplexCompliance,
      gemCompliance,
      formData,
    } = this.props;

    if (!hasPassedKYC()) {
      if (kycStatus !== KYC_STATUSES.pending) {
        return (
          <StaticScreen
            emptyState={{ purpose: EMPTY_STATES.NON_VERIFIED_GET_COINS }}
          />
        );
      }
      if (kycStatus === KYC_STATUSES.pending) {
        return (
          <StaticScreen
            emptyState={{
              purpose: EMPTY_STATES.VERIFICATION_IN_PROCESS_GET_COINS,
            }}
          />
        );
      }
    }

    if (!simplexCompliance.allowed && !gemCompliance.allowed) {
      return (
        <StaticScreen
          emptyState={{
            purpose: EMPTY_STATES.BUY_COINS_COMPLIANCE,
          }}
        />
      );
    }

    return (
      <RegularLayout>
        {simplexCompliance.allowed && (
          <MultiInfoCardButton
            textButton={"Credit Card"}
            explanation={"Buy crypto easily using your credit card."}
            darkImage={require("../../../../assets/images/icons/credit-card-dark.png")}
            lightImage={require("../../../../assets/images/icons/credit-card-light.png")}
            onPress={() => {
              actions.initForm({
                isFiat: true,
                cryptoCoin: formData.selectedCoin || "ETH",
                simplexData: {
                  paymentMethod: "Credit Card",
                },
              });
              actions.navigateTo("GetCoinsEnterAmount");
              mixpanelAnalytics.choseBuyCoinsType("CARD");
            }}
          />
        )}

        {gemCompliance.allowed && (
          <MultiInfoCardButton
            textButton={"Bank Wire"}
            explanation={"Buy crypto easily through your bank account."}
            darkImage={require("../../../../assets/images/icons/bank-wire-dark.png")}
            lightImage={require("../../../../assets/images/icons/bank-wire-light.png")}
            onPress={() => actions.navigateTo("GetCoinsGem")}
          />
        )}

        <SimplexPaymentsHistory />

        <GetCoinsInfoModal actions={actions} />
      </RegularLayout>
    );
  }
}

export default GetCoinsLanding;
