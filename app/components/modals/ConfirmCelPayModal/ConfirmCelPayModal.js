import React, { Component } from 'react';
import { Image, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import ConfirmCelPayModalStyle from "./ConfirmCelPayModal.styles";
import { MODALS } from "../../../constants/UI";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import CelModal from "../../organisms/CelModal/CelModal";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";
import STYLES from "../../../constants/STYLES";
import Card from "../../atoms/Card/Card";
import Icon from "../../atoms/Icon/Icon";
import formatter from "../../../utils/formatter";
import API from "../../../constants/API";
import apiUtil from "../../../utils/api-util";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ConfirmCelPayModal extends Component {

  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {};
  }


  sendCelPay = () => {
    const {formData, actions} = this.props;
    const sendCelPay = formData.friend ? actions.celPayFriend() : actions.celPayShareLink();

    return sendCelPay;
  };

  render() {
    const style = ConfirmCelPayModalStyle();
    const { formData, walletSummary, callsInProgress } = this.props;

    const coinData =
      formData.coin &&
      walletSummary.coins.find(c => c.short === formData.coin.toUpperCase());
    const newBalanceCrypto =
      coinData && coinData.amount - formData.amountCrypto;
    const newBalanceUsd = coinData && coinData.amount_usd - formData.amountUsd;
    const isLoading = apiUtil.areCallsInProgress([API.CREATE_TRANSFER],callsInProgress)

    return (
        <CelModal
          style={style.container}
          name={MODALS.CONFIRM_CELPAY_MODAL}
        >

          <CelText align={"center"} type={"H2"} margin={"20 0 0 0"} weight={"700"}>Confirm CelPay Details</CelText>
          <CelText align={"center"} type={"H5"} margin={"20 0 0 0"}>
            You are about to CelPay
          </CelText>
          <CelText align={"center"} type={"H1"}>
            { formatter.crypto(formData.amountCrypto, formData.coin) }
          </CelText>
          <CelText align={"center"} type={"H3"}>
            { formatter.usd(formData.amountUsd) }
          </CelText>

          <Separator color={STYLES.COLORS.MEDIUM_GRAY1} margin={"20 0 0 0"}/>

          <View style={style.amount}>
            <CelText type="H6">New wallet balance:</CelText>
            <CelText type="H6" weight="bold">
              {formatter.crypto(newBalanceCrypto, formData.coin)} |{" "}
              {formatter.usd(newBalanceUsd)}
            </CelText>
          </View>

          <Separator color={STYLES.COLORS.MEDIUM_GRAY1} margin={"0 0 0 0"}/>

          {formData.friend ? (
            <View style={{ paddingHorizontal: 20 }}>
              <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }} type="H6" margin="5 0 5 0">Send to:</CelText>

              <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                { !formData.friend.item.profile_image ? (
                  <Image
                    source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50 / 2,
                      borderColor: "#ffffff",
                      borderWidth: 3,
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: formData.friend.item.profile_image,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50 / 2,
                      borderColor: "#ffffff",
                      borderWidth: 3,
                      ...STYLES.SHADOW_STYLES,
                    }}
                  />
                )}
                {formData.friend && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                      alignContent: "center",
                      paddingLeft: 10,
                    }}
                  >
                    <CelText weight="600" type="H4">
                      {formData.friend.item.name}
                    </CelText>
                    <CelText
                      style={{ paddingTop: 5 }}
                      color={STYLES.COLORS.CELSIUS_BLUE}
                      type="H6"
                    >
                      {formData.friend.item.email
                        ? formData.friend.item.email
                        : null}
                    </CelText>
                  </View>
                )}
                <View style={{ paddingTop: 10 }}>
                  <Icon
                    name="Celsius"
                    fill={STYLES.COLORS.CELSIUS_BLUE}
                    height={30}
                    width={30}
                  />
                </View>
              </View>

              {!!formData.message &&
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <CelText style={{ color: STYLES.COLORS.MEDIUM_GRAY }} margin="5 0 5 0">{formData.message}</CelText>
                </View>
              }
            </View>
          ) : null}

          <Card color={STYLES.COLORS.LIGHT_GRAY}>
            <CelText align={"center"} weight={"300"}>Follow instructions in email to complete this CelPay.</CelText>
          </Card>

          <View style={style.buttonsWrapper}>
            <CelModalButton
              position={"single"}
              buttonStyle={"basic"}
              onPress={() => this.sendCelPay()}
              loading={isLoading}
              style={isLoading && "disabled"}
            >
              Send Email Verification
            </CelModalButton>
          </View>

        </CelModal>
    );
  }
}

export default ConfirmCelPayModal
