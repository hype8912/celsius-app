import React, { Component } from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import ConfirmYourLoanStyle from "./ConfirmYourLoan.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import formatter from "../../../utils/formatter";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";


// TODO rename to BorrowLoanConfirm
@connect(
  state => ({
    formData: state.forms.formData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ConfirmYourLoan extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Confirm Your Loan",
    right: "profile"
  });

  render() {
    const {formData, actions} = this.props;
    const style = ConfirmYourLoanStyle();
    
    return (
      <RegularLayout>
        <View>
          <CelText type="H4" weight="300" align="center">By initiating loan you will lock your collateral and initiate a wire transfer of { formatter.usd(formData.loanAmount, { precision: 0 }) } to your bank account.</CelText>

          <Separator margin="22 0 22 0"/>
          <CelText align="center">You are about to borrow</CelText>
          <CelText align="center" type="H2" weight="bold">{ formatter.usd(formData.loanAmount, { precission: 0 }) }</CelText>

          <Separator margin="30 0 16 0"/>
          <CelText type="H6" weight="300">Estimated collateral</CelText>
          <CelText type="H6" weight="500">{ formatter.crypto(formData.amountCollateralCrypto, formData.coin) }</CelText>
          <CelText type="H6" weight="300">{ formatter.usd(formData.amountCollateralUsd) }</CelText>

          <Card>
            <CelText type="H6" weight="300">Exact collateral amount would be determined upon approval</CelText>
          </Card>

          <Separator margin="16 0 16 0"/>
          <CelText type="H6" weight="300">Term of loan</CelText>
          <CelText type="H6" weight="500">{ formData.termOfLoan } months</CelText>

          <Separator margin="16 0 16 0"/>
          <View style={style.interestContainer}>
            <View style={style.interest}>
              <CelText type="H3" weight="600" align="center">{ formatter.percentage(formData.interest) }%</CelText>
              <CelText type="H6" weight="300" align="center">Annual interest rate</CelText>
            </View>

            <Separator vertical/>

            <View style={style.monthly}>
              <CelText type="H3" weight="600" align="center">{ formatter.usd(formData.monthlyPayment) }</CelText>
              <CelText type="H6" weight="300" align="center">Monthly interest payment</CelText>
            </View>
          </View>

          <Separator margin="16 0 22 0"/>
          <CelText type="H5" weight={"300"} align="center">By applying for a loan you agree to our</CelText>
          <CelText onPress={() => actions.navigateTo("TermsOfUse")} color={STYLES.COLORS.CELSIUS_BLUE} type="H5" weight={"300"} align="center">Terms of Use</CelText>

          <CelButton onPress={() => actions.applyForALoan(formData)} margin="22 0 0 0">Initiate loan</CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default ConfirmYourLoan
