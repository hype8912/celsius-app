import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import CollateralCoinCardStyle from "./CollateralCoinCard.styles";
import Card from "../../atoms/Card/Card";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";
import Separator from "../../atoms/Separator/Separator";
// import { COLOR_KEYS } from "../../../constants/COLORS";
// import { SCREENS } from "../../../constants/SCREENS";

class CollateralCoinCard extends Component {
  static propTypes = {
    amountUsd: PropTypes.string,
    additionalCryptoAmount: PropTypes.string,
    additionalInfoExplanation: PropTypes.string,
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
                <CelText weight={"300"} style={{ color }}>
                  {cryptoAmount}
                  <CelText weight={"300"} style={{ color }}>
                    {" | "}
                    <CelText weight={"300"} style={{ color }}>
                      {formatter.fiat(amountUsd, "USD")}
                    </CelText>
                  </CelText>
                </CelText>
              </View>
              {!isAllowed ? (
                <View>
                  <Separator size={2} margin={"10 0 5 0"} />
                  <View>
                    <CelText weight={"300"} align="left">
                      Additional
                      <CelText weight={"500"} align="left">
                        {` ${additionalCryptoAmount} `}
                        <CelText weight={"300"} align="left">
                          {`${additionalInfoExplanation}`}
                        </CelText>
                      </CelText>
                    </CelText>
                  </View>
                </View>
              ) : null}
              {!isAllowed ? (
                <TouchableOpacity
                  onPress={() =>
                    actions.navigateTo("Deposit", { coin: currency.short })
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
                    fill={STYLES.COLORS.CELSIUS_BLUE}
                  />
                  <CelText color={STYLES.COLORS.CELSIUS_BLUE} type={"H5"}>
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
