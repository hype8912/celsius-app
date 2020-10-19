import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import ConfirmWithdrawalDetailsModalStyle from "./ConfirmWithdrawalDetailsModal.styles";
import CelModal from "../CelModal/CelModal.js";
import { MODALS } from "../../../constants/UI";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Separator from "../../atoms/Separator/Separator";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import addressUtil from "../../../utils/address-util";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import CelButton from "../../atoms/CelButton/CelButton";
import { SCREENS } from "../../../constants/SCREENS";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ConfirmWithdrawalDetailsModal extends Component {
  static propTypes = {
    walletSummary: PropTypes.instanceOf(Object),
    actions: PropTypes.instanceOf(Object),
    formData: PropTypes.instanceOf(Object),
    callsInProgress: PropTypes.instanceOf(Array),
    withdrawalSettings: PropTypes.instanceOf(Object),
    loyaltyInfo: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  componentDidMount() {
    const { actions, formData } = this.props;
    if (formData.coin === "CEL") actions.getLoyaltyInfo();
  }

  renderInfoBox = () => {
    const { walletSummary, formData, loyaltyInfo, actions } = this.props;
    const style = ConfirmWithdrawalDetailsModalStyle();
    const coinData =
      formData.coin &&
      walletSummary.coins.filter(
        c => c.short === formData.coin.toUpperCase()
      )[0];
    const newBalance = coinData && coinData.amount.minus(formData.amountCrypto);

    const disclaimerText =
      "Follow instructions in email to complete this withdrawal.";
    // if (
    //   Number(formData.amountUsd) >
    //   Number(withdrawalSettings.maximum_withdrawal_amount)
    // ) {
    //   disclaimerText +=
    //     " Please note that withdrawals might be delayed for twenty-four (24) hours due to our security protocols.";
    // }

    if (
      formData.coin === "CEL" &&
      loyaltyInfo &&
      newBalance.isLessThan(loyaltyInfo.min_for_tier)
    ) {
      return (
        <View style={style.separator}>
          <InfoBox
            backgroundColor={getColor(COLOR_KEYS.ALERT_STATE)}
            padding="15 15 15 15"
            color="white"
            size={"75%"}
          >
            <CelText color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}>
              Withdrawing CEL will affect your{" "}
              <CelText weight="bold" color="white">
                {loyaltyInfo.tier.title} Loyalty level
              </CelText>{" "}
              and lower your{" "}
              <CelText weight="bold" color="white">
                HODL ratio
              </CelText>{" "}
              . Are you sure that you want to withdraw?
            </CelText>
          </InfoBox>
        </View>
      );
    }
    return (
      <View style={[style.amountWrapper, style.margin]}>
        <CelText margin={"0 0 10 0"} align="center">
          {disclaimerText}
        </CelText>
        <Card
          size={"threeQuarters"}
          styles={{ alignItems: "flex-start" }}
          color={getColor(COLOR_KEYS.TAB_SELECTED)}
        >
          <CelText color={COLOR_KEYS.WHITE} weight={"500"} type={"H4"}>
            Borrow like the Billionaires
          </CelText>
          <CelText margin={"0 0 10 0"} color={COLOR_KEYS.WHITE} weight={"200"} type={"H5"}>
            Selling crypto can cost up to X% in taxes. Borrow without letting go of your coins and get fast cash without the added tax.
          </CelText>
          <CelButton
            size={"small"}
            color={COLOR_KEYS.WHITE}
            textColor={getColor(COLOR_KEYS.TAB_SELECTED)}
            onPress={() => {
              actions.closeModal();
              actions.navigateTo(SCREENS.BORROW_LANDING);
            }}
          >
            Apply For Loan
          </CelButton>
        </Card>
      </View>
    );
  };

  withdraw = () => {
    const { actions } = this.props;
    actions.closeModal();
    actions.navigateTo(SCREENS.VERIFY_PROFILE, {
      onSuccess: () => {
        actions.withdrawCrypto();
        mixpanelAnalytics.userInitiatingLoanOnWithdrawConfirm();
      },
    });
  };

  render() {
    const style = ConfirmWithdrawalDetailsModalStyle();
    const { walletSummary, formData, callsInProgress } = this.props;

    const coinData =
      formData.coin &&
      walletSummary.coins.find(c => c.short === formData.coin.toUpperCase());

    const newBalanceCrypto =
      coinData && coinData.amount.minus(formData.amountCrypto);
    const newBalanceUsd =
      coinData && coinData.amount_usd.minus(formData.amountUsd);

    const isLoading = apiUtil.areCallsInProgress(
      [API.WITHDRAW_CRYPTO],
      callsInProgress
    );

    const address =
      formData.coin &&
      addressUtil.joinAddressTag(
        formData.coin.toLowerCase(),
        formData.withdrawAddress,
        formData.coinTag
      );

    const InfoBoxCmp = this.renderInfoBox;
    return (
      <CelModal
        style={style.container}
        name={MODALS.CONFIRM_WITHDRAWAL_DETAILS_MODAL}
      >
        <View style={{ paddingHorizontal: 20, flexWrap: "wrap" }}>
          <View>
            <CelText
              align="center"
              type="H3"
              weight={"600"}
              margin={"0 0 10 0"}
            >
              Confirm Withdrawal Details
            </CelText>
            <CelText align="center" type="H4" margin={"0 0 5 0"}>
              You are about to withdraw
            </CelText>
            <CelText align="center" type="H2" weight={"600"} margin={"0 0 5 0"}>
              {formatter.crypto(formData.amountCrypto, formData.coin, {
                precision: 8,
              })}
            </CelText>
            <CelText align="center" type="H3" margin={"0 0 10 0"}>
              {formatter.usd(formData.amountUsd)}
            </CelText>
          </View>
          <View style={style.separator}>
            <Separator />
          </View>
          <View style={style.amountWrapper}>
            <View style={style.address}>
              <CelText type="H7">New wallet balance:</CelText>
              <CelText
                style={style.lineHeight}
                type="H5"
                weight="bold"
                color={getColor(COLOR_KEYS.HEADLINE)}
              >
                {formatter.crypto(newBalanceCrypto, formData.coin)} |{" "}
                {formatter.usd(newBalanceUsd)}
              </CelText>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Separator />
            </View>
            <View style={style.address}>
              <CelText type="H7">Withdrawal address:</CelText>
              <CelText
                type="H5"
                weight="bold"
                margin={"0 5 0 5"}
                align={"center"}
                color={getColor(COLOR_KEYS.HEADLINE)}
              >
                {address}
              </CelText>
            </View>
          </View>
        </View>
        <InfoBoxCmp />
        <View style={style.buttonsWrapper}>
          <CelModalButton
            margin="10 0 0 0"
            loading={isLoading}
            onPress={() => this.withdraw()}
          >
            Send email verification
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default ConfirmWithdrawalDetailsModal;
