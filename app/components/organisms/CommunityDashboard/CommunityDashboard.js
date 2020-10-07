import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";

import CommunityDashboardStyle from "./CommunityDashboard.styles";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    communityStats: state.community.stats,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class CommunityDashboard extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    buttonTypes: PropTypes.instanceOf(Array),
    name: PropTypes.string,
    info: PropTypes.bool,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    const { buttonTypes } = this.props;

    this.state = {
      activeButton: buttonTypes ? buttonTypes[0].buttonType : "",
      primaryNumber: "",
      explanation: "",
    };
  }

  componentDidMount() {
    const { name, communityStats } = this.props;
    if (name === "CELPAY") {
      this.setState({
        primaryNumber: formatter.usd(communityStats.total_celpay_sent_usd),
        explanation: "Sent via CelPay in total",
      });
    }
    if (name === "REWARDS") {
      this.setState({
        primaryNumber: formatter.usd(communityStats.total_interests_usd),
        explanation: "Total community earn in the last 12 months",
      });
    }
    if (name === `ASSETS AS OF ${communityStats.community_settings.date}`) {
      this.setState({
        primaryNumber: formatter.usd(
          communityStats.community_settings.total_aum,
          {
            precision: 0,
          }
        ),
        explanation: "Total Community Assets",
      });
    }
  }

  handlePress = button => {
    const { name, communityStats } = this.props;
    let number;
    let explanationText;

    if (name === "BORROW" && button === "Loans") {
      number = 20000;
      explanationText = "Highest $ loan taken";
    }
    if (name === "BORROW" && button === "Average") {
      number = 25000;
      explanationText = "Highest $ loan taken";
    }
    if (name === "BORROW" && button === "Total") {
      explanationText = "Highest $ loan taken";
      number = 28000;
    }
    if (name === "CELPAY" && button === "Sent") {
      explanationText = "Highest CelPay sent";
      number = formatter.usd(communityStats.highest_celpay_transaction_usd);
    }
    if (name === "CELPAY" && button === " Number of Transactions") {
      explanationText = "Number of CelPay transactions";
      number = formatter.round(communityStats.celpay_transactions_num, {
        noPrecision: true,
      });
    }
    if (name === "CELPAY" && button === "Amount Sent") {
      explanationText = "Sent via CelPay in total";
      number = formatter.usd(communityStats.total_celpay_sent_usd);
    }
    if (name === "REWARDS" && button === "Total Earned") {
      explanationText = "Total community earn in the last 12 months";
      number = formatter.usd(communityStats.total_interests_usd);
    }
    if (name === "REWARDS" && button === "Average Rewards") {
      explanationText = "Average user earnings in the last 12 months";
      number = formatter.usd(communityStats.average_interest_earned_usd);
    }
    if (name === "REWARDS" && button === "Rates") {
      explanationText = "Reward rates";
      number = 31000;
    }
    if (
      name === `ASSETS AS OF ${communityStats.community_settings.date}` &&
      button === "Total AUM"
    ) {
      explanationText = "Total Community Assets";
      number = formatter.usd(communityStats.community_settings.total_aum, {
        precision: 0,
      });
    }

    this.setState({
      activeButton: button,
      primaryNumber: number,
      explanation: explanationText,
    });
  };

  render() {
    const { name, buttonTypes, info, children } = this.props;
    const { activeButton, primaryNumber, explanation } = this.state;
    const style = CommunityDashboardStyle();

    return (
      <View style={style.container}>
        <Separator margin={"30 0 20 0"} text={name} />
        {buttonTypes && buttonTypes.length > 0 && (
          <View style={style.buttonWrapper}>
            {buttonTypes.map(button => (
              <TouchableOpacity
                key={button.buttonType}
                style={style.button}
                onPress={() => this.handlePress(button.buttonType)}
              >
                <View style={style.innerStyle}>
                  <Icon
                    name={button.icon}
                    height={18}
                    width={18}
                    fill={
                      activeButton === button.buttonType ? "active" : "inactive"
                    }
                    strokeWidth={0.5}
                  />
                  <CelText
                    type={"H7"}
                    weight={"500"}
                    align={"center"}
                    color={
                      activeButton === button.buttonType
                        ? getColor(COLOR_KEYS.TAB_SELECTED)
                        : getColor(COLOR_KEYS.TAB_UNSELECTED)
                    }
                  >
                    {button.buttonType.toUpperCase()}
                  </CelText>
                  {activeButton === button.buttonType && (
                    <View style={style.active} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {info && (
          <View>
            <CelText
              weight={"600"}
              align={"center"}
              type={"H2"}
              style={style.primary}
            >
              {primaryNumber}
            </CelText>
            <CelText
              weight={"300"}
              align={"center"}
              type={"H6"}
              style={style.explanation}
            >
              {explanation}
            </CelText>
          </View>
        )}
        {children}
      </View>
    );
  }
}

export default CommunityDashboard;
