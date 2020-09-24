import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";
import BigNumber from "bignumber.js";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import VerticalSlider from "../../atoms/VerticalSlider/VerticalSlider";
import { LOAN_TYPES } from "../../../constants/DATA";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLoanTerm extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Term of loan",
    right: "profile",
    customCenterComponent: { steps: 8, currentStep: 5, flowProgress: true },
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField("termOfLoan", 6);
  }

  calculateSliderItems = m => {
    const { formData } = this.props;

    const originatingDate = moment();
    const maturityDate = originatingDate.clone().add(m, "month");
    const loanTermInDays = maturityDate.diff(originatingDate, "days");
    const monthlyInterest = new BigNumber(formData.interest)
      .dividedBy(365)
      .multipliedBy(loanTermInDays)
      .multipliedBy(formData.loanAmount)
      .toNumber();
    return monthlyInterest;
  };

  handleSliderItems = () => {
    const { formData } = this.props;
    const months = [6, 12, 18, 24, 30, 36];

    const sliderItems = months.map(m => ({
      value: m,
      label: (
        <>
          <CelText
            type="H6"
            weight="semi-bold"
            color={formData.termOfLoan === m ? getColor(COLOR_KEYS.LINK) : null}
          >
            {m} MONTHS
          </CelText>
          <CelText style={{ marginBottom: 10 }} type="H6">
            Total interest: {formatter.usd(this.calculateSliderItems(m))} USD
          </CelText>
        </>
      ),
    }));

    return sliderItems;
  };

  renderButton() {
    const { actions, formData } = this.props;
    if (formData.loanType === LOAN_TYPES.STABLE_COIN_LOAN) {
      return (
        <CelButton
          margin="50 0 30 0"
          onPress={() => {
            actions.navigateTo(SCREENS.CONFIRM_YOUR_LOAN);
            mixpanelAnalytics.loanTerms(formData.termOfLoan);
          }}
          iconRight="IconArrowRight"
        >
          Continue
        </CelButton>
      );
    }
    return (
      <CelButton
        margin="50 0 30 0"
        onPress={() => {
          actions.navigateTo(SCREENS.BORROW_BANK_ACCOUNT);
          mixpanelAnalytics.loanTerms(formData.termOfLoan);
        }}
        iconRight="IconArrowRight"
      >
        Bank account
      </CelButton>
    );
  }

  render() {
    const { actions, formData } = this.props;
    const sliderItems = this.handleSliderItems();

    return (
      <View style={{ flex: 1 }}>
        <RegularLayout fabType={"hide"}>
          <View style={{ paddingTop: 10, alignItems: "center" }}>
            <CelText margin={"0 0 30 0"} align={"center"} weight={"300"}>
              How long would you like to borrow{" "}
              {formatter.usd(formData.loanAmount)}?
            </CelText>
          </View>
          <View>
            <VerticalSlider
              items={sliderItems}
              field="termOfLoan"
              value={formData.termOfLoan}
              updateFormField={actions.updateFormField}
            />
          </View>

          {this.renderButton()}
        </RegularLayout>
      </View>
    );
  }
}

export default BorrowLoanTerm;
