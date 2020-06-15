import React, { Component } from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RESULTS } from "react-native-permissions";

import cryptoUtil from "../../../utils/crypto-util";
import { MODALS } from "../../../constants/UI";
import addressUtil from "../../../utils/address-util";
import * as appActions from "../../../redux/actions";
import WithdrawalAddressConfirmationStyle from "./WithdrawCreateAddress.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import CelInput from "../../atoms/CelInput/CelInput";
import WithdrawWarningModal from "../../modals/WithdrawWarningModal/WithdrawWarningModal";
import MemoIdModal from "../../modals/MemoIdModal/MemoIdModal";
import ConfirmWithdrawalAddressModal from "../../modals/ConfirmWithdrawalAddressModal/ConfirmWithdrawalAddressModal";
import DestinationInfoTagModal from "../../modals/DestinationInfoTagModal/DestinationInfoTagModal";
import {
  ALL_PERMISSIONS,
  requestForPermission,
} from "../../../utils/device-permissions";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    formData: state.forms.formData,
    is2FAEnabled: state.user.profile.two_factor_enabled,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawCreateAddress extends Component {
  static navigationOptions = () => ({
    title: "Withdrawal address",
    right: "profile",
  });

  constructor(props) {
    super(props);

    const { formData, walletSummary } = props;
    const coin = formData.coin;
    const coinData = walletSummary.coins.filter(
      c => c.short === coin.toUpperCase()
    )[0];

    this.state = {
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd,
    };
  }

  handleScan = code => {
    const { actions } = this.props;
    const address = addressUtil.splitAddressTag(code);
    actions.updateFormField("withdrawAddress", address.newAddress);
    actions.updateFormField("coinTag", address.newTag);
  };

  handleScanClick = async () => {
    const { actions } = this.props;
    const perm = await requestForPermission(ALL_PERMISSIONS.CAMERA);
    if (perm === RESULTS.GRANTED) {
      actions.navigateTo("QRScanner", {
        onScan: this.handleScan,
      });
    } else {
      actions.showMessage(
        "info",
        "You need enable camera permissions in device settings in order to scan a QR code."
      );
    }
  };

  handleConfirmWithdrawal = () => {
    const { actions, formData } = this.props;

    if (!formData.coinTag && ["XRP", "XLM", "EOS"].includes(formData.coin)) {
      actions.openModal(MODALS.WITHDRAW_WARNING_MODAL);
    } else {
      actions.navigateTo("VerifyProfile", {
        onSuccess: () => actions.setCoinWithdrawalAddress(),
      });
      actions.closeModal();
    }
  };

  handleConfirmWithdrawalFromModal = () => {
    const { actions } = this.props;

    actions.navigateTo("VerifyProfile", {
      onSuccess: actions.setCoinWithdrawalAddress,
    });
    actions.closeModal();
  };

  render() {
    const { coin, balanceCrypto, balanceUsd } = this.state;
    const { formData, actions, is2FAEnabled } = this.props;
    const style = WithdrawalAddressConfirmationStyle();
    let tagText;
    let placeHolderText;

    if (formData.coin && formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin && formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    } else if (formData.coin && formData.coin.toLowerCase() === "eos") {
      tagText = "What is EOS Memo Id";
      placeHolderText = "Memo Id";
    }

    const explainText = `Your ${formData.coin} withdrawal address is not set. Please, enter the address, or scan QR code.`;
    const hasTag = addressUtil.hasCoinTag(formData.coin);

    return (
      <RegularLayout padding="0 0 0 0">
        <View style={style.container}>
          <BalanceView
            opacity={0.65}
            coin={coin}
            crypto={balanceCrypto}
            usd={balanceUsd}
          />
          <View style={style.wrapper}>
            <View style={style.coinAmountContainer}>
              <CelText type={"H2"}>{formData.coin}</CelText>
              <CelText type={"H1"} weight={"semi-bold"}>
                {formatter.getEllipsisAmount(formData.amountCrypto, -5)}
              </CelText>
              <CelText color={"gray"} type={"H3"}>
                {formatter.usd(formData.amountUsd)}
              </CelText>
            </View>

            <View style={style.containerWithMargin}>
              <CelText type={"H4"}>{explainText}</CelText>
            </View>

            <CelInput
              field="withdrawAddress"
              placeholder={"Withdrawal address"}
              value={formData.withdrawAddress}
              multiline
              numberOfLines={2}
              type="text-area"
              returnKeyType={hasTag ? "next" : "done"}
              blurOnSubmit={!hasTag}
              onSubmitEditing={() =>
                hasTag ? this.tag.focus() : Keyboard.dismiss()
              }
            />

            <View style={style.containerWithMargin}>
              <TouchableOpacity onPress={this.handleScanClick}>
                <CelText type={"H5"} style={style.tagText}>
                  Scan QR Code
                </CelText>
              </TouchableOpacity>
            </View>

            {!!hasTag && (
              <React.Fragment>
                <CelInput
                  placeholder={placeHolderText}
                  value={formData.coinTag}
                  field={`coinTag`}
                  margin={"10 0 10 0"}
                  refs={input => {
                    this.tag = input;
                  }}
                />
                <View style={{ marginBottom: 10, alignSelf: "flex-start" }}>
                  <TouchableOpacity
                    onPress={() =>
                      formData.coin.toLowerCase() === "xrp"
                        ? actions.openModal(MODALS.DESTINATION_TAG_MODAL)
                        : actions.openModal(MODALS.MEMO_ID_MODAL)
                    }
                  >
                    <CelText type={"H5"} style={style.tagText}>
                      {tagText}
                    </CelText>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
            {formData.coin &&
            cryptoUtil.isERC20(formData.coin.toLowerCase()) ? (
              <InfoBox
                color={"white"}
                backgroundColor={STYLES.COLORS.ORANGE}
                titleText={
                  is2FAEnabled
                    ? "Note: we use a smart-contract to send ERC20 tokens, some wallets do not support such transactions."
                    : "Due to not having 2FA set, for security reasons, withdrawal address will be locked for 24 hours. \n " +
                      " \nNote: we use a smart-contract to send ERC20 tokens, some wallets do not support such transactions."
                }
                left
              />
            ) : (
              <InfoBox
                color={"white"}
                backgroundColor={STYLES.COLORS.ORANGE}
                titleText={
                  is2FAEnabled
                    ? "Changing your withdrawal address will make a withdrawal of your coin unavailable for 24 hours."
                    : "Due to not having 2FA set, for security reasons, withdrawal address will be locked for 24 hours."
                }
                left
              />
            )}
            {is2FAEnabled && (
              <View style={style.button}>
                <CelButton
                  disabled={!formData.withdrawAddress}
                  // onPress={this.handeConfirmWithdrawal}
                  onPress={() =>
                    actions.openModal(MODALS.CONFIRM_WITHDRAWAL_ADDRESS_MODAL)
                  }
                >
                  Confirm withdrawal
                </CelButton>
              </View>
            )}

            {!is2FAEnabled && (
              <View style={style.button}>
                <CelButton
                  onPress={() => {
                    actions.navigateTo("VerifyProfile", {
                      onSuccess: () =>
                        actions.setCoinWithdrawalAddress("wallet"),
                    });
                  }}
                >
                  Confirm address
                </CelButton>
              </View>
            )}

            <WithdrawWarningModal
              coin={formData.coin}
              navigateNext={this.handleConfirmWithdrawalFromModal}
            />
            <MemoIdModal coin={formData.coin} closeModal={actions.closeModal} />
            <DestinationInfoTagModal closeModal={actions.closeModal} />
            <ConfirmWithdrawalAddressModal
              handleConfirmWithdrawal={this.handleConfirmWithdrawal}
            />
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default WithdrawCreateAddress;
