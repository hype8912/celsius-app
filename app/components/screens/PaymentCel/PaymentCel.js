import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

// import PaymentCelStyle from "./PaymentCel.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
    loanSettings: state.loans.loanSettings,
    allLoans: state.loans.allLoans,
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

      return actions.navigateTo("LoanSettings");
    }

    actions.navigateTo("LoanPrepaymentPeriod", { coin: "CEL", id });
  };

  payInCel = async () => {
    const { actions, navigation } = this.props;
    const reason = navigation.getParam("reason");
    const id = navigation.getParam("id");

    if (reason === LOAN_PAYMENT_REASONS.INTEREST_PREPAYMENT) {
      actions.updateFormField("coin", "CEL");
      actions.navigateTo("LoanPrepaymentPeriod", { id, reason });
    }

    if (reason === LOAN_PAYMENT_REASONS.INTEREST) {
      this.setState({ isLoading: true });
      await actions.updateLoanSettings(id, { interest_payment_asset: "CEL" });
      actions.showMessage(
        "success",
        "You have successfully changed interest payment method"
      );
      actions.navigateTo("ChoosePaymentMethod", { id, reason });
      this.setState({ isLoading: false });
    }

    if (reason === LOAN_PAYMENT_REASONS.MANUAL_INTEREST) {
      actions.navigateTo("VerifyProfile", {
        onSuccess: () => actions.payMonthlyInterest(id, "CEL"),
      });
    }
  };

  render() {
    // const style = PaymentCelCelStyle();
    const { actions, loyaltyInfo, navigation, allLoans } = this.props;
    const { isLoading } = this.state;
    const id = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === id);
    const celDiscount = formatter.percentageDisplay(
      loyaltyInfo.tier.loanInterestBonus
    );
    const discountedInterest =
      (1 - loyaltyInfo.tier.loanInterestBonus) * Number(loan.monthly_payment);

    return (
      <RegularLayout fabType={"hide"}>
        <Card>
          <CelText align={"center"}>
            Based on your current{" "}
            <CelText
              onPress={() => actions.navigateTo("LoyaltyProgram")}
              style={{ color: STYLES.COLORS.CELSIUS_BLUE }}
            >
              Loyalty Level
            </CelText>
            , your next interest payment would be:
          </CelText>
          <CelText type={"H1"} weight={"700"} align={"center"}>
            {celDiscount} less
          </CelText>
          <Separator margin={"10 0 12 0"} />
          <CelText>
            Decrease your monthly interest payment from{" "}
            <CelText weight={"500"}>
              {formatter.usd(loan.monthly_payment)}
            </CelText>{" "}
            to{" "}
            <CelText weight={"500"}>
              {formatter.usd(discountedInterest)}
            </CelText>{" "}
            when paying with CEL.
          </CelText>
        </Card>
        <CelButton
          margin={"20 0 0 0"}
          onPress={this.payInCel}
          loading={isLoading}
          disabled={isLoading}
        >
          Pay with CEL
        </CelButton>
      </RegularLayout>
    );
  }
}

export default PaymentCel;
