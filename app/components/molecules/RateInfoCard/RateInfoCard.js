import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import RateInfoCardStyle from "./RateInfoCard.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import interestUtil from "../../../utils/interest-util";
import formatter from "../../../utils/formatter";
import CelButton from "../../atoms/CelButton/CelButton";
import { isUSCitizen } from "../../../utils/user-util/user-util";
import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    celUtilityTiers: state.generalData.celUtilityTiers,
    interestCompliance: state.compliance.interest,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class RateInfoCard extends Component {
  static propTypes = {
    tierButton: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object),
    ]),
    celInterestButton: PropTypes.bool,
    interestCompliance: PropTypes.instanceOf(Object),
  };
  static defaultProps = {
    showButton: false,
    style: {},
  };

  renderContent = (interestRate, coin, rate) => {
    if (isUSCitizen())
      return (
        <Card color={getColor(COLOR_KEYS.LINK)}>
          <CelText color={"white"}>
            Earn {formatter.percentageDisplay(rate.bonus)} APY on your first{" "}
            <CelText
              color={"white"}
              weight={"bold"}
            >{`${rate.threshold} ${coin.short}`}</CelText>
            ! Remaining {`${coin.short}`} balances will continue to earn at{" "}
            {formatter.percentageDisplay(rate.apyRate)} APY.{" "}
          </CelText>
        </Card>
      );
    if (!interestRate.inCEL)
      return (
        <Card color={getColor(COLOR_KEYS.LINK)}>
          <CelText color={"white"}>
            Upgrade your interest settings to earn in CEL and you could get up
            to {formatter.percentageDisplay(rate.bonus)} APY on your first{" "}
            <CelText
              color={"white"}
              weight={"bold"}
            >{`${rate.threshold} ${coin.short}`}</CelText>
            ! {`${coin.short}`} balances greater than{" "}
            {`${rate.threshold} ${coin.short}`} will continue to earn at{" "}
            {formatter.percentageDisplay(rate.apyRate)} APY.
          </CelText>
        </Card>
      );
    return (
      <Card color={getColor(COLOR_KEYS.LINK)}>
        <CelText color={"white"}>
          Keep HODLing and you could earn up to{" "}
          {formatter.percentageDisplay(rate.bonus)} APY on your first{" "}
          <CelText
            color={"white"}
            weight={"bold"}
          >{`${rate.threshold} ${coin.short}`}</CelText>
          ! {`${coin.short}`} balances greater than {`${rate.threshold}`} will
          continue to earn at {formatter.percentageDisplay(rate.apyRate)} APY.{" "}
        </CelText>
      </Card>
    );
  };

  render() {
    const {
      coin,
      navigateTo,
      tierButton,
      style,
      celInterestButton,
      interestCompliance,
    } = this.props;

    if (!coin) return null;

    const interestRate = interestUtil.getUserInterestForCoin(coin.short);

    if (
      !interestRate.rate_on_first_n_coins &&
      !interestRate.threshold_on_first_n_coins
    )
      return null;

    if (
      (!interestCompliance && !interestCompliance.allowed) ||
      (isUSCitizen() && (!interestRate.threshold_us || !interestRate.rate_us))
    )
      return null;

    const rate = isUSCitizen()
      ? {
          threshold: interestRate.threshold_us,
          bonus: interestRate.rate_us,
          apyRate: interestRate.compound_rate,
        }
      : {
          threshold: interestRate.threshold_on_first_n_coins,
          bonus: interestRate.compound_cel_rate,
          apyRate: interestRate.cel_rate,
        };
    return (
      <View style={style}>
        {this.renderContent(interestRate, coin, rate)}
        {tierButton && (
          <CelButton
            onPress={() => navigateTo(SCREENS.MY_CEL)}
            basic
            margin={"10 0 10 0"}
          >
            Check tier level
          </CelButton>
        )}
        {celInterestButton &&
          coin.amount_usd.isGreaterThan(0) &&
          !isUSCitizen() && (
            <CelButton
              onPress={() => navigateTo(SCREENS.WALLET_SETTINGS)}
              basic
              margin={"10 0 10 0"}
            >
              Earn rewards in Cel
            </CelButton>
          )}
      </View>
    );
  }
}

export default RateInfoCard;
