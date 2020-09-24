import React, { Component } from "react";
import { connect } from "react-redux";
import { Linking } from "react-native";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import {
  COIN_CARD_TYPE,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../constants/UI";
import PaymentCard from "../../molecules/PaymentCard/PaymentCard";
import TierCard from "../../organisms/TierCard/TierCard";
import ConfirmPaymentModal from "../../modals/ConfirmPaymentModal/ConfirmPaymentModal";
import CelText from "../../atoms/CelText/CelText";
import { SCREENS } from "../../../constants/SCREENS";
import { PAYMENT_TYPE } from "../../../constants/DATA";

@connect(
  state => ({
    loyaltyInfo: state.loyalty.loyaltyInfo,
    loanSettings: state.loans.loanSettings,
    allLoans: state.loans.allLoans,
    currencyRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PaymentCel extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const reason = navigation.getParam("reason");

    let title = "Pay with CEL";
    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      title = "Prepay with CEL";
    }

    return {
      title,
      right: "info",
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  navigate = async () => {
    const { actions, navigation } = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    if (reason) {
      await actions.updateLoanSettings(id, { interest_payment_asset: "CEL" });
      actions.showMessage(
        "success",
        "You have successfully changed interest payment method"
      );

      return actions.navigateTo(SCREENS.LOAN_SETTINGS);
    }

    actions.navigateTo(SCREENS.LOAN_PREPAYMENT_PERIOD, { coin: "CEL", id });
  };

  payInCel = async () => {
    const { actions, navigation } = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      actions.updateFormField("coin", "CEL");
      actions.navigateTo(SCREENS.LOAN_PREPAYMENT_PERIOD, { id, reason });
    }

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      this.setState({ isLoading: true });
      await actions.updateLoanSettings(id, { interest_payment_asset: "CEL" });
      actions.showMessage(
        "success",
        "You have successfully changed interest payment method"
      );
      actions.navigateTo(SCREENS.CHOOSE_PAYMENT_METHOD, { id, reason });
      this.setState({ isLoading: false });
    }

    if (reason === LOAN_PAYMENT_REASONS.MANUAL_INTEREST) {
      actions.openModal(MODALS.CONFIRM_INTEREST_PAYMENT);
    }
  };

  render() {
    // const style = PaymentCelCelStyle();
    const { navigation } = this.props;
    const { allLoans, currencyRates } = this.props;
    const { isLoading } = this.state;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === id);

    const coin = currencyRates.find(c => c.short === "CEL");

    return (
      <RegularLayout fabType={"hide"}>
        <PaymentCard
          handleSelectCoin={this.payInCel}
          coin={coin}
          loan={loan}
          reason={reason}
          type={COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD}
        />
        <TierCard loanId={id} />
        <CelButton
          margin={"20 0 0 0"}
          onPress={this.payInCel}
          loading={isLoading}
          disabled={isLoading}
        >
          Confirm Payment
        </CelButton>
        <CelText
          margin={"20 0 20 0"}
          align={"center"}
          weight={"300"}
          type={"H4"}
        >
          Need help? Contact our
          <CelText
            weight={"300"}
            type={"H4"}
            link
            onPress={() => Linking.openURL("mailto:loans@celsius.network")}
          >
            {" Lending Support."}
          </CelText>
        </CelText>
        <ConfirmPaymentModal
          loanId={id}
          type={PAYMENT_TYPE.CRYPTO}
          coin={"CEL"}
        />
      </RegularLayout>
    );
  }
}

export default PaymentCel;
