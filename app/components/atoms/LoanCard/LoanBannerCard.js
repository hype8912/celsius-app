import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import LoanCardStyle from "./LoanBannerCard.styles";
import STYLES from "../../../constants/STYLES";
import CelText from "../CelText/CelText";
import userBehaviorUtil from "../../../utils/user-behavior-util";
import Icon from "../Icon/Icon";
import CelButton from "../CelButton/CelButton";
import { LOAN_BANNER_MESSAGES } from "../../../constants/UI";
import formatter from "../../../utils/formatter";

class LoanBannerCard extends Component {
  static propTypes = {
    actions: PropTypes.func,
    type: PropTypes.oneOf(["full", "half"]),
    lowestInterest: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      randomMsg:
        LOAN_BANNER_MESSAGES[
          Math.floor(Math.random() * LOAN_BANNER_MESSAGES.length)
        ],
    };
  }

  render() {
    const { actions, type, lowestInterest } = this.props;
    const { randomMsg } = this.state;
    const style = LoanCardStyle();

    const halfStyle = type === "full" ? {} : { borderRadius: 8 };

    const text =
      type === "full"
        ? {
            title: "Need cash?",
            content: `Don’t sell your crypto - borrow against it! Get a USD or stablecoin loan starting at ${formatter.percentage(
              lowestInterest
            )}% APR and keep the upside potential of your coins!`,
          }
        : randomMsg;

    return (
      <View style={[style.container, halfStyle]}>
        <TouchableOpacity
          style={{ position: "absolute", right: 10, top: 0 }}
          onPress={() => actions.closeBanner()}
        >
          <Icon name="Close" fill={STYLES.COLORS.WHITE} width="25" />
        </TouchableOpacity>
        <CelText
          color={STYLES.COLORS.WHITE}
          type="H6"
          weight="bold"
          margin="0 10 3 0"
        >
          {text.title}
        </CelText>
        <CelText color={STYLES.COLORS.WHITE} type="H7">
          {text.content}
        </CelText>
        <View style={style.buttonWrapper}>
          {type === "full" ? (
            <CelText
              onPress={() => {
                actions.navigateTo("BorrowChooseLoan");
                userBehaviorUtil.userInitiatingLoanOnWithdraw();
              }}
              color={STYLES.COLORS.WHITE}
              type="H6"
              margin="3 0 0 0"
              weight={"500"}
            >
              {"Get a loan >"}
            </CelText>
          ) : (
            <CelButton
              onPress={() => {
                actions.navigateTo("BorrowChooseLoan");
                userBehaviorUtil.userInitiatingLoanOnWithdrawConfirm();
              }}
              color={"white"}
              size={"small"}
              textColor={STYLES.COLORS.CELSIUS_BLUE}
              margin={"10 0 0 0"}
            >
              Get a loan
            </CelButton>
          )}
        </View>
      </View>
    );
  }
}

export default LoanBannerCard;
