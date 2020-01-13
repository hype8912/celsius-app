import React, { Component, Fragment } from "react";
import { View, Animated } from "react-native";
import PropTypes from "prop-types";

import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";
import Graph from "../../graphs/Graph/Graph";

import STYLES from "../../../constants/STYLES";
import { heightPercentageToDP } from "../../../utils/styles-util";
import CoinGridCardStyle from "./CoinGridCard.styles";
import { THEMES } from "../../../constants/UI";
import interestUtil from "../../../utils/interest-util";

class CoinGridCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    displayName: PropTypes.string.isRequired,
    currencyRates: PropTypes.instanceOf(Object).isRequired,
    onCardPress: PropTypes.func,
    graphData: PropTypes.instanceOf(Object),
    theme: PropTypes.oneOf(Object.values(THEMES)),
  };

  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),

      dateArray: [],
      priceArray: [],
      coinPriceChange: null,
      coinInterest: {},
    };
  }

  async componentDidMount() {
    const { graphData, currencyRates, coin } = this.props;
    const coinPriceChange = currencyRates.price_change_usd["1d"];
    // Graph animation
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start();

    const coinInterest = interestUtil.getUserInterestForCoin(coin.short);

    await this.setState({
      coinPriceChange,
      coinInterest,
    });
    if (graphData) {
      const dateArray = graphData["1d"].map(data => data[0]);
      const priceArray = graphData["1d"].map(data => data[1]);
      setTimeout(() => {
        this.setState({
          dateArray,
          priceArray,
        });
      }, 500);
    }
  }

  coinCardEmpty = () => (
    <View>
      <CelText weight="600" type="H3" margin="3 0 3 0">
        {formatter.usd(0)}
      </CelText>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon
          fill={STYLES.COLORS.CELSIUS_BLUE}
          width="13"
          height="13"
          name="CirclePlus"
        />
        <CelText
          margin={"0 0 0 5"}
          type={"H7"}
          color={STYLES.COLORS.CELSIUS_BLUE}
        >
          Deposit
        </CelText>
      </View>
    </View>
  );

  coinCardFull = coin => (
    <Fragment>
      <CelText
        style={CoinGridCardStyle.text}
        weight="600"
        type="H3"
        margin="3 0 3 0"
      >
        {formatter.usd(coin.amount_usd)}
      </CelText>
      <CelText weight="300" type="H7">
        {formatter.crypto(coin.amount, coin.short)}
      </CelText>
    </Fragment>
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
    const { dateArray, priceArray, coinPriceChange, coinInterest } = this.state;
    const amount = coin.amount_usd > 0;
    const style = CoinGridCardStyle();

    const padding = graphData ? "12 0 0 0" : undefined; // undefined so it will fallback to default card prop padding

    // Todo(ns): adjust graph size according to Card size prop

    return (
      <Card size="half" padding={padding} onPress={onCardPress}>
        <View style={style.cardInnerView}>
          <View style={style.wrapper}>
            <View style={style.coinTextWrapper}>
              <CelText weight="300" type="H6">
                {displayName}
              </CelText>
              {coinInterest.eligible && (
                <CelText color={STYLES.COLORS.GREEN} type="H7">
                  {coinInterest.display}
                </CelText>
              )}
            </View>
            {amount
              ? this.coinCardFull(coin)
              : this.coinCardEmpty(coin, currencyRates)}
          </View>
        </View>

        {graphData && dateArray.length > 0 && priceArray.length > 0 ? (
          <Animated.View
            style={{ ...this.props.style, opacity: this.state.fadeAnim }}
          >
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
          </Animated.View>
        ) : (
          <View style={{ marginBottom: "45%" }} />
        )}
      </Card>
    );
  };
}

export default CoinGridCard;
