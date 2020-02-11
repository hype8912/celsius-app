import React, { Component } from 'react';
import { View } from "react-native";
import PropTypes from "prop-types";

// import RateInfoCardStyle from "./RateInfoCard.styles";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import interestUtil from "../../../utils/interest-util";
import CelButton from "../../atoms/CelButton/CelButton";

class RateInfoCard extends Component {

  static propTypes = {
    tierButton: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.number, // StyleSheet.create() returns number
      PropTypes.instanceOf(Object),
    ]),
    celInterestButton: PropTypes.bool,
    interestCompliance: PropTypes.instanceOf(Object)
  };
  static defaultProps = {
    showButton: false,
    style: {}
  }

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
  }

  render() {
    const {coin, actions, tierButton, style, celInterestButton, interestCompliance} = this.props;

    // const styles = RateInfoCardStyle()
    const interestRate = interestUtil.getUserInterestForCoin(!coin ? "BTC": coin.short);
    if (!interestRate.specialRate && !interestRate.coinThreshold) return null;
    if (!interestCompliance.allowed) return null;

    return (
        <View style={style}>
            {!interestRate.inCEL ?
            <Card color={STYLES.COLORS.CELSIUS_BLUE}>
              <CelText color={"white"}>
                Upgrade your interest settings to earn in CEL and you could get up to {interestRate.specialRateDisplay} APY on your first <CelText color={"white"} weight={"bold"}>{`${interestRate.coinThreshold} ${interestRate.coin}`}</CelText>! BTC balances greater than {`${interestRate.coinThreshold} ${interestRate.coin}`} will continue to earn at {`${interestRate.display}`} APY.
              </CelText>
            </Card>
            :
          <Card color={STYLES.COLORS.CELSIUS_BLUE}>
            <CelText color={"white"}>Keep HODLing and you could earn up to {interestRate.specialRateDisplay} APY on your first <CelText color={"white"} weight={"bold"}>{`${interestRate.coinThreshold} ${interestRate.coin}`}</CelText>! BTC balances greater than {`${interestRate.coinThreshold}`} will continue to earn at {`${interestRate.display}`} APY. </CelText>
          </Card>
            }
          {tierButton &&
          <CelButton
            onPress={() => actions.navigateTo("MyCel")}
            basic
            margin={"10 0 10 0"}
          >
            Check tier level
          </CelButton>
          }
          {celInterestButton &&
          <CelButton
            onPress={() => actions.navigateTo("WalletSettings")}
            basic
            margin={"10 0 10 0"}
          >
            Earn interest in Cel
          </CelButton>
          }
        </View>
    );
  }
}

export default RateInfoCard
