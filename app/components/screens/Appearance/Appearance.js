import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import AppearanceStyle from "./Appearance.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import { THEMES } from "../../../constants/UI";
import CoinGridCard from "../../molecules/CoinGridCard/CoinGridCard";

@connect(
  state => ({
    theme: state.user.appSettings.theme,
    walletSummary: state.wallet.summary,
    currenciesGraphs: state.currencies.graphs,
    currenciesRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Appearance extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Appearance",
  });

  renderCard = () => {
    const {
      walletSummary,
      currenciesRates,
      currenciesGraphs,
      theme,
    } = this.props;

    if (!walletSummary || !currenciesGraphs || !currenciesRates) return null;

    const btcCoin = walletSummary.coins.find(c => c.short === "BTC");
    const btcGraph = currenciesGraphs.BTC;
    const btcRates = currenciesRates.find(c => c.short === "BTC");

    return (
      <View style={{ alignItems: "center", paddingBottom: 20 }}>
        <CoinGridCard
          key={btcCoin.short}
          coin={btcCoin}
          displayName={btcRates.displayName}
          currencyRates={btcRates}
          graphData={btcGraph}
          theme={theme}
        />
      </View>
    );
  };

  render() {
    const { theme, actions } = this.props;
    const style = AppearanceStyle();

    return (
      <RegularLayout>
        <View style={style.container}>
          {this.renderCard()}

          <Separator text="COLOR THEME" margin="0 0 20 0" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <CircleButton
              icon={theme === THEMES.LIGHT ? "Checked" : false}
              iconSize={15}
              type="theme"
              text="Light"
              style={[{ backgroundColor: STYLES.COLORS.WHITE }, style.themeBtn]}
              onPress={() => {
                actions.setUserAppSettings({ theme: THEMES.LIGHT });
              }}
            />
            <CircleButton
              icon={theme === THEMES.DARK ? "Checked" : false}
              iconSize={15}
              type="theme"
              text="Dark"
              style={[
                { backgroundColor: STYLES.COLORS.DARK_HEADER },
                style.themeBtn,
              ]}
              onPress={() => {
                actions.setUserAppSettings({ theme: THEMES.DARK });
              }}
            />
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default Appearance;
