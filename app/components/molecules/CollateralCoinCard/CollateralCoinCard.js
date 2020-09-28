import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import CollateralCoinCardStyle from "./CollateralCoinCard.styles";
import Card from "../../atoms/Card/Card";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import { getColor, getTheme } from "../../../utils/styles-util";
import Separator from "../../atoms/Separator/Separator";
import { SCREENS } from "../../../constants/SCREENS";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { LOAN_PAYMENT_REASONS } from "../../../constants/UI";

class CollateralCoinCard extends Component {
  static propTypes = {
    amountUsd: PropTypes.string,
    additionalCryptoAmount: PropTypes.string,
    additionalInfoExplanation: PropTypes.string,
    additionalUsdAmount: PropTypes.string,
    cardColor: PropTypes.string,
    coin: PropTypes.string,
    currency: PropTypes.string,
    cryptoAmount: PropTypes.string,
    isAllowed: PropTypes.bool,
    onPress: PropTypes.func,
    opacity: PropTypes.number,
    color: PropTypes.string,
    actions: PropTypes.func,
  };
  static defaultProps = {};

  render() {
    const style = CollateralCoinCardStyle();
    const theme = getTheme();
    const {
      amountUsd,
      additionalCryptoAmount,
      additionalInfoExplanation,
      cardColor,
      coin,
      currency,
      cryptoAmount,
      isAllowed,
      onPress,
      opacity,
      color,
      actions,
      additionalUsdAmount,
    } = this.props;
    return (
      <Card onPress={onPress} color={cardColor} opacity={opacity}>
        <View key={coin.name} style={style.mainContainer}>
          <View style={style.coinInfo}>
            <View style={style.iconContainer}>
              <CoinIcon
                customStyles={[
                  style.coinImage,
                  { opacity: isAllowed ? 1 : 0.4 },
                ]}
                theme={theme}
                url={currency.image_url}
                coinShort={currency.short}
              />
            </View>
            <View>
              <View style={{ opacity: isAllowed ? 1 : 0.4 }}>
                <CelText type={"H3"} weight={"500"}>
                  {currency.displayName}
                </CelText>
                <CelText weight={"300"} style={{ color: getColor(color) }}>
                  {cryptoAmount}
                  <CelText weight={"300"} style={{ color: getColor(color) }}>
                    {" | "}
                    <CelText weight={"300"} style={{ color: getColor(color) }}>
                      {formatter.fiat(amountUsd, "USD")}
                    </CelText>
                  </CelText>
                </CelText>
              </View>
              {!isAllowed ? (
                <View>
                  <Separator size={2} margin={"10 0 5 0"} />
                  <View style={{ flexWrap: "wrap" }}>
                    <CelText weight={"500"} align="left">
                      {`${formatter.crypto(
                        additionalCryptoAmount,
                        currency.short,
                        { precision: 2 }
                      )} ${additionalInfoExplanation}`}
                    </CelText>
                  </View>
                </View>
              ) : null}
              {!isAllowed ? (
                <TouchableOpacity
                  onPress={() =>
                    actions.navigateTo(SCREENS.DEPOSIT, {
                      reason: LOAN_PAYMENT_REASONS.COLLATERAL,
                      coin: currency.short,
                      amountUsd: additionalUsdAmount,
                      additionalCryptoAmount,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Icon
                    name={"CirclePlus"}
                    width={20}
                    height={20}
                    fill={getColor(COLOR_KEYS.BANNER_INFO)}
                  />
                  <CelText color={getColor(COLOR_KEYS.BANNER_INFO)} type={"H5"}>
                    {" "}
                    Deposit More
                  </CelText>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

export default CollateralCoinCard;
