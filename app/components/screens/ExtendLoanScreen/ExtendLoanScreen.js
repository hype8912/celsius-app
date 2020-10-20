import React, { Component } from "react";
import { View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import ExtendLoanScreenStyle from "./ExtendLoanScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import VerticalSlider from "../../atoms/VerticalSlider/VerticalSlider";
import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter";
import { heightPercentageToDP } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";

@connect(
  state => ({
    formData: state.forms.formData,
    currencyRates: state.currencies.currencyRatesShort,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ExtendLoanScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Extend Loan",
    right: "profile",
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField("extendPeriod", "1");

    this.setState({
      activePeriod: {
        label: `1 month`, value: "1"
      }
    })
  }

  calculateAdditionalInterest = (usdValue, coinRate, coin) => {
    const rate = coin === "USD" ? 1 : coinRate;
    return formatter.crypto(usdValue / rate, coin);
  };

  // formdata.extendPEriod

  render() {
    const { actions, navigation, formData } = this.props;
    const { activePeriod } = this.state;
    // const style = ExtendLoanScreenStyle();
    const loanId = navigation.getParam("id");

    const predefinedAmount = [
      { label: `1 month`, value: "1" },
      {
        label: `36 months`,
        value: "36",
      },
    ];

    return (
      <RegularLayout>
        <View style={{ justifyContent: "space-around" }}>
          <View>
            <CelText align={"center"} weight={"300"}>
              How long would you like to extend loan
            </CelText>
            <PredefinedAmounts
              data={predefinedAmount}
              onSelect={() => console.log("trt")}
              activePeriod={activePeriod}
            />
          </View>

          <View>
            <CelButton
              color={"green"}
              onPress={() => {
                actions.extendLoan(loanId, formData.extendPeriod);
              }}
            >
              Confirm
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default ExtendLoanScreen;
