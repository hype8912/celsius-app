import React, { Component } from "react";
import { View, Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import InterestRateInfoStyle from "./InterestRateInfo.styles";
import CelText from "../CelText/CelText";
import formatter from "../../../utils/formatter";
import Card from "../Card/Card";
import CoinIcon from "../CoinIcon/CoinIcon";
import cryptoUtil from "../../../utils/crypto-util/crypto-util";
import RateInfoCard from "../../molecules/RateInfoCard/RateInfoCard";
import { isUSCitizen } from "../../../utils/user-util/user-util";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    walletCurrencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    interestCompliance: state.compliance.interest,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestRateInfo extends Component {
  capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  render() {
    const {
      currency,
      walletCurrencies,
      compact,
      actions,
      walletSummary,
      interestCompliance,
      interestRate,
    } = this.props;

    if (!currency || !walletCurrencies) {
      return null;
    }
    const coin = walletSummary.coins.find(c => c.short === currency);

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
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                maxWidth: "60%",
              }}
            >
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

            {cryptoUtil.buyInApp(currencyInfo.short) && (
              <CelText
                align={"center"}
                link
                type={"H7"}
                weight={"300"}
                onPress={() =>
                  actions.navigateTo(SCREENS.GET_COINS_LANDING, {
                    coin: currencyInfo.short,
                  })
                }
              >
                {`Buy ${currencyInfo.short}`}
              </CelText>
            )}

            {cryptoUtil.provideLink(currencyInfo.short) && (
              <CelText
                align={"center"}
                link
                type={"H7"}
                weight={"300"}
                onPress={() => Linking.openURL(link)}
              >
                {`Buy ${currencyInfo.short}`}
              </CelText>
            )}
          </View>

          <CelText margin="8 0 2 0" type={"H7"}>
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
              <CelText type={"H7"} margin="0 5 0 0">
                {currencyInfo.short}
              </CelText>
              <CelText type={"H7"} weight="bold">
                {formatter.percentageDisplay(interestRate.compound_rate)}
              </CelText>
            </View>
            {currencyInfo.short === "CEL" ||
            (isUSCitizen() && !interestRate.rate_us) ? null : (
              <View style={styles.celRateWrapper}>
                <CelText
                  type={"H7"}
                  color={getColor(COLOR_KEYS.WHITE)}
                  margin="0 5 0 0"
                >
                  {!isUSCitizen() ? "CEL" : " "}
                </CelText>
                <CelText
                  type={"H7"}
                  weight="bold"
                  color={getColor(COLOR_KEYS.WHITE)}
                >
                  {formatter.percentageDisplay(interestRate.specialRate)}
                </CelText>
              </View>
            )}
          </View>
        </View>

        <RateInfoCard
          coin={coin}
          navigateTo={actions.navigateTo}
          celInterestButton
          interestCompliance={interestCompliance}
        />
      </Card>
    );
  }
}

export default InterestRateInfo;
