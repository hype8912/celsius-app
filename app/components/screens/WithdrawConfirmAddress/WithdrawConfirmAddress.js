import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import WithdrawalAddressStyle from "./WithdrawConfirmAddress.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import BalanceView from "../../atoms/BalanceView/BalanceView";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import InfoBox from "../../atoms/InfoBox/InfoBox";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import CelInput from "../../atoms/CelInput/CelInput";
import addressUtil from "../../../utils/address-util";
import { MODALS } from "../../../constants/UI";
import InfoModal from "../../molecules/InfoModal/InfoModal";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    formData: state.forms.formData,
    withdrawalAddresses: state.wallet.withdrawalAddresses
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WithdrawConfirmAddress extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Withdrawal address",
    right: "profile",
  });

  constructor(props) {
    super(props);

    const { formData, walletSummary, withdrawalAddresses } = props;
    const coin = formData.coin;
    const coinData = coin && walletSummary.coins.filter(c => c.short === coin.toUpperCase())[0];


    this.state = {
      coin,
      balanceCrypto: coinData.amount,
      balanceUsd: coinData.amount_usd,
      address: coin && withdrawalAddresses[coin.toUpperCase()]
    };
  }

  confirmAddress = () => {
    const { actions, withdrawalAddresses, formData } = this.props;

    actions.updateFormField("withdrawAddress", formData.coin && withdrawalAddresses[formData.coin.toUpperCase()] && withdrawalAddresses[formData.coin.toUpperCase()].address);
    actions.navigateTo("VerifyProfile", { onSuccess: () => actions.navigateTo("WithdrawConfirm") });
  };

  navigate = () => {
    const {actions} = this.props;
    actions.closeModal();
    actions.navigateTo("WithdrawAddressOverview")
  }

  render() {
    const { coin, balanceCrypto, balanceUsd, address } = this.state;
    const { formData, actions } = this.props;
    let tagText;
    let placeHolderText;

    if (formData.coin && formData.coin.toLowerCase() === "xrp") {
      tagText = "What is XRP Destination tag";
      placeHolderText = "Destination Tag";
    } else if (formData.coin && formData.coin.toLowerCase() === "xlm") {
      tagText = "What is XLM Memo Id";
      placeHolderText = "Memo Id";
    }

    // const address = formData[`${coin}WithdrawConfirmAddress`] ? addressUtil.addressTag(formData[`${coin}WithdrawConfirmAddress`]) : "";
    const style = WithdrawalAddressStyle();
    const hasTag = addressUtil.hasTag(address.address);
    const addressDisplay = addressUtil.splitAddressTag(address.address);

    return (
      <RegularLayout>
        <BalanceView opacity={0.80} coin={coin} crypto={balanceCrypto} usd={balanceUsd} />

        <View style={style.coinAmountContainer}>
          <CelText type={"H2"}>{formData.coin}</CelText>
          <CelText type={"H1"}>{formatter.getEllipsisAmount(formData.amountCrypto, -5)}</CelText>
          <CelText color={"gray"} type={"H3"}>{formatter.usd(formData.amountUsd)}</CelText>
        </View>

        <View style={style.containerWithMargin}>
          <CelText>Your coins will be sent to:</CelText>
        </View>

        <CelInput
          field={"withdrawAddress"}
          placeholder={"Withdrawal address"}
          value={addressDisplay.newAddress}
          disabled
          type='text-area'
          multiline
          numberOfLines={3}
          returnKeyType={hasTag ? "next" : "done"}
          blurOnSubmiting={!hasTag}
          onSubmitEditing={() => {if(hasTag)this.tag.focus()}}
        />

        <InfoBox
          triangle
          color={"white"}
          backgroundColor={STYLES.COLORS.ORANGE}
          titleText={"Your withdrawal address"}
          left
          explanationText={`Confirm this is the address you wish to send your funds to. If you transferred money from an exchange, this may not be the correct address. \n\nYou can change your withdrawal address from your`}
          boldText={' wallet settings.'}
        />

                {hasTag ? (
          <CelInput
            placeholder={placeHolderText}
            value={addressDisplay.newTag}
            field="coinTag"
            margin="10 0 10 0"
            disabled
            refs={(input) => {this.tag = input}}
          />
        ) : null
        }

        {hasTag ? (
          <View>
            <View style={style.containerWithMargin}>
              <CelText type={"H5"} style={style.tagText}>{tagText}</CelText>
            </View>

            <InfoBox
              left
              color={"white"}
              backgroundColor={STYLES.COLORS.ORANGE}
              titleText={"To prevent a permanent loss of your funds, please check if your address has a destination tag."}
            />
          </View>
        ) : null}


        <View style={style.button}>
          <CelButton onPress={this.confirmAddress}>
            Confirm withdrawal
          </CelButton>
        </View>

        <CelButton
          margin={"30 0 20 0"}
          onPress={() => actions.openModal(MODALS.CHANGE_WITHDRAWAL_ADDRESS_MODAL)}
          basic
        >
          Change withdrawal address
        </CelButton>
        <InfoModal
          name={MODALS.CHANGE_WITHDRAWAL_ADDRESS_MODAL}
          yesCopy={"Change address"}
          onYes={() => this.navigate()}
          heading={"Changing withdrawal address"}
          paragraphs={["Changing your withdrawal address will make a withdrawal of your coin unavailable for 24 hours."]}
        />
      </RegularLayout>
    );
  }
}

export default WithdrawConfirmAddress
