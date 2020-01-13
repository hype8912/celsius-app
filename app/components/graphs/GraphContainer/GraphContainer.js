import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import GraphContainerStyle from "./GraphContainer.styles";
import PeriodGraphView from "../PeriodGraphView/PeriodGraphView";
import Graph from "../Graph/Graph";
import XTicks from "../XTicks/XTicks";
import Spinner from "../../atoms/Spinner/Spinner";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import { widthPercentageToDP } from "../../../utils/styles-util";

@connect(
  (state, props) => {
    let graphData;

    if (props.type === "total-balance")
      graphData = state.graph.walletTotalChartData;
    if (props.type === "total-interest")
      graphData = state.graph.interestChartData;
    if (props.type === "coin-balance")
      graphData = state.graph.coinWalletChartData;
    if (props.type === "coin-interest")
      graphData = state.graph.coinInterestChartData;

    return {
      currenciesRates: state.currencies.rates,
      callsInProgress: state.api.callsInProgress,
      graphData,
      time: state.graph.timeline.time,
    };
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class GraphContainer extends Component {
  static propTypes = {
    showXTicks: PropTypes.bool,
    showPeriods: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,

    type: PropTypes.oneOf([
      "total-balance",
      "total-interest",
      "coin-balance",
      "coin-interest",
    ]).isRequired,
    period: PropTypes.oneOf(["1d", "1w", "1m", "1y"]),
    coin: PropTypes.string,
  };
  static defaultProps = {
    showXTicks: false,
    showCursor: false,
    showPeriods: false,

    period: "1d",
  };

  constructor(props) {
    super(props);
    this.state = {
      timeline: props.period,
    };
  }

  componentDidMount = () => this.renderTimeline();

  componentDidUpdate(prevProps, prevState) {
    const { type, time } = this.props;

    if (type !== "coin-interest" && time && prevState.timeline !== time) {
      this.renderTimeline(this.props.time);
    }
  }

  splitArrays = () => {
    const { graphData } = this.props;

    if (!graphData)
      return {
        dates: [],
        prices: [],
      };

    return {
      dates: graphData.map(d => d[0]),
      prices: graphData.map(d => d[1]),
    };
  };

  renderTimeline = period => {
    const { type, coin, actions } = this.props;
    let timePeriod;

    if (type === "coin-interest") {
      timePeriod = !period ? "1m" : period;
    } else {
      timePeriod = !period ? "1d" : period;
    }

    this.setState({
      timeline: timePeriod,
    });

    if (type === "total-balance") {
      actions.getTotalWalletBalanceData(timePeriod);
    }

    if (type === "total-interest") {
      actions.getInterestGraphData(timePeriod);
    }

    if (type === "coin-balance") {
      actions.getCoinWalletBalanceData(coin, timePeriod);
    }

    if (type === "coin-interest") {
      actions.getCoinInterestGraphData(coin, timePeriod);
    }
  };

  render() {
    const {
      graphData,
      periods,
      showPeriods,
      showXTicks,
      interest,
      width,
      showCursor,
      callsInProgress,
      type,
      coin,
      currenciesRates,
    } = this.props;
    const { timeline } = this.state;
    const style = GraphContainerStyle();
    let rate;

    if (!type) return null;

    const calls = [
      { name: "total-balance", api: API.GET_WALLET_BALANCE_DATA },
      { name: "coin-balance", api: API.GET_COIN_WALLET_BALANCE_DATA },
      { name: "total-interest", api: API.GET_INTEREST_GRAPH_DATA },
      { name: "coin-interest", api: API.GET_COIN_INTEREST_GRAPH_DATA },
    ];

    const activeCall = calls
      .filter(call => call.name === type)
      .map(item => item.api);
    const isLoading =
      !graphData ||
      !graphData.length ||
      apiUtil.areCallsInProgress(activeCall, callsInProgress);

    const { dates, prices } = this.splitArrays();
    if (interest && !isLoading && prices.length > 0) {
      const sum = prices.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue)
      );
      if (Number(sum) === 0) return null;
    }

    if (!currenciesRates) return null;
    if (type === "coin-balance") {
      rate = currenciesRates.find(c => c.short === coin).price_change_usd[
        timeline
      ];
    }
    if (type === "total-balance") {
      rate = prices[prices.length - 1] >= prices[prices.length - 2] ? 1 : -1;
    }

    const spinnerWidth =
      type === "coin-interest"
        ? widthPercentageToDP("78%")
        : widthPercentageToDP("100%");

    return (
      <View style={[style.container, { width }]}>
        {showPeriods && (
          <View style={style.period}>
            <PeriodGraphView
              type={type}
              width={width}
              periods={periods}
              onChange={this.renderTimeline}
            />
          </View>
        )}
        {isLoading ? (
          <View style={[style.spinner, { width: spinnerWidth }]}>
            <Spinner />
          </View>
        ) : (
          <Graph
            type={type}
            width={width}
            dateArray={dates}
            priceArray={prices}
            interest={interest}
            showCursor={showCursor}
            rate={rate}
            timeline={timeline}
          />
        )}
        <View>
          {showXTicks && !isLoading && (
            <XTicks width={width} time={dates} timeline={timeline} />
          )}
        </View>
      </View>
    );
  }
}

export default GraphContainer;
