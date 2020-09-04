import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";
import _ from "lodash";

import CoinListCardStyle from "./CoinListCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import formatter from "../../../utils/formatter";
import Card from "../../atoms/Card/Card";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import interestUtil from "../../../utils/interest-util";
import { getColor, widthPercentageToDP } from "../../../utils/styles-util";
import Counter from "../Counter/Counter";
import animationsUtil from "../../../utils/animations-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { isUSCitizen } from "../../../utils/user-util/user-util";

class CoinListCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    displayName: PropTypes.string.isRequired,
    currencyRates: PropTypes.instanceOf(Object).isRequired,
    onCardPress: PropTypes.func,
    offset: PropTypes.number,
    shouldAnimate: PropTypes.bool,
  };

  opacityAnim = new Animated.Value(0);

  coinCardEmpty = () => (
    <View>
      <CelText weight="600" type="H3" margin="3 0 3 0">
        {formatter.usd(0)}
      </CelText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          fill={getColor(COLOR_KEYS.LINK)}
          width="13"
          height="13"
          name="CirclePlus"
        />
        <CelText margin={"0 0 0 5"} link>
          Transfer
        </CelText>
      </View>
    </View>
  );

  coinCardFull = coin => (
    <Fragment>
      <Counter
        weight="600"
        type="H3"
        margin="3 0 3 0"
        number={coin.amount_usd}
        usd
      />
      <CelText weight="300" type="H6">
        {formatter.crypto(coin.amount, coin.short)}
      </CelText>
    </Fragment>
  );

  renderInterestRate = coin => {
    const interestRate = interestUtil.getUserInterestForCoin(coin.short);
    let rate;
    rate = !interestRate.inCEL
      ? interestRate.compound_rate
      : interestRate.specialRate;
    if (isUSCitizen()) rate = interestRate.specialRate;
    if (_.isEmpty(interestRate)) return null;
    return (
      <CelText
        weight="500"
        type="H7"
        color={getColor(COLOR_KEYS.POSITIVE_STATE)}
        margin="0 0 0 3"
      >
        {formatter.percentageDisplay(rate)} APY
      </CelText>
    );
  };

  animate = () => {
    const { offset, shouldAnimate } = this.props;
    if (!shouldAnimate) return { opacity: 1 };
    animationsUtil.animateArrayOfObjects(this.opacityAnim, offset, 750);
    return { opacity: this.opacityAnim };
  };

  render() {
    const { coin, displayName, currencyRates, onCardPress } = this.props;
    const hasTransactions = Number(coin.has_transaction) > 0;
    const style = CoinListCardStyle();

    return (
      <Animated.View
        style={[this.animate(), { width: widthPercentageToDP("90%") }]}
      >
        <Card onPress={onCardPress}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ alignSelf: "center" }}>
              <CoinIcon
                customStyles={style.coinImage}
                url={currencyRates.image_url}
                coinShort={coin.short}
              />
            </View>
            <View>
              <CelText weight="300" type="H6">
                {displayName}
              </CelText>
              {hasTransactions
                ? this.coinCardFull(coin)
                : this.coinCardEmpty(coin, currencyRates)}
            </View>
            <View
              style={{ position: "absolute", right: 0, alignSelf: "center" }}
            >
              {this.renderInterestRate(coin)}
            </View>
          </View>
        </Card>
      </Animated.View>
    );
  }
}

export default CoinListCard;
