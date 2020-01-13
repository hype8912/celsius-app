import React, { Component } from "react";
import { View, Linking } from "react-native";
import { connect } from "react-redux";

import InterestRateInfoStyle from "./InterestRateInfo.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";
import Card from "../Card/Card";
import CoinIcon from "../CoinIcon/CoinIcon";
import cryptoUtil from "../../../utils/crypto-util";

@connect(state => ({
  walletCurrencies: state.currencies.rates,
}))
class InterestRateInfo extends Component {
  capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const { currency, rate, walletCurrencies, compact } = this.props;

    if (!currency || !walletCurrencies) {
      return null;
    }

    const styles = InterestRateInfoStyle();

    const additionalWrapperStyle = compact ? styles.mainWrapperCompact : {};

    const currencyIndex = walletCurrencies.map(c => c.short).indexOf(currency);
    const currencyInfo = walletCurrencies[currencyIndex];
    const currencyName = currencyInfo.name;
    const name = currencyInfo.short === "DAI" ? "MakerDAO" : currencyName;
    const link = cryptoUtil.provideLink(currencyInfo.short);

    return (
      <Card
        padding={"16 16 16 16"}
        style={[styles.mainWrapper, additionalWrapperStyle]}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.imageWrapper}>
                <CoinIcon
                  customStyles={styles.currencyImage}
                  url={currencyInfo.image_url}
                  coinShort={currencyInfo.short}
                />
              </View>
              <CelText margin="0 0 0 3" weight="500">
                {this.capitalize(name)} ({currencyInfo.short})
              </CelText>
            </View>

            {cryptoUtil.hasLinkToBuy(currencyInfo.short) && (
              <CelText
                align={"center"}
                color={STYLES.COLORS.CELSIUS_BLUE}
                type={"H7"}
                weight={"300"}
                onPress={() => Linking.openURL(link)}
              >
                {`Buy ${currencyInfo.short}`}
              </CelText>
            )}
          </View>

          <CelText margin="8 0 2 0" type={"H7"} style={styles.regularRateText}>
            Earn in:
          </CelText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.regularRateWrapper, styles.inKindColor]}>
              <CelText
                type={"H7"}
                style={styles.regularRateText}
                margin="0 5 0 0"
              >
                {currencyInfo.short}
              </CelText>
              <CelText type={"H7"} weight="bold" style={styles.regRateText}>
                {formatter.percentageDisplay(rate.rate)}
              </CelText>
            </View>
            {currencyInfo.short === "CEL" ? null : (
              <View style={styles.celRateWrapper}>
                <CelText
                  type={"H7"}
                  style={styles.celsiusRateText}
                  margin="0 5 0 0"
                >
                  CEL
                </CelText>
                <CelText type={"H7"} weight="bold" style={styles.celRateText}>
                  {formatter.percentageDisplay(rate.cel_rate)}
                </CelText>
              </View>
            )}
          </View>
        </View>
      </Card>
    );
  }
}

export default InterestRateInfo;
