import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";

import * as appActions from "../../../redux/actions";
import formatter from "../../../utils/formatter";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import VerticalSlider from "../../atoms/VerticalSlider/VerticalSlider";
import STYLES from "../../../constants/STYLES";
import HeadingProgressBar from "../../atoms/HeadingProgressBar/HeadingProgressBar";
import { LOAN_TYPES } from "../../../constants/DATA";
import userBehaviorUtil from "../../../utils/user-behavior-util";

@connect(
  state => ({
    formData: state.forms.formData,
    loanCompliance: state.compliance.loan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLoanTerm extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Term of loan",
    right: "profile",
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField("termOfLoan", 6);
  }

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
            color={
              formData.termOfLoan === m ? STYLES.COLORS.CELSIUS_BLUE : null
            }
          >
            {m} MONTHS
          </CelText>
          <CelText style={{ marginBottom: 10 }} type="H6">
            Total interest: {formatter.usd(Number(formData.monthlyPayment * m))}{" "}
            USD
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
            actions.navigateTo("ConfirmYourLoan");
            userBehaviorUtil.loanTerms(formData.termOfLoan);
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
          actions.navigateTo("BorrowBankAccount");
          userBehaviorUtil.loanTerms(formData.termOfLoan);
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
        <HeadingProgressBar steps={6} currentStep={4} />
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
