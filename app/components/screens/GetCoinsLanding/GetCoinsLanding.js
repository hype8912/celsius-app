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
import BuyCoinsPaymentsHistory from "../../molecules/BuyCoinsPaymentsHistory/BuyCoinsPaymentsHistory";
import { KYC_STATUSES } from "../../../constants/DATA";
import { hasPassedKYC } from "../../../utils/user-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import store from "../../../redux/store";

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
    right: "info",
    onInfo: () => {
      store.dispatch(appActions.openModal(MODALS.GET_COINS_INFO_MODAL));
    },
  });

  componentDidMount() {
    const { actions, navHistory } = this.props;
    actions.openModal(MODALS.GET_COINS_INFO_MODAL);
    mixpanelAnalytics.navigatedToBuyCoins(navHistory[0]);
  }

  pressCreditCard = () => {
    const { actions, formData } = this.props;
    actions.initForm({
      cryptoCoin: formData.selectedCoin || "ETH",
      fiatCoin: "USD",
      simplexData: {
        paymentMethod: "Credit Card",
      },
    });
    actions.navigateTo("GetCoinsEnterAmount");
    mixpanelAnalytics.choseBuyCoinsType("CARD");
  };

  pressBankWire = () => {
    const { actions } = this.props;
    actions.navigateTo("GetCoinsGem");
    mixpanelAnalytics.choseBuyCoinsType("WIRE");
  };

  render() {
    const { actions, kycStatus, simplexCompliance, gemCompliance } = this.props;

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
            unicornImage={require("../../../../assets/images/icons/credit-card-unicorn.png")}
            onPress={this.pressCreditCard}
          />
        )}

        {gemCompliance.allowed && (
          <MultiInfoCardButton
            textButton={"Bank Transfer"}
            explanation={"Buy crypto easily through your bank account."}
            darkImage={require("../../../../assets/images/icons/bank-wire-dark.png")}
            lightImage={require("../../../../assets/images/icons/bank-wire-light.png")}
            unicornImage={require("../../../../assets/images/icons/bank-wire-unicorn.png")}
            onPress={this.pressBankWire}
          />
        )}

        <BuyCoinsPaymentsHistory />

        <GetCoinsInfoModal actions={actions} />
      </RegularLayout>
    );
  }
}

export default GetCoinsLanding;
