import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Permissions } from 'expo'

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
import WithdrawWarningModal from "../../organisms/WithdrawWarningModal/WithdrawWarningModal";


@connect(
  state => ({
    walletSummary: state.wallet.summary,
    formData: state.forms.formData
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawCreateAddress extends Component {

  static navigationOptions = () => ({
    title: "Withdrawal address",
    right: "profile"
  })

  constructor(props) {
    super(props);

    const { formData, walletSummary } = props;
    const coin = formData.coin;
    const coinData = walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];

    this.state = {
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd,
    };
  }

  getCameraPermissions = async () => {
    let perm = await Permissions.getAsync(Permissions.CAMERA)

    if (perm.status !== 'granted') {
      perm = await Permissions.askAsync(Permissions.CAMERA)
    }
  }

  handleScan = (code) => {
    const { actions } = this.props;
    const address = addressUtil.splitAddressTag(code)
    actions.updateFormField("withdrawAddress", address.newAddress);
    actions.updateFormField("coinTag", address.newTag);
  };


  handleScanClick = async () => {
    const { actions } = this.props;

    await this.getCameraPermissions()
    actions.navigateTo("QRScanner", {
      onScan: this.handleScan
    });
  };

  handeConfirmWithdrawal = () => {
    const { actions, formData } = this.props


    if (!formData.coinTag && ['XRP', 'XLM'].includes(formData.coin)) {
      actions.openModal(MODALS.WITHDRAW_WARNING_MODAL)
    } else {
      actions.navigateTo("VerifyProfile", {
        onSuccess: actions.setCoinWithdrawalAddress
      })
    }
  }

  handleConfirmWithdrawalFromModal = () => {
    const { actions } = this.props

    actions.navigateTo("VerifyProfile", {
      onSuccess: actions.setCoinWithdrawalAddress
    })
    actions.closeModal()
  }


  render() {
    const { coin, balanceCrypto, balanceUsd } = this.state;
    const { formData } = this.props;
    const style = WithdrawalAddressConfirmationStyle();
    let tagText;
    let placeHolderText;


    if (formData.coin && formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin && formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    }

    const explainText = `Your ${formData.coin} withdrawal address is not set. Please, enter the address, or scan QR code.`;
    const hasTag = addressUtil.hasCoinTag(formData.coin)

    return (
      <RegularLayout>
        <BalanceView opacity={0.65} coin={coin} crypto={balanceCrypto} usd={balanceUsd} />

        <View style={style.coinAmountContainer}>
          <CelText type={"H2"}>{formData.coin}</CelText>
          <CelText type={"H1"} weight={"semi-bold"}>{formatter.getEllipsisAmount(formData.amountCrypto, -5)}</CelText>
          <CelText color={"gray"} type={"H3"}>{formatter.usd(formData.amountUsd)}</CelText>
        </View>

        <View style={style.containerWithMargin}>
          <CelText type={"H4"}>{explainText}</CelText>
        </View>

        <CelInput
          field="withdrawAddress"
          placeholder={"Withdrawal address"}
          value={formData.withdrawAddress}
          type='text-area'
          multiline
          numberOfLines={formData.withdrawAddress ? 3 : 1}
          returnKeyType={hasTag ? "next" : "done"}
          blurOnSubmiting={!hasTag}
          onSubmitEditing={() => { if (hasTag) this.tag.focus() }}
        />

        <View style={style.containerWithMargin}>
          <TouchableOpacity onPress={this.handleScanClick}>
            <CelText type={"H5"} style={style.tagText}>Scan QR Code</CelText>
          </TouchableOpacity>
        </View>

        {!!hasTag &&
          <React.Fragment>
            <CelInput
              placeholder={placeHolderText}
              value={formData.coinTag}
              field={`coinTag`}
              margin={"10 0 10 0"}
              refs={(input) => { this.tag = input }}
            />
            <View style={{ marginBottom: 10, alignSelf: "flex-start" }}>
              <CelText type={"H5"} style={style.tagText}>{tagText}</CelText>
            </View>
          </React.Fragment>
        }
        {formData.coin && cryptoUtil.isERC20(formData.coin.toLowerCase()) ?
          <InfoBox
            color={"white"}
            backgroundColor={STYLES.COLORS.ORANGE}
            titleText={"Note: we use a smart-contract to send ERC20 tokens, some wallets do not support such transactions."}
            left
          />
          :
          <InfoBox
            color={"white"}
            backgroundColor={STYLES.COLORS.ORANGE}
            titleText={"Changing your withdrawal address will make a withdrawal of your coin unavailable for 24 hours."}
            left
          />
        }
        <View style={style.button}>
          <CelButton
            disabled={!formData.withdrawAddress}
            onPress={this.handeConfirmWithdrawal}
          >
            Confirm withdrawal
          </CelButton>
        </View>


        <WithdrawWarningModal coin={formData.coin} navigateNext={this.handleConfirmWithdrawalFromModal} />
      </RegularLayout>
    );
  }
}

export default WithdrawCreateAddress
