import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import TierCardStyle from "./TierCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";
import PieProgressBar from "../../graphs/PieProgressBar/PieProgressBar";

@connect(
  state => ({
    loyaltyInfo: state.loyalty.loyaltyInfo,
    loanSettings: state.loans.loanSettings,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TierCard extends Component {
  static propTypes = {
    LoanId: PropTypes.string,
    transaction: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const style = TierCardStyle();
    const { loyaltyInfo, loanId, allLoans, transaction } = this.props;
    const loan = allLoans.find(l => l.id === loanId);
    const celDiscount = formatter.percentageDisplay(
      loyaltyInfo.tier.loanInterestBonus
    );

    const isTransaction = !_.isEmpty(transaction);
    const monthly = isTransaction
      ? Number(transaction.amount_usd)
      : Number(loan.installments_to_be_paid.total);
    const discountedInterest =
      (1 - loyaltyInfo.tier.loanInterestBonus) * monthly;
    const savedAmount = monthly - discountedInterest;

    let title;
    let color;
    if (loyaltyInfo.tier_level === 1) {
      color = STYLES.COLORS.GRAY;
      title = "Silver";
    }
    if (loyaltyInfo.tier_level === 2) {
      color = STYLES.COLORS.ORANGE;
      title = "Gold";
    }
    if (loyaltyInfo.tier_level === 3) {
      color = STYLES.COLORS.CELSIUS_BLUE;
      title = "Platinum";
    }

    return (
      <Card padding={"0 0 0 0"}>
        <View
          style={[{ borderRadius: isTransaction ? 8 : null }, style.wrapper]}
        >
          <PieProgressBar
            size={"card"}
            color={color}
            level={loyaltyInfo.tier_level}
            tier={loyaltyInfo.tier.title}
          />
          <View style={style.tierText}>
            <CelText weight={"300"} color={"white"} type={"H5"} align={"left"}>
              Based on your{" "}
              <CelText color={"white"} weight={"500"}>
                {title} Loyalty Level
              </CelText>{" "}
              you have saved
            </CelText>
            {!isTransaction && (
              <CelText
                color={"white"}
                type={"H2"}
                weight={"700"}
                align={"left"}
              >
                {celDiscount}
              </CelText>
            )}
            {isTransaction && (
              <CelText
                color={"white"}
                type={"H2"}
                weight={"700"}
                align={"left"}
              >
                {formatter.fiat(savedAmount, "USD")}
              </CelText>
            )}
          </View>
        </View>

        {!isTransaction && (
          <View style={style.discount}>
            <CelText weight={"300"}>
              Your monthly interest payment will decrease from{" "}
              <CelText style={{ textDecorationLine: "line-through" }}>
                {formatter.usd(loan.installments_to_be_paid.total)}
              </CelText>{" "}
              to <CelText>{formatter.usd(discountedInterest)}</CelText> when
              paying with CEL.
            </CelText>
          </View>
        )}
      </Card>
    );
  }
}

export default TierCard;
