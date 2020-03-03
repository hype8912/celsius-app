import React, { Component } from "react";
import { View, Image, Linking } from "react-native";
import { connect } from "react-redux";

import InterestRateInfoStyle from "./InterestRateInfo.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import STYLES from "../../../constants/STYLES";

@connect(state => ({
  walletCurrencies: state.currencies.rates
}))
class InterestRateInfo extends Component {
  capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const {
      currency,
      rate,
      walletCurrencies,
      compact
    } = this.props;


    if (!currency || !walletCurrencies) {
      return null;
    }

    const styles = InterestRateInfoStyle();

    const additionalWrapperStyle = compact ? styles.mainWrapperCompact : {};

    const currencyIndex = walletCurrencies.map(c => c.short).indexOf(currency);
    const currencyInfo = walletCurrencies[currencyIndex];
    const currencyName = currencyInfo.name;
    const name = currencyInfo.short === "DAI" ? "MakerDAO" : currencyName;
    let link;

    // TODO: place into some util

    switch (currencyInfo.short) {
      case "BCH":
        link = "https://buy.bitcoin.com/bch/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-bch";
        break;
      case "BTC":
        link = "https://buy.bitcoin.com/btc/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-btc";
        break;
      case "ETH":
        link = "https://buy.bitcoin.com/eth/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-eth";
        break;
      case "LTC":
        link = "https://buy.bitcoin.com/ltc/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-ltc";
        break;
      case "XRP":
        link = "https://buy.bitcoin.com/xrp/?ref_id=celsius&utm_source=celsius&utm_medium=app-link&utm_content=buy-xrp";
        break;
      default:
        link = null;
    }
    
    return (
      <View style={[styles.mainWrapper, additionalWrapperStyle]}>
        <View style={styles.mainInfoWrapper}>
          <View style={styles.imageInfoWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: currencyInfo.image_url }}
                style={styles.currencyImage}
              />
            </View>
            <View style={styles.infoWrapper}>
              <CelText weight={"500"} type={"H5"} style={styles.currencyName}>
                {this.capitalize(name)}
              </CelText>
              <CelText weight={"500"} type={"H4"} style={styles.currencyShort}>
                {currencyInfo.short}
              </CelText>
              {["BCH", "BTC", "ETH", "XRP", "LTC"].includes(currencyInfo.short) &&
              <CelText align={"center"} color={STYLES.COLORS.CELSIUS_BLUE} type={"H4"} weight={"300"}
                       onPress={() => Linking.openURL(link)}>{`Buy ${currencyInfo.short}`}</CelText>
              }
            </View>
          </View>
          <View style={{ justifyContent: "space-around" }}>
            <View style={styles.regularRateWrapper}>
              <CelText type={"H7"} style={styles.regularRateText}>
                Regular
              </CelText>
              <CelText type={"H5"} style={styles.regRateText}>
                {formatter.percentageDisplay(rate.rate)}
              </CelText>
            </View>
            <View style={styles.celRateWrapper}>
              <CelText type={"H7"} style={styles.celsiusRateText}>
                Bonus
              </CelText>
              <CelText type={"H5"} style={styles.celRateText}>
                {formatter.percentageDisplay(rate.cel_rate)}
              </CelText>
            </View>
          </View>
        </View>
        {currencyInfo.short.toUpperCase() === "USD" && (
          <View style={styles.usdInfoWrapper}>
            <CelText>
              Start earning interest for dollars by{" "}
              <CelText
                onPress={() => {
                  Linking.openURL("mailto:sales@celsius.network");
                }}
              >
                getting in touch
              </CelText>{" "}
              with our team.
            </CelText>
          </View>
        )}
      </View>
    );
  }
}

export default InterestRateInfo;
