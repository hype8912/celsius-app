import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import formatter from "../../../utils/formatter";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";
import Card from "../../atoms/Card/Card";
import WiringBankInfomationStyle from "./WiringBankInformation.styles";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    loyaltyInfo: state.user.loyaltyInfo,
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class WiringBankInformation extends Component {
  static navigationOptions = () => ({
    title: "Wiring Information",
    right: "info",
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  getCopy = () => {
    const { formData } = this.props;

    if (formData.amountUsd) {
      return `Use the wire transfer details provided below to complete your prepayment of ${formatter.usd(
        formData.amountUsd
      )}.`;
    }

    return `Use the wire transfer details provided below to complete your prepayment in USD.`;
  };

  setInterestInDollars = async () => {
    const { actions, navigation } = this.props;
    const id = navigation.getParam("id");
    const reason = navigation.getParam("reason");

    this.setState({ isLoading: true });
    await actions.updateLoanSettings(id, { interest_payment_asset: "USD" });
    actions.showMessage(
      "success",
      `You have successfully changed interest payment method to USD`
    );
    actions.navigateTo("ChoosePaymentMethod", { id, reason });
    this.setState({ isLoading: false });
  };

  render() {
    const { navigation, actions } = this.props;
    const { isLoading } = this.state;
    const style = WiringBankInfomationStyle();
    const copy = this.getCopy();
    const reason = navigation.getParam("reason");

    return (
      <RegularLayout>
        <CelText align={"center"}>{copy}</CelText>
        <Separator margin={"20 0 20 0"} text="Wiring Information" />
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Account:</CelText>
          <CelText>1503222589</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Name:</CelText>
          <CelText>Celsius Network Limited</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Address:</CelText>
          <CelText>
            35 GREAT ST HELENS, LONDON, UNITED KINGDOM, EC3A 6AP
          </CelText>
        </View>
        <Separator margin={"0 0 20 0"} text="Beneficiary bank details" />
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Bank:</CelText>
          <CelText>Signature Bank</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>ABA / Routing Number:</CelText>
          <CelText>026013576</CelText>
        </View>
        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>Beneficiary Bank Address:</CelText>
          <CelText>565 Fifth Avenue, New York, NY 10017</CelText>
        </View>

        <View style={{ marginBottom: 30 }}>
          <CelText weight={"bold"}>(International) SWIFT Code:</CelText>
          <CelText>SIGNUS33XXX</CelText>
        </View>

        <Card padding="12 12 12 12">
          <View style={style.buttonsWrapper}>
            <View style={style.buttonsIconText}>
              <TouchableOpacity
                style={style.buttonIconText}
                onPress={() => actions.sendBankDetailsEmail()}
              >
                <View style={style.buttonItself}>
                  <Image
                    style={style.buttonIconEmail}
                    source={require("../../../../assets/images/icons/icon-email.png")}
                  />
                  <CelText align="center">Send Bank Info via Email</CelText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {reason === LOAN_PAYMENT_REASONS.INTEREST && (
          <CelButton
            margin="20 0 0 0"
            onPress={this.setInterestInDollars}
            loading={isLoading}
            disabled={isLoading}
          >
            Pay with Dollars
          </CelButton>
        )}

        {/* <Card>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>Download Info</View>
            <View style={{ flex: 1 }}>Share Info</View>
          </View>
        </Card> */}
      </RegularLayout>
    );
  }
}

export default WiringBankInformation;
