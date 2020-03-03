import React, { Component } from 'react';
// import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { View } from 'react-native'


import * as appActions from "../../../redux/actions";
// import BorrowLoanTermStyle from "./BorrowLoanTerm.styles";
import formatter from "../../../utils/formatter";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import CelButton from '../../atoms/CelButton/CelButton';
import VerticalSlider from '../../atoms/VerticalSlider/VerticalSlider';
import STYLES from '../../../constants/STYLES';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';

@connect(
  (state) => ({
    formData: state.forms.formData, 
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class BorrowLoanTerm extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Term of loan",
    right: "profile"
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField('termOfLoan', 6)
  }

  changeSelectedLoan = (selectedStep) => {
    const { actions } = this.props;
    actions.updateFormField('termOfLoan', selectedStep)
  }

  render() {
    const { actions, formData } = this.props;

    const sliderItems = [
      { value: 6, label: <CelText weight="bold" color={formData.termOfLoan === 6 ? STYLES.COLORS.CELSIUS_BLUE : null}>6 months</CelText> },
      { value: 12, label: <CelText weight="bold" color={formData.termOfLoan === 12 ? STYLES.COLORS.CELSIUS_BLUE : null}>12 months</CelText> },
      { value: 18, label: <CelText weight="bold" color={formData.termOfLoan === 18 ? STYLES.COLORS.CELSIUS_BLUE : null}>18 months</CelText> },
      { value: 24, label: <CelText weight="bold" color={formData.termOfLoan === 24 ? STYLES.COLORS.CELSIUS_BLUE : null}>24 months</CelText> },
      { value: 30, label: <CelText weight="bold" color={formData.termOfLoan === 30 ? STYLES.COLORS.CELSIUS_BLUE : null}>30 months</CelText> },
      { value: 36, label: <CelText weight="bold" color={formData.termOfLoan === 36 ? STYLES.COLORS.CELSIUS_BLUE : null}>36 months</CelText> },
    ]

    return (
      <RegularLayout>
        <View style={{ paddingTop: 10, alignItems: 'center'}}>
          <ProgressBar steps={6} currentStep={4} />
          <CelText margin={"30 0 30 0"} weight={"300"}>How long would you like to borrow {formatter.usd(formData.loanAmount)}?</CelText>
        </View>
        <VerticalSlider
          items={sliderItems}
          field="termOfLoan"
          value={formData.termOfLoan}
          updateFormField={actions.updateFormField}
        />

        <CelButton margin="50 0 30 0" onPress={() => actions.navigateTo('BorrowBankAccount')} iconRight="IconArrowRight">
          Bank account
        </CelButton>
      </RegularLayout>
    );
  }
}

export default BorrowLoanTerm
