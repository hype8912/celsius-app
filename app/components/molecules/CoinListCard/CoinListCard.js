import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';



import CoinListCardStyle from "./CoinListCard.styles";
import CelText from '../../atoms/CelText/CelText';
import Icon from '../../atoms/Icon/Icon';
import STYLES from "../../../constants/STYLES";
import formatter from '../../../utils/formatter';
import Card from '../../atoms/Card/Card';
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";

class CoinListCard extends Component {

  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    displayName: PropTypes.string.isRequired,
    currencyRates: PropTypes.instanceOf(Object).isRequired,
    onCardPress: PropTypes.func
  };

  coinCardEmpty = () => (
    <View>
      <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(0)}</CelText>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Icon fill={STYLES.COLORS.CELSIUS_BLUE} width="13" height="13" name="CirclePlus" />
        <CelText margin={'0 0 0 5'} color={STYLES.COLORS.CELSIUS_BLUE}>
          Deposit
        </CelText>
      </View>
    </View>
  )

  coinCardFull = (coin) => (
    <Fragment>
      <CelText weight='600' type="H3" margin='3 0 3 0'>{formatter.usd(coin.amount_usd)}</CelText>
      <CelText weight='300' type="H6">{formatter.crypto(coin.amount, coin.short)}</CelText>
    </Fragment>
  )

  renderPriceChange = (currencyRates) => {
    const coinPriceChange = currencyRates.price_change_usd['1d']
    const textColor = coinPriceChange < 0 ? STYLES.COLORS.RED : STYLES.COLORS.GREEN
    const arrowType = coinPriceChange < 0 ? "DownArrow" : "UpArrow"

    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={arrowType} fill={textColor} height={6} width={6}/>
        <CelText weight='500' type="H7" color={textColor} margin='0 0 0 3'>{coinPriceChange ? Math.abs(coinPriceChange) : 0} %</CelText>
      </View>
    )
  }

  render() {
    const { coin, displayName, currencyRates, onCardPress } = this.props;
    const amount = coin.amount_usd > 0;
    const style = CoinListCardStyle();

    return (
      <Card onPress={onCardPress}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: 'center' }}>
            <CoinIcon customStyles={ style.coinImage } url={currencyRates.image_url} coinShort={coin.short} />
          </View>
          <View>
            <CelText weight='300' type="H6">{displayName}</CelText>
            {amount ? this.coinCardFull(coin) : this.coinCardEmpty(coin, currencyRates)}
          </View>
          <View style={{ position: 'absolute', right: 0, alignSelf: 'center' }} >
            {this.renderPriceChange(currencyRates)}
          </View>
        </View>
      </Card >
    )
  }
}

export default CoinListCard
