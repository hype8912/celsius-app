import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../../redux/actions";
import RegisterPromoCodeModalStyle from "./RegisterPromoCodeModal.styles";
import CelText from "../../../atoms/CelText/CelText";
import { MODALS } from "../../../../constants/UI";
import CelModal from "../../../organisms/CelModal/CelModal";
import CelInput from "../../../atoms/CelInput/CelInput";
import CelButton from "../../../atoms/CelButton/CelButton";
import { BRANCH_LINKS } from "../../../../constants/DATA";
import Card from "../../../atoms/Card/Card";
import STYLES from "../../../../constants/STYLES";

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    promoCode: state.branch.promoCode,
    referralLink: state.branch.registeredLink,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RegisterPromoCodeModal extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["celsius", "register"]),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      confirmed: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.updateFormFields({ promoCode: null });
  }

  proceed = () => {
    this.setState({
      confirmed: true,
    });
  };

  closeModal = () => {
    const { actions } = this.props;
    this.setState({ confirmed: false });
    actions.closeModal();
  };

  confirm = () => {
    const { actions, type } = this.props;
    if (type === "celsius") {
      actions.submitProfileCode(this.proceed);
    }

    if (type === "register") {
      actions.registrationPromoCode(this.proceed);
    }
  };

  renderUnconfirmedReferralCode = () => {
    const { formData, formErrors } = this.props;
    return (
      <View>
        <CelText
          margin={"40 0 10 0"}
          align={"center"}
          type={"H2"}
          weight="bold"
        >
          Have a referral code?
        </CelText>
        <CelText
          margin={"0 0 10 0"}
          align={"center"}
          type={"H6"}
          weight={"300"}
        >
          Enter your referral code below and follow the instructions on the next
          screen to receive your reward.
        </CelText>
        <CelInput
          type="text"
          field="promoCode"
          placeholder="Enter Referral Code"
          returnKeyType={"send"}
          value={formData.promoCode}
          error={formErrors.promoCode}
          border
          onSubmitEditing={() => this.confirm()}
        />

        <CelButton
          onPress={() => this.confirm()}
          disabled={formData.promoCode === null || formData.promoCode === ""}
        >
          Confirm
        </CelButton>
      </View>
    );
  };

  renderConfirmedReferralCode = () => {
    const { referralLink } = this.props;
    const code = {};
    let congratsText = "";

    code.amount = referralLink.referred_award_amount;
    code.coin =
      referralLink.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL
        ? "USD"
        : referralLink.referred_award_coin;

    if (referralLink.link_type === BRANCH_LINKS.INDIVIDUAL_REFERRAL) {
      congratsText =
        "Your referral code has been successfully activated. In order to receive your reward, you must:";
    }
    if (referralLink.link_type === BRANCH_LINKS.COMPANY_REFERRAL) {
      if (referralLink.referred_award_trigger === "sign-up") {
        congratsText = `You have received ${code.amount} ${code.coin}. Please sign up to see it in your wallet.`;
      }
      if (referralLink.referred_award_trigger === "passed-kyc") {
        congratsText = `You have received ${code.amount} ${code.coin}. Please pass kyc to see it in your wallet.`;
      }
      if (referralLink.referred_award_trigger === "first-deposit") {
        congratsText = `You have received ${code.amount} ${code.coin}. Please deposit additional funds into celsius wallet to see reward.`;
      }
    }

    return (
      <View>
        <CelText
          margin={"20 0 10 0"}
          align={"center"}
          type={"H2"}
          weight={"700"}
        >
          Congrats!
        </CelText>
        <CelText
          margin={"0 0 30 0"}
          align={"center"}
          type={"H5"}
          weight={"300"}
        >
          {congratsText}
        </CelText>
        <Card color={STYLES.COLORS.LIGHT_GRAY}>
          <CelText margin={"10 0 10 0"} type={"H6"} weight={"300"}>
            1. Complete KYC (Identity Verification).
          </CelText>
          <CelText margin={"10 0 10 0"} type={"H6"} weight={"300"}>
            2. Receive confirmation of account verification.
          </CelText>
          <CelText margin={"10 0 10 0"} type={"H6"} weight={"300"}>
            3. Deposit $200 or more worth of coins to your Celsius wallet.
          </CelText>
        </Card>

        <CelButton
          onPress={() => {
            this.closeModal();
          }}
        >
          Done
        </CelButton>
      </View>
    );
  };

  renderUnconfirmedPromoCode = () => {
    const { formData, formErrors } = this.props;
    return (
      <View>
        <CelText
          margin={"40 0 10 0"}
          align={"center"}
          type={"H2"}
          weight="bold"
        >
          Have a promo code?
        </CelText>
        <CelText
          margin={"0 0 10 0"}
          align={"center"}
          type={"H6"}
          weight={"300"}
        >
          Enter your promo code below and follow the instructions on the next
          screen to receive your reward.
        </CelText>
        <CelInput
          type="text"
          field="promoCode"
          placeholder="Enter Promo Code"
          returnKeyType={"send"}
          value={formData.promoCode}
          error={formErrors.promoCode}
          border
          onSubmitEditing={() => this.confirm()}
        />

        <CelButton
          onPress={() => this.confirm()}
          disabled={formData.promoCode === null || formData.promoCode === ""}
        >
          Confirm
        </CelButton>
      </View>
    );
  };

  renderConfirmedPromoCode = () => {
    const { promoCode } = this.props;
    const code = {};

    code.amount = promoCode.referred_award_amount;
    code.coin = promoCode.referred_award_coin;
    code.maximumDays = promoCode.maximum_days_to_claim;
    code.minimumAmount = promoCode.minimum_deposit_for_reward;

    const congratsText = "You’ve successfully activated your promo code!";
    const messageText = `You’ll receive $${code.amount} in ${code.coin} when you deposit $${code.minimumAmount} or more within the next ${code.maximumDays} days.`;

    return (
      <View>
        <CelText
          margin={"20 0 10 0"}
          align={"center"}
          type={"H2"}
          weight={"700"}
        >
          Congrats!
        </CelText>
        <CelText
          margin={"0 0 30 0"}
          align={"center"}
          type={"H5"}
          weight={"300"}
        >
          {congratsText}
        </CelText>
        <Card color={STYLES.COLORS.LIGHT_GRAY}>
          <CelText margin={"10 0 10 0"} type={"H6"} weight={"300"}>
            {messageText}
          </CelText>
        </Card>

        <CelButton
          onPress={() => {
            this.closeModal();
          }}
        >
          Done
        </CelButton>
      </View>
    );
  };

  renderModal = () => {
    const { confirmed } = this.state;
    const { referralLink, type } = this.props;
    // Promo code
    if (type === "celsius") {
      if (confirmed) return this.renderConfirmedPromoCode();
      return this.renderUnconfirmedPromoCode();
    }
    // Referral code
    if (type === "register") {
      if (confirmed || referralLink) return this.renderConfirmedReferralCode();
    }
    return this.renderUnconfirmedReferralCode();
  };

  render() {
    const { confirmed } = this.state;
    const style = RegisterPromoCodeModalStyle();
    return (
      <CelModal
        noScroll
        onClose={() => {
          this.setState({ confirmed: false });
        }}
        picture={
          confirmed
            ? require("../../../../../assets/images/checkmark-circle.png")
            : require("../../../../../assets/images/gift-circle.png")
        }
        name={MODALS.REGISTER_PROMO_CODE_MODAL}
        style={style.container}
      >
        {this.renderModal()}
      </CelModal>
    );
  }
}

export default RegisterPromoCodeModal;
