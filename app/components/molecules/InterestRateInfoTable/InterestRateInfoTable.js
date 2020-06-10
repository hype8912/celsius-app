import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import InterestRateInfoTableStyle from "./InterestRateInfoTable.styles";
import InterestRateInfo from "../../atoms/InterestRateInfo/InterestRateInfo";
import interestUtil from "../../../utils/interest-util";

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
    loyaltyInfo: state.loyalty.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestRateInfoTable extends Component {
  async componentDidMount() {
    const { actions } = this.props;
    await actions.getLoyaltyInfo();
  }

  renderInterestTable() {
    const { interestRates, loyaltyInfo, actions } = this.props;
    const interestArray = [];
    const ratesPriority = ["CEL", "ETH", "BTC", "USD"];

    Object.keys(interestRates).forEach(currency => {
      const interestRate = interestUtil.getUserInterestForCoin(
        !currency ? "BTC" : currency
      );
      interestArray.push(interestRate);
    });

    const sortedRates = interestArray.sort((a, b) => {
      if (ratesPriority.indexOf(a.coin) > ratesPriority.indexOf(b.coin)) {
        return -1;
      }

      if (a.coin === "CEL") return -1;

      if (ratesPriority.indexOf(a.coin) < ratesPriority.indexOf(b.coin)) {
        return 1;
      }

      return 0;
    });

    return sortedRates.map(interest => (
      <View key={interest.coin}>
        <InterestRateInfo
          actions={actions}
          compact
          currency={interest.coin}
          interestRate={interest}
          loyaltyInfo={loyaltyInfo}
        />
      </View>
    ));
  }

  render() {
    const { style, interestRates } = this.props;
    const additionalStyle = style || {};

    return (
      <View style={[[additionalStyle]]}>
        {interestRates ? this.renderInterestTable() : null}
      </View>
    );
  }
}

export default InterestRateInfoTable;
