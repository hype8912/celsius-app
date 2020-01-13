import React, { Component } from "react";
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import InterestRatesStyle from "./InterestRates.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import InterestRateInfoTable from "../../molecules/InterestRateInfoTable/InterestRateInfoTable";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";

@connect(
  () => ({}),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class InterestRates extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Interest rates",
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
          Bonus rates are provided if you choose to earn interest in CEL tokens.{" "}
          <CelText
            onPress={() => actions.navigateTo("LoyaltyProgram")}
            style={{ color: STYLES.COLORS.CELSIUS_BLUE }}
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
