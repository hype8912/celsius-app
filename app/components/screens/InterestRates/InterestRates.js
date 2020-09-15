import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import InterestRatesStyle from "./InterestRates.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import InterestRateInfoTable from "../../molecules/InterestRateInfoTable/InterestRateInfoTable";
import CelText from "../../atoms/CelText/CelText";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestRates extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Reward rates",
    right: "profile",
  });

  render() {
    const { actions } = this.props;
    const style = InterestRatesStyle();

    return (
      <RegularLayout>
        <CelText
          weight="300"
          fontSize="H1"
          align={"center"}
          style={style.explanation}
        >
          Rates in green are available to users who choose to earn in CEL.{" "}
          <CelText
            onPress={() => actions.navigateTo(SCREENS.LOYALTY_PROGRAM)}
            link
          >
            Learn more
          </CelText>
        </CelText>

        <InterestRateInfoTable />
      </RegularLayout>
    );
  }
}

export default InterestRates;
