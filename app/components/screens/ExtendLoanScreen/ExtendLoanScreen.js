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
    props.actions.updateFormField("extendPeriod", 6);
  }

  calculateAdditionalInterest = (usdValue, coinRate, coin) => {
    const rate = coin === "USD" ? 1 : coinRate;
    return formatter.crypto(usdValue / rate, coin);
  };

  renderSlider = () => {
    const {
      actions,
      formData,
      allLoans,
      currencyRates,
      navigation,
    } = this.props;
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    const coinRate = currencyRates[loan.coin.toLowerCase()];

    const monthValues = [6, 12];

    const sliderItems = monthValues.map(m => ({
      value: m,
      label: (
        <>
          <CelText
            type="H6"
            weight="bold"
            color={formData.extendPeriod === m ? COLOR_KEYS.BANNER_INFO : null}
          >
            {m} MONTHS
          </CelText>
          <CelText type="H6">
            Additional Interest:{" "}
            {this.calculateAdditionalInterest(
              Number(loan.monthly_payment * m),
              coinRate,
              loan.coin
            )}
          </CelText>
        </>
      ),
    }));

    return (
      <VerticalSlider
        items={sliderItems}
        field="extendPeriod"
        value={formData.extendPeriod}
        updateFormField={actions.updateFormField}
        marginTop={heightPercentageToDP("2%")}
      />
    );
  };

  render() {
    const { actions, navigation, formData } = this.props;
    // const style = ExtendLoanScreenStyle();
    const loanId = navigation.getParam("id");

    return (
      <RegularLayout>
        <View style={{ justifyContent: "space-around" }}>
          <View>
            <CelText align={"center"} weight={"300"}>
              How long would you like to extend loan
            </CelText>
            {this.renderSlider()}
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
