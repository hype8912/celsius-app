import React, { Component } from "react";
import { View, TouchableOpacity, Animated, Image } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";
import { Extrapolate } from "react-native-reanimated";

import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import CoinDetailsStyle from "./CoinDetails.styles";
import Separator from "../../atoms/Separator/Separator";
import Badge from "../../atoms/Badge/Badge";

import {
  getColor,
  getTheme,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import GraphContainer from "../../graphs/GraphContainer/GraphContainer";
import Icon from "../../atoms/Icon/Icon";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import InterestCard from "../../molecules/InterestCard/InterestCard";
import interestUtil from "../../../utils/interest-util";
import RateInfoCard from "../../molecules/RateInfoCard/RateInfoCard";
import Counter from "../../molecules/Counter/Counter";
import { COLOR_KEYS } from "../../../constants/COLORS";
import STYLES from "../../../constants/STYLES";

@connect(
  state => ({
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    interestRates: state.generalData.interestRates,
    celpayCompliance: state.compliance.celpay,
    coinAmount: state.graph.coinLastValue,
    appSettings: state.user.appSettings,
    interestCompliance: state.compliance.interest,
    hodlStatus: state.hodl.hodlStatus,
    depositCompliance: state.compliance.deposit,
    simplexCompliance: state.compliance.simplex,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CoinDetails extends Component {
  static currencyFetchingInterval;
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title:
        params && params.title && params.coin
          ? `${params.title}  (${params.coin})`
          : "Coin Details",
      right: "profile",
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    const coin = navigation.getParam("coin");
    const currency = props.currencies.filter(
      c => c.short === coin.toUpperCase()
    )[0];

    this.state = {
      currency,
      refreshing: false,
      y: 0,
      yOffset: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.setCurrencyFetchingInterval();
  }

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;

    if (prevProps.isFocused !== isFocused && isFocused === true) {
      this.setCurrencyFetchingInterval();
    }

    if (isFocused === false && this.currencyFetchingInterval) {
      clearInterval(this.currencyFetchingInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.currencyFetchingInterval);
  }

  setCurrencyFetchingInterval = () => {
    const { actions } = this.props;

    this.currencyFetchingInterval = setInterval(() => {
      actions.getCurrencyRates();
    }, 30000);
  };

  getCoinDetails() {
    const { navigation, walletSummary } = this.props;
    const coin = navigation.getParam("coin");
    if (walletSummary && walletSummary.coins) {
      return walletSummary.coins.find(c => c.short === coin.toUpperCase());
    }
    return {};
  }

  navigateToAllTransactions = () => {
    const { actions } = this.props;
    const { currency } = this.state;

    actions.navigateTo("AllTransactions", { coin: [currency.short] });
  };

  goToCelPay = () => {
    const { currency } = this.state;
    const { actions } = this.props;

    actions.updateFormField("coin", currency.short);
    actions.navigateTo("CelPayLanding");
  };

  goToBuyCoins = () => {
    const { currency } = this.state;
    const { actions } = this.props;
    actions.updateFormField("selectedCoin", currency.short);
    actions.navigateTo("GetCoinsLanding");
  };

  refresh = async () => {
    const { actions } = this.props;
    this.setState({
      refreshing: true,
    });
    await actions.getCurrencyRates();
    this.setState({
      refreshing: false,
    });
  };

  getHeader = () => {
    const { yOffset } = this.state;
    const coinDetails = this.getCoinDetails();
    const opacity = yOffset.interpolate({
      inputRange: [20, 150],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View
        style={{
          width: "100%",
          paddingTop: 25,
          paddingBottom: 15,
          paddingHorizontal: 10,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: getColor(COLOR_KEYS.CARDS),
          opacity,
        }}
      >
        <View style={{ marginLeft: -25, flex: 0.2 }}>
          <Icon name="IconChevronLeft" height={"25"} width={"25"} />
        </View>

        <View style={{ flex: 0.8, alignItems: "center" }}>
          <CelText type={"H2"} weight={"600"}>
            {formatter.crypto(coinDetails.amount, coinDetails.short)}
          </CelText>
        </View>
        <View style={{ flex: 0.2 }} />
      </Animated.View>
    );
  };

  getExpandedHeader = () => {
    const { currency, yOffset } = this.state;
    const { currencies } = this.props;
    const theme = getTheme();
    const style = CoinDetailsStyle();

    const coinDetails = this.getCoinDetails();
    const coinPrice = currencies
      ? currencies
          .filter(c => c.short === coinDetails.short)
          .map(m => m.market_quotes_usd)[0]
      : {};
    let headerHeight;
    if (yOffset < 370) {
      headerHeight = yOffset.interpolate({
        inputRange: [0, 370],
        outputRange: [370, 0],
        extrapolate: Extrapolate.CLAMP,
      });
    }

    return (
      <Animated.View
        style={[
          {
            backgroundColor: getColor(COLOR_KEYS.BANNER_INFO),
            height: headerHeight,
          },
        ]}
      >
        <View
          style={{
            backgroundColor: getColor(COLOR_KEYS.BANNER_INFO),
            paddingVertical: 20,
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
            // borderWidth: 2,
            // borderColor: 'red'
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5, alignItems: "flex-start" }}>
              <Icon name="IconChevronLeft" height={"25"} width={"25"} />
            </View>

            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  borderWidth: 4,
                  borderColor: STYLES.COLORS.WHITE,
                }}
                source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                resizeMethod="resize"
              />
            </View>
          </View>

          <View style={[{ width: "100%" }]}>
            <View
              style={[
                style.amountFlexBox,
                { flexDirection: "column", height: 100 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 5,
                  alignSelf: "flex-start",
                }}
              >
                <CoinIcon
                  customStyles={[style.coinImage, { marginRight: 8 }]}
                  theme={theme}
                  url={currency.image_url}
                  coinShort={currency.short}
                />
                <CelText
                  weight="600"
                  type="H2"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                  style={{ marginTop: 5 }}
                >
                  {currency.displayName} ({currency.short})
                </CelText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Counter
                  weight="600"
                  type="H3"
                  margin={"3 0 3 0"}
                  number={coinDetails.amount_usd.toNumber()}
                  speed={5}
                  usd
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                />
                <CelText
                  weight="300"
                  type="H5"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  {formatter.crypto(coinDetails.amount, coinDetails.short)}
                </CelText>
              </View>
            </View>
            <View>
              <View
                style={{
                  backgroundColor: getColor(COLOR_KEYS.PARAGRAPH),
                  paddingVertical: 20,
                  borderRadius: 8,
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <View style={{ flex: 0.45, alignItems: "center" }}>
                  <CelText
                    type={"H2"}
                    weight={"600"}
                    align={"center"}
                    color={getColor(COLOR_KEYS.CARDS)}
                  >
                    {formatter.usd(coinPrice.price)}
                  </CelText>
                  <CelText
                    type={"H6"}
                    weight={"300"}
                    align={"center"}
                    margin={"10 0 0 0"}
                    color={getColor(COLOR_KEYS.SEPARATORS)}
                  >{`1 ${coinDetails.short} price`}</CelText>
                </View>

                <View style={{ flex: 0.1, alignItems: "center" }}>
                  <Separator
                    vertical
                    color={getColor(COLOR_KEYS.SECTION_TITLE)}
                  />
                </View>

                <View style={{ flex: 0.45, alignItems: "center" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Icon
                      name={
                        coinPrice.percent_change_24h < 0
                          ? `ArrowDown`
                          : `ArrowUp`
                      }
                      height={"10"}
                      width={"10"}
                    />
                    <CelText
                      type={"H2"}
                      weight={"600"}
                      align={"center"}
                      color={getColor(COLOR_KEYS.CARDS)}
                    >
                      {formatter.round(coinPrice.percent_change_24h, {
                        precision: 2,
                      })}
                      %
                    </CelText>
                  </View>
                  <CelText
                    type={"H6"}
                    weight={"300"}
                    align={"center"}
                    margin={"10 0 0 0"}
                    color={getColor(COLOR_KEYS.SEPARATORS)}
                  >
                    Last 24h change
                  </CelText>
                </View>
              </View>
            </View>
            <Separator color={getColor(COLOR_KEYS.BANNER_INFO)} />
          </View>
          {this.getCoinActions()}
        </View>
      </Animated.View>
    );
  };

  getCoinActions = () => {
    const { currency } = this.state;
    const {
      hodlStatus,
      depositCompliance,
      simplexCompliance,
      celpayCompliance,
      actions,
    } = this.props;
    const style = CoinDetailsStyle();

    const coinDetails = this.getCoinDetails();
    const isCoinEligibleForCelPay =
      celpayCompliance.allowed &&
      celpayCompliance.coins.includes(currency.short) &&
      !hodlStatus.isActive;

    const isCoinEligibleForBuying =
      simplexCompliance && simplexCompliance.coins.includes(currency.short);

    const isCoinEligibleForDeposit =
      depositCompliance && depositCompliance.coins.includes(currency.short);

    const isCoinEligibleForWithdraw = !hodlStatus.isActive;

    return (
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          },
        ]}
      >
        {isCoinEligibleForDeposit && (
          <>
            <TouchableOpacity
              style={{
                marginRight: widthPercentageToDP("3.3%"),
              }}
              onPress={() =>
                actions.navigateTo("Deposit", {
                  coin: coinDetails.short,
                })
              }
            >
              <View style={style.buttonItself}>
                <View style={style.buttonIcon}>
                  <Icon fill="primary" name="Deposit" width="25" />
                </View>
                <CelText
                  type="H6"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  Deposit
                </CelText>
              </View>
            </TouchableOpacity>
          </>
        )}
        {isCoinEligibleForCelPay && (
          <>
            <Separator
              vertical
              height={"35%"}
              top={20}
              color={getColor(COLOR_KEYS.BANNER_INFO)}
            />
            <TouchableOpacity
              onPress={this.goToCelPay}
              style={{
                marginLeft: widthPercentageToDP("6.9%"),
                marginRight: widthPercentageToDP("6.9%"),
              }}
            >
              <View style={style.buttonItself}>
                <View style={style.buttonIcon}>
                  <Icon fill="primary" name="CelPay" width="25" />
                </View>

                <CelText
                  type="H6"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  CelPay
                </CelText>
              </View>
            </TouchableOpacity>
          </>
        )}

        {isCoinEligibleForBuying && (
          <>
            <Separator
              vertical
              height={"35%"}
              top={20}
              color={getColor(COLOR_KEYS.BANNER_INFO)}
            />
            <TouchableOpacity
              onPress={this.goToBuyCoins}
              style={{
                marginLeft: widthPercentageToDP("6.9%"),
                marginRight: widthPercentageToDP("6.9%"),
              }}
            >
              <View style={style.buttonItself}>
                <View
                  style={[
                    style.buttonIcon,
                    { transform: [{ rotate: "180deg" }] },
                  ]}
                >
                  <Icon fill="primary" name="CelPay" width="25" />
                </View>

                <CelText
                  type="H6"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  Buy
                </CelText>
              </View>
            </TouchableOpacity>
          </>
        )}

        {isCoinEligibleForWithdraw && (
          <>
            {isCoinEligibleForDeposit && (
              <Separator
                vertical
                height={"35%"}
                top={20}
                color={getColor(COLOR_KEYS.BANNER_INFO)}
              />
            )}
            <TouchableOpacity
              style={style.buttons}
              onPress={() =>
                actions.navigateTo("WithdrawEnterAmount", {
                  coin: coinDetails.short,
                })
              }
            >
              <View style={style.buttonItself}>
                <View style={style.buttonIcon}>
                  <Icon fill="primary" name="Withdraw" width="25" />
                </View>
                <CelText
                  type="H6"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  Withdraw
                </CelText>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  // handleScrollAnimation = val => {
  //   this.setState({
  //     y: val,
  //     yOffset: new Animated.Value(val),
  //   });
  // };

  render() {
    const { currency, yOffset } = this.state;
    const {
      actions,
      interestRates,
      celpayCompliance,
      appSettings,
      interestCompliance,
    } = this.props;

    const coinDetails = this.getCoinDetails();
    const style = CoinDetailsStyle();

    const interestInCoins = appSettings.interest_in_cel_per_coin;
    const interestRate = interestUtil.getUserInterestForCoin(coinDetails.short);

    const isBelowThreshold = interestUtil.isBelowThreshold(coinDetails.short);
    const specialRate = isBelowThreshold
      ? interestRate.specialApyRate
      : interestRate.apyRate;
    const isInCel = !interestRate.inCEL
      ? interestRate.compound_rate
      : specialRate;

    return (
      <Animated.ScrollView
        style={{ backgroundColor: getColor(COLOR_KEYS.BACKGROUND) }}
        horizontal={false}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: yOffset } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          {this.getHeader()}
        </View>
        <View>{this.getExpandedHeader()}</View>

        <GraphContainer
          showCursor
          showPeriods
          type={"coin-balance"}
          coin={currency.short}
          backgroundColor={"#FFFFFF"}
        />
        <View style={style.container}>
          <Card margin="10 0 10 0">
            <View>
              <View style={style.interestWrapper}>
                <View style={style.interestCardWrapper}>
                  <CelText type="H6" weight="300" margin={"3 0 3 0"}>
                    Total interest earned
                  </CelText>
                  <CelText type="H3" weight="600" margin={"3 0 3 0"}>
                    {formatter.usd(coinDetails.interest_earned_usd)}
                  </CelText>
                  <CelText type="H6" weight="300" margin={"3 0 3 0"}>
                    {formatter.crypto(
                      coinDetails.interest_earned,
                      coinDetails.short
                    )}
                  </CelText>
                  {coinDetails.interest_earned_cel &&
                  coinDetails.short !== "CEL" ? (
                    <CelText type="H6" weight="300" margin={"3 0 0 0"}>
                      {formatter.crypto(coinDetails.interest_earned_cel, "CEL")}
                    </CelText>
                  ) : null}
                </View>
                {!!coinDetails &&
                  !!interestRates &&
                  !!interestRates[coinDetails.short] && (
                    <View style={style.interestRateWrapper}>
                      <Badge
                        margin="0 10 10 12"
                        style={{ alignContent: "center" }}
                        color={getColor(COLOR_KEYS.POSITIVE_STATE)}
                      >
                        <CelText
                          margin={"0 5 0 5"}
                          align="justify"
                          type="H5"
                          color="white"
                        >{`${formatter.percentageDisplay(
                          isInCel
                        )} APY`}</CelText>
                      </Badge>
                    </View>
                  )}
              </View>
              <View style={style.graphContainer}>
                <GraphContainer
                  periods={["MONTH", "YEAR"]}
                  showCursor
                  showPeriods
                  interest
                  backgroundColor={"#FFFFFF"}
                  width={widthPercentageToDP("89%")}
                  type={"coin-interest"}
                  coin={currency.short}
                />
              </View>
            </View>
            {celpayCompliance && (
              <InterestCard
                coin={coinDetails.short}
                interestRate={interestRate}
                interestInCoins={interestInCoins}
                setUserAppSettings={actions.setUserAppSettings}
              />
            )}
            <RateInfoCard
              coin={coinDetails}
              navigateTo={actions.navigateTo}
              tierButton
              interestCompliance={interestCompliance}
            />
          </Card>
        </View>

        <View style={style.container}>
          <TransactionsHistory
            hasFilter={false}
            additionalFilter={{
              coin: [coinDetails && coinDetails.short],
              limit: 5,
            }}
          />
        </View>
      </Animated.ScrollView>
    );
  }
}

export default withNavigationFocus(CoinDetails);
