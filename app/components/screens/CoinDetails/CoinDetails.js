import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";

import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
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

  render() {
    const { currency, refreshing } = this.state;
    const {
      actions,
      interestRates,
      celpayCompliance,
      currencies,
      appSettings,
      hodlStatus,
      interestCompliance,
      depositCompliance,
      simplexCompliance,
    } = this.props;

    const coinDetails = this.getCoinDetails();
    const style = CoinDetailsStyle();
    const coinPrice = currencies
      ? currencies
          .filter(c => c.short === coinDetails.short)
          .map(m => m.market_quotes_usd)[0]
      : {};
    const theme = getTheme();

    const isCoinEligibleForCelPay =
      celpayCompliance.allowed &&
      celpayCompliance.coins.includes(currency.short) &&
      !hodlStatus.isActive;

    const isCoinEligibleForBuying =
      simplexCompliance && simplexCompliance.coins.includes(currency.short);

    const isCoinEligibleForDeposit =
      depositCompliance && depositCompliance.coins.includes(currency.short);

    const isCoinEligibleForWithdraw = !hodlStatus.isActive;

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
      <RegularLayout
        padding={"20 0 100 0"}
        refreshing={refreshing}
        pullToRefresh={this.refresh}
      >
        <View style={style.container}>
          <Card padding={"0 0 7 0"}>
            <View style={style.coinAmountWrapper}>
              <View style={style.amountFlexBox}>
                <CoinIcon
                  customStyles={style.coinImage}
                  theme={theme}
                  url={currency.image_url}
                  coinShort={currency.short}
                />
                <View style={{ marginLeft: 16 }}>
                  <CelText weight="300" type="H6">
                    {currency.displayName}
                  </CelText>
                  <Counter
                    weight="600"
                    type="H2"
                    margin={"3 0 3 0"}
                    number={coinDetails.amount_usd.toNumber()}
                    speed={5}
                    usd
                  />
                  <CelText weight="300" type="H6">
                    {formatter.crypto(coinDetails.amount, coinDetails.short)}
                  </CelText>
                </View>
              </View>
              <Separator />
              <View style={style.buttonWrapper}>
                {isCoinEligibleForDeposit && (
                  <>
                    <TouchableOpacity
                      style={{
                        marginLeft: widthPercentageToDP("3.3%"),
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
                        <CelText type="H6">Deposit</CelText>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
                {isCoinEligibleForCelPay && (
                  <>
                    <Separator vertical height={"35%"} top={20} />
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

                        <CelText type="H6">CelPay</CelText>
                      </View>
                    </TouchableOpacity>
                  </>
                )}

                {isCoinEligibleForBuying && (
                  <>
                    <Separator vertical height={"35%"} top={20} />
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

                        <CelText type="H6">Buy</CelText>
                      </View>
                    </TouchableOpacity>
                  </>
                )}

                {isCoinEligibleForWithdraw && (
                  <>
                    {isCoinEligibleForDeposit && (
                      <Separator vertical height={"35%"} top={20} />
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
                        <CelText type="H6">Withdraw</CelText>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Card>
        </View>

        <GraphContainer
          showCursor
          showPeriods
          type={"coin-balance"}
          coin={currency.short}
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
                  width={widthPercentageToDP("78%")}
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

        <View style={style.priceIndicator}>
          <Card>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View>
                <CelText type={"H2"} weight={"600"} align={"center"}>
                  {formatter.usd(coinPrice.price)}
                </CelText>
                <CelText
                  type={"H6"}
                  weight={"300"}
                  align={"center"}
                  margin={"10 0 0 0"}
                >{`1 ${coinDetails.short} price`}</CelText>
              </View>
              <Separator vertical />
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Icon
                    name={
                      coinPrice.percent_change_24h < 0 ? `ArrowDown` : `ArrowUp`
                    }
                    height={"10"}
                    width={"10"}
                  />
                  <CelText type={"H2"} weight={"600"} align={"center"}>
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
                >
                  Last 24h change
                </CelText>
              </View>
            </View>
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
      </RegularLayout>
    );
  }
}

export default withNavigationFocus(CoinDetails);
