import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withNavigationFocus } from "react-navigation";

import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import CoinDetailsStyle from "./CoinDetails.styles";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Badge from "../../atoms/Badge/Badge";
import { getTheme, widthPercentageToDP } from "../../../utils/styles-util";
import GraphContainer from "../../graphs/GraphContainer/GraphContainer";
import Icon from "../../atoms/Icon/Icon";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import InterestCard from "../../molecules/InterestCard/InterestCard";

const { COLORS } = STYLES;

@connect(
  state => ({
    currencies: state.currencies.rates,
    walletSummary: state.wallet.summary,
    currencyRatesShort: state.currencies.currencyRatesShort,
    interestRates: state.generalData.interestRates,
    celpayCompliance: state.compliance.celpay,
    coinAmount: state.graph.coinLastValue,
    appSettings: state.user.appSettings,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CoinDetails extends Component {
  static currencyFetchingInterval;
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params && params.title && params.coin ? `${params.title}  (${params.coin})` : "Coin Details",
      right: "profile"
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    const coin = navigation.getParam("coin");
    const currency = props.currencies.filter(c => c.short === coin.toUpperCase())[0];

    this.state = {
      currency
    };
  }

  componentDidMount() {
    this.setCurrencyFetchingInterval()
  }

  componentDidUpdate(prevProps) {
    const {isFocused} = this.props;

    if (prevProps.isFocused !== isFocused && isFocused === true) {
      this.setCurrencyFetchingInterval()
    }

    if (isFocused === false && this.currencyFetchingInterval) {
      clearInterval(this.currencyFetchingInterval)
    }
  }

  componentWillUnmount() {
    clearInterval(this.currencyFetchingInterval)
  }

  setCurrencyFetchingInterval = () => {
      const {actions} = this.props;

      this.currencyFetchingInterval = setInterval(() => {
        actions.getCurrencyRates()
      }, 30000)
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
    actions.navigateTo("AllTransactions");
  };

  goToCelPay = () => {
    const { currency } = this.state;
    const { actions } = this.props;

    actions.updateFormField("coin", currency.short);
    actions.navigateTo("CelPayChooseFriend");
  };

  render() {
    const { currency } = this.state;
    const { actions, interestRates, celpayCompliance, currencies, appSettings } = this.props;
    const coinDetails = this.getCoinDetails();
    const style = CoinDetailsStyle();
    const coinPrice = currencies ? currencies.filter(c => c.short === coinDetails.short).map(m => m.market_quotes_usd)[0] : {}
    const theme = getTheme();
    const isCoinEligibleForCelPay = celpayCompliance.allowed && celpayCompliance.coins.includes(currency.short);

    const interestInCoins = appSettings.interest_in_cel_per_coin;

    let interestRate = 0
    if (coinDetails.short !== "CEL" && interestRates[coinDetails.short]) {
      interestRate = appSettings.interest_in_cel
        ? formatter.percentageDisplay(interestRates[coinDetails.short].rate)
        : formatter.percentageDisplay(interestRates[coinDetails.short].cel_rate)
    }

    return (
      <RegularLayout padding={"20 0 100 0"}>
        <View style={style.container}>
          <Card padding={"0 0 0 0"}>
            <View style={style.coinAmountWrapper}>
              <View style={style.amountFlexBox}>
                <CoinIcon customStyles={style.coinImage} theme={theme} url={currency.image_url} coinShort={currency.short} />
                <View style={{ marginLeft: 16 }}>
                  <CelText weight='300' type="H6">{currency.displayName}</CelText>
                  <CelText weight='600' type="H2" margin={"3 0 3 0"}>{formatter.usd(coinDetails.amount_usd)}</CelText>
                  <CelText weight='300' type="H6">{formatter.crypto(coinDetails.amount, coinDetails.short)}</CelText>
                </View>
              </View>
              <Separator/>
              <View style={style.buttonWrapper}>
                <TouchableOpacity
                  style={{ marginLeft: widthPercentageToDP("3.3%"), marginRight: widthPercentageToDP("3.3%") }}
                  onPress={() => actions.navigateTo("Deposit", { coin: coinDetails.short })}>
                  <View style={style.buttonItself}>
                    <Icon
                      fill="primary"
                      name="Deposit"
                      width="25"
                    />

                    <CelText>
                      Deposit
                    </CelText>
                  </View>
                </TouchableOpacity>
                <Separator vertical height={"35%"} top={20}/>
                {isCoinEligibleForCelPay && (
                  <TouchableOpacity onPress={this.goToCelPay} style={{
                    marginLeft: widthPercentageToDP("6.9%"),
                    marginRight: widthPercentageToDP("6.9%")
                  }}>

                    <View style={style.buttonItself}>
                      <Icon
                        fill="primary"
                        name="CelPay"
                        width="25"
                      />

                      <CelText>
                        CelPay
                      </CelText>
                    </View>

                  </TouchableOpacity>
                )}

                {isCoinEligibleForCelPay && (
                  <Separator vertical height={"35%"} top={20}/>
                )}

                <TouchableOpacity style={style.buttons}
                                  onPress={() => actions.navigateTo("WithdrawEnterAmount", { coin: coinDetails.short })}>
                  <View style={style.buttonItself}>
                    <Icon
                      fill="primary"
                      name="Withdraw"
                      width="25"
                    />
                    <CelText>
                      Withdraw
                    </CelText>
                  </View>
                </TouchableOpacity>
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
          {coinDetails.short !== "CEL" ?
            <Card margin="10 0 10 0">
              <View>
                <View style={style.interestWrapper}>
                  <View style={style.interestCardWrapper}>
                    <CelText type="H6" weight='300'>Total interest earned</CelText>
                    <CelText type="H3" weight='600' margin={'3 0 3 0'}>{formatter.usd(coinDetails.interest_earned_usd)}</CelText>
                    <CelText type="H6" weight='300'>{formatter.crypto(coinDetails.interest_earned, coinDetails.short)}</CelText>
                    { coinDetails.interest_earned_cel ? (
                        <CelText type="H6" weight='300'>{formatter.crypto(coinDetails.interest_earned_cel, "CEL")}</CelText>
                    ) : null }
                  </View>
                  {!!coinDetails && !!interestRates && !!interestRates[coinDetails.short] && (
                    <View style={style.interestRateWrapper}>
                      <CelText type="H6" weight='300'>Current rate</CelText>
                      <View>
                        <Badge margin='12 0 10 12' style={{alignContent: 'center',}} color={COLORS.GREEN}>
                          <CelText align='justify' type="H5" color="white">{interestRate}</CelText>
                        </Badge>
                      </View>
                    </View>
                  )}
                </View>
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
              <Separator margin={"20 0 10 0"}/>
              <InterestCard
                coin={coinDetails.short}
                interestInCoins={interestInCoins}
                setUserAppSettings={actions.setUserAppSettings}
              />
            </Card>
            : null}
        </View>

        <View style={style.container}>
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
              <View>
                <CelText type={"H2"} weight={"600"} align={"center"}>{formatter.usd(coinPrice.price)}</CelText>
                <CelText type={"H6"} weight={"300"} align={"center"} margin={"10 0 0 0"}>{`1 ${coinDetails.short} price`}</CelText>
              </View>
              <Separator vertical/>
              <View>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-around"}}>
                  <Icon
                    name={coinPrice.percent_change_24h < 0 ? `ArrowDown` : `ArrowUp`}
                    height={"10"}
                    width={"10"}
                  />
                  <CelText type={"H2"} weight={"600"}
                           align={"center"}>{formatter.round(coinPrice.percent_change_24h, { precision: 2 })}%</CelText>
                </View>
                <CelText type={"H6"} weight={"300"} align={"center"} margin={"10 0 0 0"}>Last 24h change</CelText>
              </View>
            </View>
          </Card>
        </View>

        <View style={style.container}>
          <TransactionsHistory
            hasFilter={false}
            additionalFilter={{ coin: coinDetails && coinDetails.short, limit: 5 }}
          />

          <CelButton
            basic
            margin="0 0 15 0"
            onPress={this.navigateToAllTransactions}
          >
            See all
          </CelButton>
        </View>

        <View>
          <CelButton onPress={() => actions.navigateTo("WithdrawEnterAmount", { coin: coinDetails.short })}>
            Withdraw
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default withNavigationFocus(CoinDetails)
