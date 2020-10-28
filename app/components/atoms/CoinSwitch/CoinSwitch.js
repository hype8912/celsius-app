import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, TextInput } from "react-native";
import BigNumber from "bignumber.js";

import CoinSwitchStyle from "./CoinSwitch.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import Icon from "../Icon/Icon";
import {
  getColor,
  getScaledFont,
  getFontSize, widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import { STORYBOOK } from "../../../../celsius-app-creds/beta-storybook/constants";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";
import { PREDEFINED_AMOUNTS } from "../../../constants/DATA";
import * as appActions from "../../../redux/actions";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)

class CoinSwitch extends Component {
  static propTypes = {
    isUsd: PropTypes.bool,
    noUsdDecimals: PropTypes.bool,
    amountUsd: PropTypes.string,
    amountCrypto: PropTypes.string,
    updateFormFields: PropTypes.func.isRequired,
    onAmountPress: PropTypes.func,
    coin: PropTypes.string,
    amountColor: PropTypes.string,
    theme: PropTypes.string,
    coinRate: PropTypes.number
  }

  handleEnteringAmount = (amount) => {
    const {
      isUsd,
      updateFormFields,
      coinRate,
    } = this.props
    if (isUsd) {
      const amountCrypto  = new BigNumber(amount).dividedBy(coinRate)
      updateFormFields({
        "amountUsd": formatter.amountInputFieldFormat(amount),
        "amountCrypto": amountCrypto.toString()
      })
    } else {
      const amountUsd  = new BigNumber(amount).multipliedBy(coinRate)
      updateFormFields({
        "amountCrypto": formatter.amountInputFieldFormat(amount),
        "amountUsd": amountUsd.toString()
      })
    }
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, walletSummary, currencyRatesShort, actions } = this.props;

    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];
    const walletSummaryObj = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    );
    if (label === "ALL") {
      if (formData.isUsd) {
        actions.updateFormFields({
          "amountUsd": walletSummaryObj.amount_usd.toString(),
          "amountCrypto": walletSummaryObj.amount_usd.dividedBy(coinRate).toString()
      })
      } else {
        actions.updateFormFields({
          "amountCrypto": walletSummaryObj.amount.toString(),
          "amountUsd": walletSummaryObj.amount.multipliedBy(coinRate).toString()
        })
      }
      return
    }

    if (formData.isUsd) {
      actions.updateFormFields({
        "amountUsd": value,
        "amountCrypto": new BigNumber(value).dividedBy(coinRate).toString()
      })
    } else {
      actions.updateFormFields({
        "amountCrypto": new BigNumber(value).dividedBy(coinRate).toString(),
        "amountUsd": value,
      })
    }
  };

  render() {
    const {
      coin,
      isUsd,
      amountUsd,
      amountCrypto,
      doubleTilde,
      updateFormField
    } = this.props;
    const upperValue = isUsd
      ? `${amountUsd || ""}`
      : amountCrypto || ""
    const lowerValue = !isUsd
      ? `${amountUsd || ""}`
      : `${amountCrypto || ""}`;

    console.log("lowerValue", lowerValue.length);
    // console.log("amountUsd: ", amountUsd.toString());
    const style = CoinSwitchStyle();
    return (
        <View style={style.container}>
          <View style={style.enterAmount}>
            {!isUsd ? (
              <Icon
                name={`Icon${coin}`}
                width="40"
                height="40"
                fill={COLOR_KEYS.HEADLINE}
                style={{ marginBottom: 28 }}
              />
            ) : (
              <View style={{
                width: 50,
              }}>
                <CelText type={"H2"} weight={"600"} margin={"0 0 28 0"}>USD</CelText>
              </View>

            )}
            <View>
              <View
                style={{
                  height: getScaledFont(getFontSize("H1")),
                  width: widthPercentageToDP("58%"),
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <TextInput
                  style={[style.inputField, {
                    fontSize: upperValue.length < 10 ? 35 : 25,
                    color: getColor(COLOR_KEYS.PRIMARY_BUTTON),
                  }]}
                  placeholderTextColor={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
                  placeholder={"0.00"}
                  textAlign={"center"}
                  allowFontScaling
                  maxLength={20}
                  keyboardType={KEYBOARD_TYPE.NUMERIC}
                  autoFocus={STORYBOOK}
                  value={upperValue}
                  onChangeText={(amount) => this.handleEnteringAmount(amount)}
                />
              </View>
              <View
                style={{
                  height: getScaledFont(getFontSize("H2")),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CelText
                  align="center"
                  type={lowerValue.length < 20 ? "H2" : "H5"}
                  color={getColor(COLOR_KEYS.PARAGRAPH)}
                >
                  {doubleTilde && "≈"} {isUsd ? formatter.crypto(lowerValue, coin) : formatter.fiat(lowerValue, "USD")}
                </CelText>

              </View>
            </View>


            <View style={style.switchButton}>
              <TouchableOpacity onPress={() => updateFormField("isUsd", !isUsd)}>
                <Icon
                  name="Switch"
                  width="25"
                  height="25"
                  fill={COLOR_KEYS.HEADLINE}
                />
              </TouchableOpacity>
            </View>

          </View>
            <PredefinedAmounts
              data={PREDEFINED_AMOUNTS}
              onSelect={this.onPressPredefinedAmount}
              activePeriod={"activePeriod"}
            />
        </View>

    );
  };
}

export default CoinSwitch;
