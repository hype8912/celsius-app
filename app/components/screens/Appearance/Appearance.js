import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../../../redux/actions";
import AppearanceStyle from "./Appearance.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Separator from "../../atoms/Separator/Separator";
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
  static navigationOptions = () => ({
    title: "Appearance",
  });

  renderCard = appearanceStyle => {
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
      <View style={appearanceStyle.coinContainer}>
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
          {this.renderCard(style)}

          <Separator text="COLOR THEME" margin="0 0 20 0" />
          <View style={style.buttonsContainer}>
            <CircleButton
              icon={theme === THEMES.LIGHT ? "Checked" : false}
              iconSize={15}
              type="theme"
              text="Light"
              style={[style.lightThemeButton, style.themeBtn]}
              onPress={() => {
                actions.setUserAppSettings({ theme: THEMES.LIGHT });
              }}
            />
            <CircleButton
              icon={theme === THEMES.UNICORN ? "Checked" : false}
              iconSize={15}
              type="theme"
              text="Unicorn"
              style={[style.unicornThemeButton, style.themeBtn]} // TODO: change to appropriate color and move to constants
              onPress={() => {
                actions.setUserAppSettings({ theme: THEMES.UNICORN });
              }}
            />
            <CircleButton
              icon={theme === THEMES.DARK ? "Checked" : false}
              iconSize={15}
              type="theme"
              text="Dark"
              style={[style.darkThemeButton, style.themeBtn]}
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
