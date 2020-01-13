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

class CoinCards extends Component {
  static propTypes = {
    activeView: PropTypes.string,
    walletSummary: PropTypes.instanceOf(Object),
    currenciesRates: PropTypes.instanceOf(Array),
    currenciesGraphs: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    depositCompliance: PropTypes.instanceOf(Object),
  };

  constructor(props) {
    super(props);
    this.state = {
      coinsWithAmount: [],
      coinsWithoutAmount: [],
    };
  }

  componentDidMount() {
    this.filterCoins();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.walletSummary.total_amount_usd !==
      this.props.walletSummary.total_amount_usd
    ) {
      this.filterCoins();
    }
  }

  filterCoins = async () => {
    const {
      walletSummary,
      currenciesRates,
      currenciesGraphs,
      navigateTo,
      depositCompliance,
    } = this.props;
    const allowedCoins = [];

    if (walletSummary) {
      walletSummary.coins.forEach(coin => {
        if (depositCompliance.coins.includes(coin.short)) {
          allowedCoins.push(coin);
        }

        if (
          !depositCompliance.coins.includes(coin.short) &&
          coin.amount_usd > 0
        ) {
          allowedCoins.push(coin);
        }
      });
    }

    allowedCoins.sort((a, b) => b.amount_usd - a.amount_usd);

    if (allowedCoins) {
      const coins = [];
      allowedCoins.forEach(coin => {
        const tempCoin = coin;
        let hasAmount = false;
        if (coin.amount_usd > 0) {
          hasAmount = true;
        }

        tempCoin.currency = currenciesRates.find(
          c => c.short === coin.short.toUpperCase()
        );
        tempCoin.graphData = !_.isEmpty(currenciesGraphs[coin.short])
          ? currenciesGraphs[coin.short]
          : null;
        tempCoin.navigate = hasAmount
          ? () =>
              navigateTo("CoinDetails", {
                coin: coin.short,
                title: tempCoin.currency.displayName,
              })
          : () => navigateTo("Deposit", { coin: coin.short });

        coins.push(coin);
      });

      const coinsWithAmount = _.remove(coins, c => c.amount_usd !== 0);
      const coinsWithoutAmount = _.remove(coins, c => c.amount_usd === 0);

      await this.setState({
        coinsWithAmount,
        coinsWithoutAmount,
      });
    }
  };

  renderCoinCards = c => {
    const { activeView } = this.props;

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;

    // Render grid item
    if (isGrid) {
      return c.map(coin => (
        <CoinGridCard
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
    return c.map(coin => (
      <CoinListCard
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
      <TouchableOpacity style={gridStyle} onPress={() => navigateTo("Deposit")}>
        <Icon fill={"gray"} width="17" height="17" name="CirclePlus" />
        <CelText type="H5" margin={isGrid ? "5 0 0 0" : "0 0 0 5"}>
          Deposit coins
        </CelText>
      </TouchableOpacity>
    );
  };

  render() {
    const style = CoinCardsStyle();

    const { coinsWithAmount, coinsWithoutAmount } = this.state;

    return (
      <View>
        <ExpandableItem
          heading={"DEPOSITS"}
          margin={"10 0 10 0"}
          childrenStyle={style.coinCardContainer}
          isExpanded
        >
          {this.renderCoinCards(coinsWithAmount)}
          {this.renderAddMoreCoins()}
        </ExpandableItem>

        <ExpandableItem
          heading={"AVAILABLE COINS"}
          margin={"10 0 10 0"}
          childrenStyle={style.coinCardContainer}
        >
          {this.renderCoinCards(coinsWithoutAmount)}
        </ExpandableItem>
      </View>
    );
  }
}

export default CoinCards;
