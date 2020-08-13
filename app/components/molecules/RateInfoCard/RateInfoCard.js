import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import RateInfoCardStyle from "./RateInfoCard.styles";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import interestUtil from "../../../utils/interest-util";
import formatter from "../../../utils/formatter";
import CelButton from "../../atoms/CelButton/CelButton";
import { isUSResident } from "../../../utils/user-util";
import * as appActions from "../../../redux/actions";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    if ((!interestCompliance && !interestCompliance.allowed) || isUSResident())
      return null;
    return (
      <View style={style}>
        {!interestRate.inCEL ? (
          <Card color={getColor(COLOR_KEYS.LINK)}>
            <CelText color={"white"}>
              Upgrade your interest settings to earn in CEL and you could get up
              to {formatter.percentageDisplay(interestRate.compound_cel_rate)}{" "}
              APY on your first{" "}
              <CelText
                color={"white"}
                weight={"bold"}
              >{`${interestRate.threshold_on_first_n_coins} ${coin.short}`}</CelText>
              ! {`${coin.short}`} balances greater than{" "}
              {`${interestRate.threshold_on_first_n_coins} ${coin.short}`} will
              continue to earn at{" "}
              {formatter.percentageDisplay(interestRate.cel_rate)} APY.
            </CelText>
          </Card>
        ) : (
          <Card color={STYLES.COLORS.CELSIUS_BLUE}>
            <CelText color={"white"}>
              Keep HODLing and you could earn up to{" "}
              {formatter.percentageDisplay(interestRate.compound_cel_rate)} APY
              on your first{" "}
              <CelText
                color={"white"}
                weight={"bold"}
              >{`${interestRate.threshold_on_first_n_coins} ${coin.short}`}</CelText>
              ! {`${coin.short}`} balances greater than{" "}
              {`${interestRate.threshold_on_first_n_coins}`} will continue to
              earn at {formatter.percentageDisplay(interestRate.cel_rate)} APY.{" "}
            </CelText>
          </Card>
        )}
        {tierButton && (
          <CelButton
            onPress={() => navigateTo("MyCel")}
            basic
            margin={"10 0 10 0"}
          >
            Check tier level
          </CelButton>
        )}
        {celInterestButton && (
          <CelButton
            onPress={() => navigateTo("WalletSettings")}
            basic
            margin={"10 0 10 0"}
          >
            Earn interest in Cel
          </CelButton>
        )}
      </View>
    );
  }
}

export default RateInfoCard;
