import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";

import CoinCardsStyle from "./CoinCards.styles";
import CelText from "../../atoms/CelText/CelText";
import { WALLET_LANDING_VIEW_TYPES } from "../../../constants/UI";
import CoinGridCard from "../../molecules/CoinGridCard/CoinGridCard";
import CoinListCard from "../../molecules/CoinListCard/CoinListCard";
import Icon from "../../atoms/Icon/Icon";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import animationsUtil from "../../../utils/animations-util";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

class CoinCards extends Component {
  static propTypes = {
    activeView: PropTypes.string,
    walletSummary: PropTypes.instanceOf(Object),
    currenciesRates: PropTypes.instanceOf(Array),
    currenciesGraphs: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    depositCompliance: PropTypes.instanceOf(Object),
    shouldAnimate: PropTypes.bool,
  };

  filterCoins = () => {
    const {
      walletSummary,
      currenciesRates,
      currenciesGraphs,
      navigateTo,
      depositCompliance,
    } = this.props;

    let coinsWithTransactions = [];
    let coinsWithoutTransactions = [];

    if (!walletSummary || !currenciesRates) {
      return {
        coinsWithTransactions,
        coinsWithoutTransactions,
      };
    }

    const allowedCoins = [];

    if (walletSummary) {
      walletSummary.coins.forEach(coin => {
        if (depositCompliance.coins.includes(coin.short)) {
          allowedCoins.push(coin);
        }

        if (
          !depositCompliance.coins.includes(coin.short) &&
          coin.amount_usd.isGreaterThan(0)
        ) {
          allowedCoins.push(coin);
        }
      });
    }

    allowedCoins.sort((a, b) => b.amount_usd.minus(a.amount_usd));
    if (allowedCoins && currenciesRates) {
      const coins = [];
      allowedCoins.forEach(coin => {
        if (coin.short) {
          const tempCoin = coin;
          tempCoin.currency = currenciesRates.find(
            c => c.short === coin.short.toUpperCase()
          );
          tempCoin.graphData =
            currenciesGraphs && !_.isEmpty(currenciesGraphs[coin.short])
              ? currenciesGraphs[coin.short]
              : null;
          tempCoin.navigate = Number(coin.has_transaction)
            ? () =>
                navigateTo(SCREENS.COIN_DETAILS, {
                  coin: coin.short,
                  title: tempCoin.currency.displayName,
                })
            : () => navigateTo(SCREENS.DEPOSIT, { coin: coin.short });

          coins.push(coin);
        }
      });

      coinsWithTransactions = _.remove(
        coins,
        c => Number(c.has_transaction) !== 0
      );
      coinsWithoutTransactions = _.remove(
        coins,
        c => Number(c.has_transaction) === 0
      );

      return {
        coinsWithTransactions,
        coinsWithoutTransactions,
      };
    }
  };

  renderCoinCards = c => {
    const { activeView, shouldAnimate } = this.props;

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;
    const processedGridItems = animationsUtil.applyOffset([...c], 2);
    const processedListItems = animationsUtil.applyOffset([...c], 1);

    // Render grid item
    if (isGrid) {
      return processedGridItems.map(coin => (
        <CoinGridCard
          shouldAnimate={shouldAnimate}
          offset={coin.offset}
          key={coin.short}
          coin={coin}
          displayName={coin.currency.displayName}
          currencyRates={coin.currency}
          onCardPress={coin.navigate}
          graphData={coin.graphData}
        />
      ));
    }
    // Render list item
    return processedListItems.map(coin => (
      <CoinListCard
        shouldAnimate={shouldAnimate}
        offset={coin.offset}
        key={coin.short}
        coin={coin}
        displayName={coin.currency.displayName}
        currencyRates={coin.currency}
        onCardPress={coin.navigate}
      />
    ));
  };

  renderAddMoreCoins = () => {
    const { navigateTo, activeView } = this.props;
    const style = CoinCardsStyle();

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;
    const gridStyle = isGrid ? style.addMoreCoinsGrid : style.addMoreCoinsList;

    return (
      <TouchableOpacity
        style={gridStyle}
        onPress={() => navigateTo(SCREENS.DEPOSIT)}
      >
        <Icon
          fill={getColor(COLOR_KEYS.LINK)}
          width="17"
          height="17"
          name="CirclePlus"
        />
        <CelText type="H5" margin={isGrid ? "5 0 0 0" : "0 0 0 5"} link>
          Transfer coins
        </CelText>
      </TouchableOpacity>
    );
  };

  render() {
    const style = CoinCardsStyle();
    const {
      coinsWithTransactions,
      coinsWithoutTransactions,
    } = this.filterCoins();
    return (
      <View>
        <ExpandableItem
          heading={"COINS"}
          margin={"10 0 10 0"}
          childrenStyle={style.coinCardContainer}
          isExpanded
        >
          {this.renderCoinCards(coinsWithTransactions)}
          {this.renderAddMoreCoins()}
        </ExpandableItem>

        <ExpandableItem
          heading={"AVAILABLE COINS"}
          margin={"10 0 10 0"}
          childrenStyle={style.coinCardContainer}
        >
          {this.renderCoinCards(coinsWithoutTransactions)}
        </ExpandableItem>
      </View>
    );
  }
}

export default CoinCards;
