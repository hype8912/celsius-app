import React, { Component, Fragment } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';


import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import Graph from "../../graphs/Graph/Graph";

import STYLES from "../../../constants/STYLES";
import { heightPercentageToDP } from '../../../utils/styles-util';
import CoinCardStyle from './CoinCard.styles';
import { THEMES } from "../../../constants/UI";

class CoinCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    displayName: PropTypes.string.isRequired,
    currencyRates: PropTypes.instanceOf(Object).isRequired,
    onCardPress: PropTypes.func,
    graphData: PropTypes.instanceOf(Object),
    theme: PropTypes.oneOf(Object.values(THEMES))
  };

  coinCardEmpty = () => (
    <View>
      <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(0)}</CelText>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" height="13" name="CirclePlus" />
        <CelText margin={'0 0 0 5'} color={STYLES.COLORS.CELSIUS_BLUE}>
          Deposit
      </CelText>
      </View>
    </View>
  )

  coinCardFull = (coin) => (
    <Fragment >
      <CelText style={CoinCardStyle.text} weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(coin.amount_usd)}</CelText>
      <CelText weight='300' type="H6">{formatter.crypto(coin.amount, coin.short)}</CelText>
    </Fragment>
  )

  // renderPriceChange = (currencyRates) => {
  //   const coinPriceChange = currencyRates.price_change_usd['1d']
  //   const textColor = coinPriceChange < 0 ? STYLES.COLORS.RED : STYLES.COLORS.GREEN
  //   const arrowType = coinPriceChange < 0 ? "DownArrow" : "UpArrow"
  //
  //   return (
  //     <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
  //       <Icon name={arrowType} fill={textColor} height={6} width={6} />
  //       <CelText weight='500' type="H7" color={textColor} margin='1 0 2 3'>{coinPriceChange ? Math.abs(coinPriceChange) : 0} %</CelText>
  //     </View>
  //   )
  // }

  render = () => {
    const { coin, theme, displayName, currencyRates, onCardPress, graphData } = this.props;
    const amount = coin.amount_usd > 0;
    const style = CoinCardStyle();
    let dateArray;
    let priceArray;

    const coinPriceChange = currencyRates.price_change_usd['1d']
    if (graphData) {
      dateArray = graphData["1d"].map(data => data[0]);
      priceArray = graphData["1d"].map(data => data[1]);

    }

    const padding = graphData ? '12 0 0 0' : undefined; // undefined so it will fallback to default card prop padding

    // Todo(ns): adjust graph size according to Card size prop

    return (
      <Card size="half" padding={padding} onPress={onCardPress}>
        <View style={{ flexDirection: "row", marginHorizontal: 12 }}>
          <View >
            <CelText style={style.text} weight='300' type="H6">{displayName}</CelText>
            {amount ? this.coinCardFull(coin) : this.coinCardEmpty(coin, currencyRates)}
          </View>
        </View>
        {graphData ?
          <Graph key={coin.short} dateArray={dateArray} priceArray={priceArray}
            rate={coinPriceChange}
            height={heightPercentageToDP("10%")}
            style={{ borderBottomRightRadius: 8, borderBottomLeftRadius: 8, overflow: 'hidden' }}
                 theme={theme}
          />
          : <View style={{ marginBottom: '40%' }} />}
      </Card>
    )
  }
}

export default CoinCard
