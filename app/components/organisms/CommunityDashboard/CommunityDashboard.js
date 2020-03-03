import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";


import CommunityDashboardStyle from "./CommunityDashboard.styles";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";


@connect(
  state => ({
    communityStats: state.community.stats
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
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
      // initial state
      activeButton: buttonTypes ? buttonTypes[0] : "",
      primaryNumber: "",
      explanation: ""
    };
    // binders
  }

  // lifecycle methods
  componentDidMount() {
    const {name, communityStats} = this.props;
    if (name === "CELPAY") {
      this.setState({
        primaryNumber: formatter.usd(communityStats.highest_celpay_transaction_usd),
        explanation: "Highest CelPay sent"
      })
    }
    if (name === "INTEREST") {
      this.setState({
        primaryNumber: formatter.usd(communityStats.total_interests_usd),
        explanation: "Total interest earn"
      })
    }
  }

  getSeparatorColor = style => StyleSheet.flatten(style.separatorColor).color // get color from raw json depending on style theme

  // event hanlders
  // rendering methods
  handlePress = (button) => {
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
    if (name === "CELPAY" && button === "Transactions") {
      explanationText = "Number of CelPay transactions";
      number = formatter.round(communityStats.celpay_transactions_num, {noPrecision: true});
    }
    if (name === "CELPAY" && button === "Total") {
      explanationText = "Sent via CelPay in total";
      number = formatter.usd(communityStats.total_celpay_sent_usd);
    }
    if (name === "INTEREST" && button === "Earned") {
      explanationText = "Total community earn";
      number = formatter.usd(communityStats.total_interests_usd);
    }
    if (name === "INTEREST" && button === "Average") {
      explanationText = "Average community earn";
      number = formatter.usd(communityStats.average_interest_earned_usd);
    }
    if (name === "INTEREST" && button === "Rates") {
      explanationText = "Interest rates";
      number = 31000;
    }

    this.setState({
      activeButton: button,
      primaryNumber: number,
      explanation: explanationText
    });
  };

  render() {
    const { name, buttonTypes, info, children } = this.props;
    const { activeButton, primaryNumber, explanation } = this.state;
    const style = CommunityDashboardStyle();
    return (
      <View style={style.container}>
        <Separator margin={"30 0 20 0"} text={name}/>
        {(buttonTypes && buttonTypes.length > 0) &&
        <View style={style.buttonWrapper}>
          {buttonTypes.map((button) => (
            <TouchableOpacity key={button} style={style.button} onPress={() => this.handlePress(button)}>
              <View style={style.innerStyle}>
                <Icon
                  name={button}
                  height={18}
                  width={18}
                  stroke={activeButton === button ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.MEDIUM_GRAY}
                  fill={"white"}
                  strokeWidth={0.5}
                />
                <CelText type={"H7"} weight={"500"} align={"center"}
                         color={activeButton === button ? STYLES.COLORS.CELSIUS_BLUE : STYLES.COLORS.MEDIUM_GRAY}>
                  {button.toUpperCase()}
                </CelText>
                {activeButton === button &&
                <View style={style.active}/>
                }
              </View>
            </TouchableOpacity>
          ))}
        </View>
        }
        {info &&
        <View>
          <CelText weight={"600"} align={"center"} type={"H1"}
                   style={style.primary}>{primaryNumber}</CelText>
          <CelText weight={"300"} align={"center"} type={"H6"} style={style.explanation}>{explanation}</CelText>
        </View>
        }
        {children}
      </View>
    );
  }
}

export default CommunityDashboard
