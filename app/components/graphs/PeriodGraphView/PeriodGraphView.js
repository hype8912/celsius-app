import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


import * as appActions from "../../../redux/actions";
import PeriodGraphViewStyle from "./PeriodGraphView.styles";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";


@connect(
  state => ({
    period: state.graph.timeline.period
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PeriodGraphView extends Component {

  static propTypes = {
    periods: PropTypes.instanceOf(Array)
  };
  static defaultProps = {
    periods: ["DAY", "WEEK", "MONTH", "YEAR"],
    showPeriods: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type !== "coin-interest" && nextProps.period && nextProps.period !== prevState.activePeriod) {
      return { activePeriod: nextProps.period };
    }

    return null
  }

  constructor(props) {
    super(props);

    const { type } = this.props;

    this.state = {
      // initial state
      activePeriod: type === "coin-interest" ? "MONTH" : "DAY"
    };
    // binders
  }

  activatePeriod = (period) => {
    const { actions } = this.props;
    let tm;

    switch (period) {
      case "DAY":
        tm = "1d";
        break;
      case "WEEK":
        tm = "7d";
        break;
      case "MONTH":
        tm = "1m";
        break;
      case "YEAR":
        tm = "1y";
        break;
      default:
        tm = "1d";
    }

    actions.activeTimeline(tm, period);

    this.setState({
      activePeriod: period
    });

    this.props.onChange(tm);
  };

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const { periods, width } = this.props;
    const { activePeriod } = this.state;
    const style = PeriodGraphViewStyle();

    return (
      <View style={[style.periods, { width, marginBottom: 10 }]}>
        {periods.map((period) => (
          <TouchableOpacity key={period} style={{ alignItems: "center" }}
                            onPress={() => this.activatePeriod(period)}>
            <CelText
              key={period}
              type='H6'
              weight={activePeriod === period ? "medium" : "regular"}
              color={activePeriod === period ? STYLES.COLORS.CELSIUS_BLUE : null}
            >
              {period}
            </CelText>
            {activePeriod === period &&
            <View style={style.active}/>
            }
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default PeriodGraphView
