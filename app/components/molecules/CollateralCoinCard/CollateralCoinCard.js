import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as appActions from "../../../redux/actions";
import { COIN_CARD_TYPE } from "../../../constants/UI";

import { getTheme } from "../../../utils/styles-util";
import CoinIcon from "../../atoms/CoinIcon/CoinIcon";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import Icon from "../../atoms/Icon/Icon";

import STYLES from "../../../constants/STYLES";
import CollateralCoinCardStyle from "./CollateralCoinCard.styles";
import Separator from "../../atoms/Separator/Separator";

@connect(
  state => ({
    coins: state.compliance.loan.coins,
    currencies: state.currencies.rates,
    currencyRatesShort: state.currencies.currencyRatesShort,
    formData: state.forms.formData,
    walletSummary: state.wallet.summary.coins,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CollateralCoinCard extends Component {
  static propTypes = {
    coin: PropTypes.instanceOf(Object).isRequired,
    type: PropTypes.oneOf("Collateral", "PrincipalPayment"),
    isLoading: PropTypes.bool,
    isMarginCall: PropTypes.bool,
    marginCall: PropTypes.instanceOf(Object),
    amountNeededUsd: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      currency: null,
      name: null,
      fiat: null,
      collateralAmount: null,
      color: null,
      amount: null,
      amount_usd: null,
      additionalCryptoAmount: null,
      isAllowed: false,
      additionalInfoExplanation: null,
    };
  }

  componentDidMount() {
    this.setValues();
  }

  setValues = async () => {
    const {
      type,
      formData,
      coin,
      currencies,
      walletSummary,
      isMarginCall,
      marginCall,
      currencyRatesShort,
      amountNeededUsd,
    } = this.props;
    let value;
    let cryptoAmount;
    let amountUsd;
    let additionalCryptoAmount;
    let isAllowed;
    let color;

    // constant values
    const name = formatter.capitalize(coin.name);
    const currency = currencies.filter(
      c => c.short === coin.short.toUpperCase()
    )[0];
    const walletCoin = walletSummary.find(c => c.short === coin.short);

    // default values
    cryptoAmount = walletCoin
      ? formatter.crypto(walletCoin.amount, walletCoin.short, { precision: 2 })
      : null;
    amountUsd = walletCoin ? formatter.usd(walletCoin.amount_usd) : null;
    isAllowed = walletCoin ? walletCoin.amount_usd > 0 : false; // TODO check this!

    await this.setState({ name, currency, isAllowed });

    if (type === COIN_CARD_TYPE.COLLATERAL_COIN_CARD) {
      cryptoAmount = formatter.crypto(coin.amount, coin.short, {
        precision: 2,
      });
      amountUsd = formatter.usd(coin.amount_usd);

      const collateralAmount = formData.loanAmount * 2;
      isAllowed = coin.amount_usd >= collateralAmount;
      color =
        coin.amount_usd < collateralAmount
          ? STYLES.COLORS.RED
          : STYLES.COLORS.MEDIUM_GRAY;

      if (currency) {
        value =
          (formData.loanAmount * 2 - coin.amount_usd) /
          currency.market_quotes_usd.price;
      }
      additionalCryptoAmount = formatter.crypto(value, coin.short, {
        precision: 2,
      });

      await this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount,
        amountUsd,
        additionalCryptoAmount,
        color,
        isAllowed,
      });
    } else if (type === COIN_CARD_TYPE.PRINCIPAL_PAYMENT_COIN_CARD) {
      isAllowed = walletCoin ? walletCoin.amount_usd > amountNeededUsd : false;
      color = !isAllowed ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;
      value =
        (amountNeededUsd - walletCoin.amount_usd) /
        currencyRatesShort[coin.short.toLowerCase()];
      additionalCryptoAmount = formatter.crypto(value, coin.short, {
        precision: 2,
      });

      await this.setState({
        additionalInfoExplanation: "required for a principal payout.",
        cryptoAmount,
        amountUsd,
        isAllowed,
        color,
        additionalCryptoAmount,
      });
    } else if (type === COIN_CARD_TYPE.LOAN_PAYMENT_COIN_CARD) {
      color = !isAllowed ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;
      await this.setState({
        additionalInfoExplanation:
          "required for a first month of loan interest payment.",
        cryptoAmount,
        amountUsd,
        isAllowed,
        color,
        // TODO when API is completed add state: additionalCryptoAmount
      });
    } else if (type === COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD) {
      const amountNeededInCoin =
        Number(marginCall.margin_call_usd_amount) /
        currencyRatesShort[coin.short.toLowerCase()];
      isAllowed = coin.amount >= amountNeededInCoin;
      color = !isAllowed ? STYLES.COLORS.RED : STYLES.COLORS.MEDIUM_GRAY;

      // additionalCryptoAmount - margin call value
      let marginCallValue;

      if (isMarginCall && amountNeededInCoin > Number(coin.amount)) {
        marginCallValue = formatter.crypto(
          amountNeededInCoin - Number(coin.amount),
          coin.short,
          { precision: 4 }
        );
      } else {
        marginCallValue = formatter.crypto(amountNeededInCoin, coin.short, {
          precision: 4,
        });
      }

      await this.setState({
        additionalInfoExplanation: "required.",
        cryptoAmount,
        amountUsd,
        isAllowed,
        additionalCryptoAmount: marginCallValue,
        color,
      });
    }
  };

  // only when open margin call
  renderMarginCall = () => {
    const { coin } = this.props;
    const { additionalCryptoAmount } = this.state;

    const style = CollateralCoinCardStyle();
    return (
      <View style={style.marginRequired}>
        <CelText align="left" weight="300" type="H6">
          <CelText align="left" weight="600" type="H6">
            {`${formatter.crypto(additionalCryptoAmount, coin.short, {
              precision: 4,
            })} `}
          </CelText>
          required to cover margin call
        </CelText>
      </View>
    );
  };

  renderAdditionalInformation = () => {
    const { additionalCryptoAmount, additionalInfoExplanation } = this.state;
    return (
      <View>
        <Separator size={2} margin={"10 0 5 0"} />
        <View>
          <CelText weight={"300"} align="left">
            Additional
            <CelText weight={"500"} align="left">
              {` ${additionalCryptoAmount} `}
              <CelText weight={"300"} align="left">
                {`${additionalInfoExplanation}`}
              </CelText>
            </CelText>
          </CelText>
        </View>
      </View>
    );
  };

  renderDepositMore = () => {
    const { coin, actions } = this.props;
    return (
      <TouchableOpacity
        onPress={() => actions.navigateTo("Deposit", { coin: coin.short })}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <Icon
            fill={STYLES.COLORS.CELSIUS_BLUE}
            width="13"
            height="13"
            name="CirclePlus"
          />
          <CelText margin={"0 0 0 5"} color={STYLES.COLORS.CELSIUS_BLUE}>
            Deposit more
          </CelText>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    const { handleSelectCoin, coin, marginCall, isLoading } = this.props;
    const {
      name,
      cryptoAmount,
      amountUsd,
      color,
      currency,
      isAllowed,
    } = this.state;

    const style = CollateralCoinCardStyle();
    const theme = getTheme();

    if (currency && cryptoAmount) {
      return (
        <Card
          onPress={isAllowed ? () => handleSelectCoin(coin.short) : null}
          color={isAllowed ? null : style.cardStyle.color}
          opacity={isLoading ? 0.7 : 1}
        >
          <View key={coin.name} style={style.mainContainer}>
            <View style={style.iconContainer}>
              <CoinIcon
                customStyles={[
                  style.coinImage,
                  { opacity: isAllowed ? 1 : 0.4 },
                ]}
                theme={theme}
                url={currency.image_url}
                coinShort={currency.short}
              />
            </View>
            <View style={style.textContainer}>
              <View style={{ opacity: isAllowed ? 1 : 0.4 }}>
                <CelText weight={"600"} align="left" type="H3">
                  {name}
                </CelText>
                <CelText weight={"300"} align="left" style={{ color }}>
                  {cryptoAmount}
                  <CelText weight={"300"} align="left">
                    {" | "}
                    <CelText weight={"300"} align="left" style={{ color }}>
                      {amountUsd} USD
                    </CelText>
                  </CelText>
                </CelText>
              </View>
              {marginCall && isAllowed ? this.renderMarginCall() : null}

              {!isAllowed ? (
                <View>
                  {this.renderAdditionalInformation()}
                  {this.renderDepositMore()}
                </View>
              ) : null}
            </View>
          </View>
        </Card>
      );
    }
    return null;
  };
}

export default CollateralCoinCard;
