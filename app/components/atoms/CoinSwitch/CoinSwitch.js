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
  getFontSize,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import { STORYBOOK } from "../../../../celsius-app-creds/beta-storybook/constants";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";
import { PREDEFINED_AMOUNTS } from "../../../constants/DATA";



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
        "amountCrypto": amountCrypto
      })
    } else {
      const amountUsd  = new BigNumber(amount).multipliedBy(coinRate)
      updateFormFields({
        "amountCrypto": formatter.amountInputFieldFormat(amount),
        "amountUsd": amountUsd
      })
    }
  }

  onPressPredefinedAmount = ({ label, value }) => {
    const { formData, walletSummary, currencyRatesShort, actions } = this.props;
    let amount;

    const coinRate = currencyRatesShort[formData.coin.toLowerCase()];
    const walletSummaryObj = walletSummary.coins.find(
      c => c.short === formData.coin.toUpperCase()
    );

    if (label === "ALL") {
      amount = formData.isUsd
        ? walletSummaryObj.amount_usd.toString()
        : walletSummaryObj.amount;
    } else {
      amount = formData.isUsd ? value : (Number(value) / coinRate).toString();
    }
    this.handleAmountChange(amount, { label, value });
    actions.toggleKeypad(false);
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
      ? `${amountUsd.toString() || ""}`
      : amountCrypto.toString() || ""
    const lowerValue = !isUsd
      ? `${amountUsd.toString() || ""} USD`
      : `${amountCrypto.toString() || ""} ${coin}`;

    console.log("lowerValue", lowerValue);
    console.log("amountUsd: ", amountUsd.toString());
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
                  width: 180,
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <TextInput
                  style={{
                    borderRadius: 8,
                    flex: 1,
                    fontSize: 35,
                    fontWeight: "600",
                    color: getColor(COLOR_KEYS.PRIMARY_BUTTON)
                  }}
                  editable={!(upperValue.length > 3)}
                  placeholderTextColor={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
                  placeholder={"0.00"}
                  textAlign={"center"}
                  allowFontScaling
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
                  type="H2"
                  color={getColor(COLOR_KEYS.PARAGRAPH)}
                  size={getFontSize("H2") - lowerValue.length / 2}
                >
                  {doubleTilde && "≈"} {lowerValue}
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
              // activePeriod={activePeriod}
            />
        </View>

    );
  };
}

export default CoinSwitch;
