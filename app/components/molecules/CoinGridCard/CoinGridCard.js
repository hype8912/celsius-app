import React, { Component } from "react";
import { View, Animated } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";

import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import Graph from "../../graphs/Graph/Graph";
import { getColor, heightPercentageToDP } from "../../../utils/styles-util";
import CoinGridCardStyle from "./CoinGridCard.styles";
import { THEMES } from "../../../constants/UI";
import interestUtil from "../../../utils/interest-util";
import Counter from "../Counter/Counter";
import animationsUtil from "../../../utils/animations-util";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { isUSCitizen } from "../../../utils/user-util/user-util";

const GraphLight = require("../../../../assets/images/placeholders/graph-light.png");
const GraphDark = require("../../../../assets/images/placeholders/graph-dark.png");

class CoinGridCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    displayName: PropTypes.string.isRequired,
    currencyRates: PropTypes.instanceOf(Object).isRequired,
    onCardPress: PropTypes.func,
    graphData: PropTypes.instanceOf(Object),
    theme: PropTypes.oneOf(Object.values(THEMES)),
    offset: PropTypes.number,
    shouldAnimate: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  animate() {
    const { offset, shouldAnimate } = this.props;
    const { animatedValue } = this.state;
    if (!shouldAnimate) return { opacity: 1 };
    animationsUtil.animateArrayOfObjects(animatedValue, offset, 1200);
    return { opacity: animatedValue };
  }

  coinCardEmpty = () => (
    <View>
      <CelText hideFromRecording weight="600" type="H3" margin="3 0 3 0">
        {formatter.usd(0)}
      </CelText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          fill={getColor(COLOR_KEYS.LINK)}
          width="13"
          height="13"
          name="CirclePlus"
        />
        <CelText margin={"0 0 0 5"} type={"H7"} link>
          Transfer
        </CelText>
      </View>
    </View>
  );

  coinCardFull = coin => (
    <>
      <Counter
        hideFromRecording
        color={getColor(COLOR_KEYS.HEADLINE)}
        weight="600"
        type="H3"
        margin="3 0 3 0"
        number={coin.amount_usd}
        usd
      />
      <CelText hideFromRecording weight="300" type="H7">
        {formatter.crypto(coin.amount, coin.short)}
      </CelText>
    </>
  );

  render = () => {
    const {
      coin,
      theme,
      displayName,
      currencyRates,
      onCardPress,
      graphData,
    } = this.props;
    const hasTransactions = Number(coin.has_transaction) > 0;
    const style = CoinGridCardStyle();

    const dateArray = graphData ? graphData["1d"].map(data => data[0]) : [];
    const priceArray = graphData ? graphData["1d"].map(data => data[1]) : [];

    const shouldShowGraph =
      graphData && dateArray.length > 0 && priceArray.length > 0;

    const interestRate = interestUtil.getUserInterestForCoin(coin.short);

    let rate;
    rate = !interestRate.inCEL
      ? interestRate.compound_rate
      : interestRate.specialRate;
    if (isUSCitizen()) rate = interestRate.specialRate;
    const coinPriceChange = currencyRates.price_change_usd["1d"];
    return (
      <Animated.View style={this.animate()}>
        <Card size="half" padding={"12 0 0 0"} onPress={onCardPress}>
          <View style={[style.cardInnerView, { height: 90 }]}>
            <View style={style.wrapper}>
              <View style={style.coinTextWrapper}>
                <CelText weight="300" type="H6">
                  {displayName}
                </CelText>
                {!_.isEmpty(interestRate) && interestRate.eligible && (
                  <CelText
                    hideFromRecording
                    color={getColor(COLOR_KEYS.POSITIVE_STATE)}
                    type="H7"
                  >
                    {formatter.percentageDisplay(rate)}
                  </CelText>
                )}
              </View>
              {hasTransactions
                ? this.coinCardFull(coin)
                : this.coinCardEmpty(coin, currencyRates)}
            </View>
          </View>

          {shouldShowGraph ? (
            <View style={{ ...this.props.style }}>
              <Graph
                key={coin.short}
                dateArray={dateArray}
                priceArray={priceArray}
                rate={coinPriceChange}
                height={heightPercentageToDP("10%")}
                style={{
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                  overflow: "hidden",
                }}
                theme={theme}
              />
            </View>
          ) : (
            <View style={{ ...this.props.style, marginHorizontal: 0 }}>
              <ThemedImage
                lightSource={GraphLight}
                darkSource={GraphDark}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: heightPercentageToDP("10%"),
                  marginBottom: "-10%",
                }}
              />
            </View>
          )}
        </Card>
      </Animated.View>
    );
  };
}

export default CoinGridCard;
