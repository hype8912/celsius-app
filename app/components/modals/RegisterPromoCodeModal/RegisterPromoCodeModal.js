import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import RegisterPromoCodeModalStyle from "./RegisterPromoCodeModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS, THEMES } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import CelInput from "../../atoms/CelInput/CelInput";
import { DEEP_LINKS } from "../../../constants/DATA";
import Card from "../../atoms/Card/Card";
import * as appActions from "../../../redux/actions";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import { getColor, getTheme } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const theme = getTheme();

@connect(
  state => ({
    formData: state.forms.formData,
    formErrors: state.forms.formErrors,
    code: state.branch.code,
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
      loading: false,
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.updateFormFields({
      promoCode: null,
      code: null,
    });
  }

  proceed = () => {
    this.setState({
      confirmed: true,
      loading: false,
    });
  };

  hasError = () => {
    this.setState({ loading: false });
  };

  closeModal = () => {
    const { actions } = this.props;
    this.setState({
      confirmed: false,
      loading: false,
    });
    actions.closeModal();
  };

  confirm = () => {
    const { actions, type } = this.props;
    this.setState({ loading: true });
    if (type === "celsius") {
      // actions.submitProfileCode(this.proceed);
      actions.submitPromoCode(this.proceed, this.hasError);
    }

    if (type === "register") {
      actions.registrationPromoCode(this.proceed);
    }
  };

  renderUnconfirmedReferralCode = () => {
    const { formData, formErrors } = this.props;
    const { loading } = this.state;
    const style = RegisterPromoCodeModalStyle();

    return (
      <View>
        <CelText
          margin={"0 25 10 25"}
          align={"center"}
          type={"H2"}
          weight="bold"
        >
          Have a referral code?
        </CelText>
        <CelText
          margin={"0 25 10 25"}
          align={"center"}
          type={"H4"}
          weight={"300"}
        >
          Enter your referral code below and follow the instructions on the next
          screen to receive your reward.
        </CelText>
        <View style={style.inputWrapper}>
          <CelInput
            type="text"
            field="promoCode"
            placeholder="Enter Referral Code"
            returnKeyType={"send"}
            value={formData.promoCode}
            error={formErrors.promoCode}
            border={theme !== THEMES.DARK}
            onSubmitEditing={() => this.confirm()}
            basic={theme === THEMES.DARK ? true : null}
          />
        </View>
        <View style={style.buttonWrapper}>
          <CelModalButton
            onPress={() => this.confirm()}
            loading={loading}
            buttonStyle={
              formData.promoCode === null || formData.promoCode === ""
                ? "disabled"
                : "basic"
            }
          >
            Confirm
          </CelModalButton>
        </View>
      </View>
    );
  };

  renderConfirmedReferralCode = () => {
    const { referralLink } = this.props;
    const code = {};
    let congratsText = "";
    const style = RegisterPromoCodeModalStyle();

    code.amount = referralLink.referred_award_amount;
    code.coin =
      referralLink.link_type === DEEP_LINKS.INDIVIDUAL_REFERRAL
        ? "USD"
        : referralLink.referred_award_coin;

    if (referralLink.link_type === DEEP_LINKS.INDIVIDUAL_REFERRAL) {
      congratsText =
        "Your referral code has been successfully activated. In order to receive your reward, you must:";
    }
    if (referralLink.link_type === DEEP_LINKS.COMPANY_REFERRAL) {
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
          margin={"0 25 10 25"}
          align={"center"}
          type={"H2"}
          weight={"700"}
        >
          Congrats!
        </CelText>
        <CelText
          margin={"0 25 30 25"}
          align={"center"}
          type={"H4"}
          weight={"300"}
        >
          {congratsText}
        </CelText>
        <View style={style.cardWrapper}>
          <Card color={getColor(COLOR_KEYS.BACKGROUND)} noBorder>
            <CelText margin={"10 25 10 25"} type={"H6"} weight={"300"}>
              1. Complete KYC (Identity Verification).
            </CelText>
            <CelText margin={"10 25 10 25"} type={"H6"} weight={"300"}>
              2. Receive confirmation of account verification.
            </CelText>
            <CelText margin={"10 25 10 25"} type={"H6"} weight={"300"}>
              3. Deposit $200 or more worth of coins to your Celsius wallet.
            </CelText>
          </Card>
        </View>

        <View style={style.buttonWrapper}>
          <CelModalButton
            onPress={() => {
              this.closeModal();
            }}
          >
            Done
          </CelModalButton>
        </View>
      </View>
    );
  };

  renderUnconfirmedPromoCode = () => {
    const { formData, formErrors } = this.props;
    const { loading } = this.state;
    const style = RegisterPromoCodeModalStyle();

    return (
      <View>
        <CelText
          margin={"0 25 10 25"}
          align={"center"}
          type={"H2"}
          weight="bold"
        >
          Have a promo code?
        </CelText>
        <CelText
          margin={"0 25 10 25"}
          align={"center"}
          type={"H4"}
          weight={"300"}
        >
          Enter your promo code below and follow the instructions on the next
          screen to receive your reward.
        </CelText>
        <View style={style.inputWrapper}>
          <CelInput
            type="text"
            field="promoCode"
            placeholder="Enter Promo Code"
            returnKeyType={"send"}
            value={formData.promoCode}
            error={formErrors.promoCodeError && formErrors.promoCodeError.msg}
            border={theme !== THEMES.DARK}
            onSubmitEditing={() => this.confirm()}
            basic={theme === THEMES.LIGHT ? true : null}
          />
        </View>
        <View style={style.buttonWrapper}>
          <CelModalButton
            onPress={() => this.confirm()}
            loading={loading}
            buttonStyle={
              formData.promoCode === null || formData.promoCode === ""
                ? "disabled"
                : "basic"
            }
          >
            Confirm
          </CelModalButton>
        </View>
      </View>
    );
  };

  renderConfirmedPromoCode = () => {
    const { code } = this.props;
    const style = RegisterPromoCodeModalStyle();
    const title = "Hooray!";
    const subtitle = "Promo code has been added to your profile!";
    const description = code.description;

    return (
      <View>
        <CelText
          margin={"0 25 10 25"}
          align={"center"}
          type={"H2"}
          weight={"700"}
        >
          {title}
        </CelText>
        <CelText
          margin={"0 25 15 25"}
          align={"center"}
          type={"H4"}
          weight={"300"}
        >
          {subtitle}
        </CelText>

        <View style={style.cardWrapper}>
          <Card color={getColor(COLOR_KEYS.BACKGROUND)} noBorder>
            <CelText margin={"10 0 10 0"} type={"H6"} weight={"300"}>
              {description}
            </CelText>
          </Card>
        </View>

        <View style={style.buttonWrapper}>
          <CelModalButton
            onPress={() => {
              this.closeModal();
            }}
          >
            Done
          </CelModalButton>
        </View>
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
    const style = RegisterPromoCodeModalStyle();

    return (
      <CelModal
        style={style.container}
        name={MODALS.REGISTER_PROMO_CODE_MODAL}
        onClose={this.closeModal}
      >
        {this.renderModal()}
      </CelModal>
    );
  }
}

export default RegisterPromoCodeModal;
