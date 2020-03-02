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
    navHistory: state.nav.history,
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
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
    const { actions, navHistory, navigation } = this.props;
    actions.openModal(MODALS.GET_COINS_INFO_MODAL);
    mixpanelAnalytics.navigatedToBuyCoins(navHistory[0]);
    const coin = navigation.getParam("coin");
    if (coin) {
      actions.updateFormField("coin", coin);
    }
  }

  render() {
    const { actions, kycStatus } = this.props;


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

    return (
      <RegularLayout>
        <MultiInfoCardButton
          textButton={"Credit Card"}
          explanation={"Buy crypto easily using your credit card."}
          darkImage={require("../../../../assets/images/icons/credit-card-dark.png")}
          lightImage={require("../../../../assets/images/icons/credit-card-light.png")}
          onPress={() => {
            actions.updateFormField("simplexData", {
              paymentMethod: "Credit Card",
            });
            actions.navigateTo("GetCoinsEnterAmount");
            mixpanelAnalytics.choseBuyCoinsType("CARD");
          }}
        />
        <MultiInfoCardButton
          textButton={"Bank Wire"}
          explanation={"Buy crypto easily through your bank account."}
          darkImage={require("../../../../assets/images/icons/bank-wire-dark.png")}
          lightImage={require("../../../../assets/images/icons/bank-wire-light.png")}
          label={"COMING SOON!"}
          disabled
        />

        <SimplexPaymentsHistory/>

        <GetCoinsInfoModal actions={actions}/>
      </RegularLayout>
    );
  }
}

export default GetCoinsLanding;
