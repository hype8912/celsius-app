import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import * as appActions from "../../../redux/actions";

import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    activeScreen: state.nav.activeScreen,
    walletSummary: state.wallet.summary,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Counter extends Component {
  static propTypes = {
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    weight: PropTypes.string,
    type: PropTypes.string,
    margin: PropTypes.string,
    speed: PropTypes.number,
    color: PropTypes.string,
    usd: PropTypes.bool,
    align: PropTypes.string,
    hideFromRecording: PropTypes.bool,
  };

  static defaultProps = {
    usd: false,
    hideFromRecording: false,
  };

  static countInterval;

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      shouldCount: false,
      counter: 0,
    };
  }

  componentDidMount() {
    const { activeScreen } = this.props;
    if (
      [
        SCREENS.COIN_DETAILS,
        SCREENS.WALLET_INTEREST,
        SCREENS.COMMUNITY,
      ].indexOf(activeScreen) !== -1
    ) {
      this.countUp();
    }
  }

  componentDidUpdate(prevProps) {
    const { walletSummary, activeScreen } = this.props;

    if (
      formatter.usd(prevProps.walletSummary.total_amount_usd) !==
        formatter.usd(walletSummary.total_amount_usd) ||
      formatter.usd(prevProps.walletSummary.total_interest_earned) !==
        formatter.usd(walletSummary.total_interest_earned) ||
      (activeScreen !== prevProps.activeScreen &&
        [
          SCREENS.COIN_DETAILS,
          SCREENS.WALLET_INTEREST,
          SCREENS.COMMUNITY,
        ].indexOf(activeScreen) !== -1)
    ) {
      this.countUp();
    }
  }

  countUp = () => {
    const { number, speed } = this.props;
    const increment = Number(number) / speed;
    this.setState({
      shouldCount: true,
    });
    const self = this;

    self.countInterval = setInterval(() => {
      const { value, counter } = self.state;
      if (Number(value) < Number(number)) {
        self.setState({
          counter: counter + increment,
        });
        self.setState({
          value: counter,
        });
      } else {
        self.setState({
          value: number,
        });
        clearInterval(self.countInterval);
      }
    }, 50);
  };

  render() {
    const { value, shouldCount } = this.state;
    const {
      margin,
      weight,
      type,
      number,
      color,
      usd,
      align,
      hideFromRecording,
    } = this.props;

    const amount = shouldCount ? value : number;
    const valueToShow = usd
      ? formatter.usd(amount)
      : formatter.round(amount, { noPrecision: true });

    return (
      <CelText
        hideFromRecording={hideFromRecording}
        weight={weight}
        type={type}
        align={align}
        margin={margin}
        color={color}
      >
        {valueToShow}
      </CelText>
    );
  }
}

export default Counter;
