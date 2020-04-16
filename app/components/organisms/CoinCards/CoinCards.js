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

const OFFSET = 400;
const BASE_OFFSET = 500;

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
      coinsWithTransactions: [],
      coinsWithoutTransactions: [],
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
        tempCoin.currency = currenciesRates.find(
          c => c.short === coin.short.toUpperCase()
        );
        tempCoin.graphData = !_.isEmpty(currenciesGraphs[coin.short])
          ? currenciesGraphs[coin.short]
          : null;
        tempCoin.navigate = Number(coin.has_transaction)
          ? () =>
              navigateTo("CoinDetails", {
                coin: coin.short,
                title: tempCoin.currency.displayName,
              })
          : () => navigateTo("Deposit", { coin: coin.short });

        coins.push(coin);
      });

      const coinsWithTransactions = _.remove(
        coins,
        c => Number(c.has_transaction) !== 0
      );
      const coinsWithoutTransactions = _.remove(
        coins,
        c => Number(c.has_transaction) === 0
      );

      await this.setState({
        coinsWithTransactions,
        coinsWithoutTransactions,
      });
    }
  };

  applyOffset = (items, numCols) => {
    const diagonals = this.findDiagonals(items, numCols);

    diagonals.forEach((diag, i) => {
      diag.forEach(elm => {
        // eslint-disable-next-line no-param-reassign
        items[elm].offset = i * OFFSET + BASE_OFFSET;
      });
    });

    return items;
  };

  findDiagonals = (items, numCols) => {
    const offsets = [];
    let i = 0;
    const numRows = Math.ceil(items.length / numCols);

    while (i < numRows) {
      offsets.push(this.getAscDiagonal(i, 0, numCols, items.length));
      i++;
    }
    i--;
    for (let j = 1; j < numCols; j++) {
      offsets.push(this.getAscDiagonal(i, j, numCols, items.length));
    }

    return offsets;
  };

  getAscDiagonal = (i, j, numCols, maxLength) => {
    const diagonal = [];
    while (i >= 0 && j < numCols) {
      const mappedIndex = i * numCols + j;
      if (mappedIndex < maxLength) diagonal.push(mappedIndex);
      // eslint-disable-next-line no-param-reassign
      i--;
      // eslint-disable-next-line no-param-reassign
      j++;
    }
    return diagonal;
  };

  renderCoinCards = c => {
    const { activeView } = this.props;

    const isGrid = activeView === WALLET_LANDING_VIEW_TYPES.GRID;
    const processedGridItems = this.applyOffset([...c], 2);
    const processedListItems = this.applyOffset([...c], 1);

    // Render grid item
    if (isGrid) {
      return processedGridItems.map(coin => (
        <CoinGridCard
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

    const { coinsWithTransactions, coinsWithoutTransactions } = this.state;

    return (
      <View>
        <ExpandableItem
          heading={"DEPOSITS"}
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
