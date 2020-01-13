import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import InterestRateInfoTableStyle from "./InterestRateInfoTable.styles";
import InterestRateInfo from "../../atoms/InterestRateInfo/InterestRateInfo";

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
    loyaltyInfo: state.user.loyaltyInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestRateInfoTable extends Component {
  async componentDidMount() {
    const { actions } = this.props;
    await actions.getLoyaltyInfo();
  }

  renderInterestTable() {
    const { interestRates, loyaltyInfo } = this.props;
    const interestArray = [];
    const ratesPriority = ["CEL", "ETH", "BTC", "USD"];

    Object.keys(interestRates).forEach(currency => {
      const obj = {};
      obj.currency = currency;
      obj.rate = interestRates[currency];

      interestArray.push(obj);
    });

    const sortedRates = interestArray.sort((a, b) => {
      if (
        ratesPriority.indexOf(a.currency) > ratesPriority.indexOf(b.currency)
      ) {
        return -1;
      }

      if (a.currency === "CEL") return -1;

      if (
        ratesPriority.indexOf(a.currency) < ratesPriority.indexOf(b.currency)
      ) {
        return 1;
      }

      return 0;
    });

    return sortedRates.map(interest => (
      <View key={interest.currency}>
        <InterestRateInfo
          compact
          currency={interest.currency}
          rate={interest.rate}
          loyaltyInfo={loyaltyInfo}
        />
      </View>
    ));
  }

  render() {
    const { style, interestRates } = this.props;
    const additionalStyle = style || {};

    // const styles = InterestRateInfoTableStyle();

    return (
      <View style={[[additionalStyle]]}>
        {interestRates ? this.renderInterestTable() : null}
      </View>
    );
  }
}

export default InterestRateInfoTable;
