import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import WithdrawConfirmStyle from "./WithdrawConfirm.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import addressUtil from "../../../utils/address-util";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    callsInProgress: state.api.callsInProgress,
    walletSummary: state.wallet.summary,
    formData: state.forms.formData,
    user: state.user.profile,
    loyaltyInfo: state.loyalty.loyaltyInfo,
    withdrawalSettings: state.generalData.withdrawalSettings,
    communityStats: state.community.stats,
    isBannerVisible: state.ui.isBannerVisible,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawConfirm extends Component {
  static navigationOptions = () => ({
    title: "Confirm withdrawal",
  });

  componentDidMount() {
    const { actions, formData } = this.props;
    if (formData.coin === "CEL") actions.getLoyaltyInfo();
  }

  renderInfoBox = () => {
    const { walletSummary, formData, loyaltyInfo } = this.props;
    const coinData =
      formData.coin &&
      walletSummary.coins.filter(
        c => c.short === formData.coin.toUpperCase()
      )[0];
    const newBalance = coinData && coinData.amount.minus(formData.amountCrypto);

    if (
      formData.coin === "CEL" &&
      loyaltyInfo &&
      newBalance.isLessThan(loyaltyInfo.min_for_tier)
    ) {
      return (
        <InfoBox
          backgroundColor={getColor(COLOR_KEYS.ALERT_STATE)}
          padding="15 15 15 15"
          color="white"
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
      );
    }

    return null;
  };

  render() {
    const {
      walletSummary,
      actions,
      formData,
      callsInProgress,
      withdrawalSettings,
    } = this.props;

    const styles = WithdrawConfirmStyle();

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

    let disclaimerText =
      "Follow instructions in email to complete this withdrawal.";
    if (
      Number(formData.amountUsd) >
      Number(withdrawalSettings.maximum_withdrawal_amount)
    ) {
      disclaimerText +=
        " Please note that withdrawals might be delayed for twenty-four (24) hours due to our security protocols.";
    }

    return (
      <RegularLayout>
        <Card padding="12 12 12 12">
          <View>
            <View style={styles.amountWrapper}>
              <CelText align="center" type="H5">
                You are about to withdraw
              </CelText>
              <CelText align="center" type="H1">
                {formatter.usd(formData.amountUsd)}
              </CelText>
              <CelText align="center" type="H2">
                {formatter.crypto(formData.amountCrypto, formData.coin, {
                  precision: 8,
                })}
              </CelText>
            </View>
            <Separator />
            <View style={styles.address}>
              <CelText type="H6">New wallet balance:</CelText>
              <CelText
                style={styles.lineHeight}
                type="H4"
                weight="bold"
                color={getColor(COLOR_KEYS.HEADLINE)}
              >
                {formatter.crypto(newBalanceCrypto, formData.coin)} |{" "}
                {formatter.usd(newBalanceUsd)}
              </CelText>
            </View>
            <Separator />
            <View style={styles.address}>
              <CelText type="H6">Withdrawal address:</CelText>
              <View>
                <CelText
                  style={[styles.lineHeight]}
                  type="H4"
                  weight="bold"
                  margin={"0 5 0 5"}
                  color={getColor(COLOR_KEYS.HEADLINE)}
                >
                  {address}
                </CelText>
              </View>
            </View>
          </View>
          <InfoBoxCmp />
          <CelButton
            margin="10 0 0 0"
            loading={isLoading}
            onPress={actions.withdrawCrypto}
          >
            Send email verification
          </CelButton>
          <CelText align="center" margin="20 0 20 0">
            {disclaimerText}
          </CelText>
        </Card>
      </RegularLayout>
    );
  }
}

export default WithdrawConfirm;
