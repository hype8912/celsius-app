import React, { Component } from 'react';
import { Image, View } from "react-native";
import { countries } from "country-data";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import ConfirmExtendLoanStyle from "./ConfirmExtendLoan.styles";
import CelText from '../../atoms/CelText/CelText';
import RegularLayout from '../../layouts/RegularLayout/RegularLayout';
import Card from "../../atoms/Card/Card";
import formatter from "../../../utils/formatter";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import Separator from "../../atoms/Separator/Separator";
import CelButton from "../../atoms/CelButton/CelButton";
import { SCREENS } from "../../../constants/SCREENS";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ConfirmYourLoanStyle from "../ConfirmYourLoan/ConfirmYourLoan.styles";
import { LOAN_TYPES } from "../../../constants/DATA";

@connect(
  state => ({
    loan: state.loans.loan,
    callsInProgress: state.api.callsInProgress,
    bankAccountInfo: state.user.bankAccountInfo,
    formData: state.forms.formData,
    activeLoan: state.loans.activeLoan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class ConfirmExtendLoan extends Component {
  static propTypes = {};
  static defaultProps = {}

  static navigationOptions = () => ({
    title: "Confirm Extend Loan",
    right: "profile",
    customCenterComponent: {steps: 3, currentStep: 2, flowProgress: true}
  });

  componentDidMount = async () => {
    const { actions } = this.props;
    await actions.loanApplyPreviewData();
  }

  showCountry(countryName) {
    const style = ConfirmYourLoanStyle();
    let iso;
    let country;
    Object.keys(countries).forEach(key => {
      if (countries[key].name === countryName) {
        country = countries[key];
        iso = country.alpha2;
      }
    });
    if (iso)
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/hjnilsson/country-flags/master/png250px/${iso.toLowerCase()}.png`,
            }}
            resizeMode="cover"
            style={style.flagImage}
          />
          <CelText type="H3" weight="600" margin={"0 0 15 5"}>
            {country.name}
          </CelText>
        </View>
      );
  }

  renderBankInfo = () => {
    const { formData } = this.props;
    if (formData.loanType === LOAN_TYPES.USD_LOAN) {
      const { bankAccountInfo } = this.props;
      return (
        <Card>
          <CelText type="H6" weight="300">
            Bank Name
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_name}
          </CelText>

          <CelText type="H6" weight="300">
            Bank Address
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_street_and_number}
          </CelText>

          <CelText type="H6" weight="300">
            Account Holder Name
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_account_holder_name}
          </CelText>

          <CelText type="H6" weight="300">
            Bank ZIP / Postal Code
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_zip}
          </CelText>

          <CelText type="H6" weight="300">
            Bank City
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_city}
          </CelText>

          <CelText type="H6" weight="300" margin={"0 0 3 0"}>
            Bank Country
          </CelText>
          {this.showCountry(bankAccountInfo.bank_location)}
          {this.renderBankAccountInfo()}
        </Card>
      );
    }
  };

  renderBankAccountInfo = () => {
    const { bankAccountInfo } = this.props;

    if (bankAccountInfo && bankAccountInfo.location === "United States") {
      return (
        <View>
          <CelText type="H6" weight="300">
            ABA (routing number)
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_routing_number}
          </CelText>

          <CelText type="H6" weight="300">
            Your Account Number
          </CelText>
          <CelText type="H3" weight="600" margin={"0 0 15 0"}>
            {bankAccountInfo.bank_account_number}
          </CelText>
        </View>
      );
    }
    return (
      <View>
        <CelText type="H6" weight="300">
          SWIFT (Bank Identifier Code)
        </CelText>
        <CelText type="H3" weight="600" margin={"0 0 15 0"}>
          {bankAccountInfo.bank_account_swift}
        </CelText>

        <CelText type="H6" weight="300">
          Your Account Number
        </CelText>
        <CelText type="H3" weight="600" margin={"0 0 15 0"}>
          {bankAccountInfo.bank_account_iban}
        </CelText>
      </View>
    );
  };

  renderAmount = () => {
    const { loan } = this.props;

    if (loan.coin_loan_asset !== "USD") {
      return (
        <CelText align="center" type="H1" weight="bold">
          {formatter.crypto(loan.loan_amount, loan.coin_loan_asset, {
            precision: 2,
          })}
        </CelText>
      );
    }
    return (
      <CelText align="center" type="H1" weight="bold">
        {formatter.usd(loan.loan_amount, { precision: 0 })}
      </CelText>
    );
  };

  render() {
    const { loan, actions, callsInProgress, navigation, activeLoan } = this.props;
    const newTotal = navigation.getParam("newTotal");
    const style = ConfirmExtendLoanStyle();

    const isLoading =
      !loan ||
      apiUtil.areCallsInProgress(
        [API.APPLY_FOR_LOAN_PREVIEW_DATA],
        callsInProgress
      );

    if (isLoading) {
      return <LoadingScreen />;
    }

    const currentLoanTerm = activeLoan.amortization_table.length - 1
    const totalRemainingMonths = currentLoanTerm + Number(loan.term_of_loan)

    return (
      <RegularLayout fabType={"hide"}>
        <View>
          <CelText align="center">{`You are about to extend loan`}</CelText>

          <Card>
            <View style={style.horizontalCardContainer}>
              <View style={style.horizontalCardItem}>
                <CelText type="H6" weight="300" align="center">
                  Term Length
                </CelText>
                <CelText type="H3" weight="600" align="center">
                  {totalRemainingMonths} months
                </CelText>
              </View>

              <View style={style.separatorContainer}>
                <Separator vertical height={"60%"} />
              </View>

              <View style={style.horizontalCardItem}>
                <CelText type="H6" weight="300" align="center">
                  Annual Interest Rate
                </CelText>
                <CelText type="H3" weight="600" align="center">
                  {formatter.percentage(loan.interest)}%
                </CelText>
              </View>
            </View>
          </Card>

          <Card>
            <View style={style.horizontalCardContainer}>
              <View style={style.horizontalCardItem}>
                <CelText type="H6" weight="300" align="center">
                  Monthly Interest
                </CelText>
                <CelText type="H3" weight="600" align="center">
                  {formatter.usd(loan.monthly_payment)}
                </CelText>
              </View>

              <View style={style.separatorContainer}>
                <Separator vertical height={"60%"} />
              </View>

              <View style={style.horizontalCardItem}>
                <CelText type="H6" weight="300" align="center">
                  Total Interest
                </CelText>
                <CelText type="H3" weight="600" align="center">
                  {formatter.usd(loan.total_interest)}
                </CelText>
              </View>
            </View>
          </Card>

          <Card>
            <CelText type="H6" weight="300" align="center">
              Total of Payments
            </CelText>
            <CelText type="H3" weight="600" align="center">
              {formatter.usd(Number(loan.loan_amount) + newTotal)}
            </CelText>
            <CelText type="H6" weight="300" align="center">
              (Amount Borrowed + Total Interest)
            </CelText>

            <Separator margin={"10 0 10 0"} />

            <CelText type="H6" weight="300" align="center">
              Number of Additional Payments
            </CelText>
            <CelText type="H3" weight="600" align="center">
              {loan.term_of_loan}
            </CelText>
          </Card>

          <Card color={getColor(COLOR_KEYS.LINK)}>
            <CelText
              type="H6"
              weight="300"
              align="center"
              style={style.textOpacity}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            >
              Reduce your interest rate by
            </CelText>
            <CelText
              type="H3"
              weight="600"
              align="center"
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            >
              {formatter.percentage(loan.loan_interest_bonus)} %
            </CelText>
            <CelText
              type="H6"
              weight="300"
              align="center"
              style={style.textOpacity}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            >
              By paying out in
              <CelText
                type="H5"
                weight="300"
                align="center"
                color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              >
                {" "}
                CEL
              </CelText>
            </CelText>

            <Separator
              margin={"10 0 10 0"}
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              opacity={0.6}
            />

            <View style={style.horizontalCardContainer}>
              <View style={style.horizontalCardItem}>
                <CelText
                  type="H6"
                  weight="300"
                  align="center"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                  style={style.textOpacity}
                >
                  {" "}
                  Monthly Interest
                </CelText>
                <CelText
                  type="H3"
                  weight="600"
                  align="center"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  {formatter.crypto(loan.monthly_payment_in_cel, "CEL", {
                    precision: 2,
                  })}
                </CelText>
              </View>

              <View style={style.separatorContainer}>
                <Separator
                  vertical
                  height={"60%"}
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                />
              </View>

              <View style={style.horizontalCardItem}>
                <CelText
                  type="H6"
                  weight="300"
                  align="center"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                  style={style.textOpacity}
                >
                  Total Interest
                </CelText>
                <CelText
                  type="H3"
                  weight="600"
                  align="center"
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                >
                  {formatter.crypto(loan.total_interest_in_cel, "CEL", {
                    precision: 2,
                  })}
                </CelText>
              </View>
            </View>
            {/* // TODO: missing COLOR_KEY */}
            <Card noBorder color={getColor(COLOR_KEYS.CEL_REWARD_BOX)}>
              <View style={style.horizontalCardContainer}>
                <View style={style.horizontalCardItem}>
                  <CelText
                    type="H6"
                    weight="300"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    style={style.textOpacity}
                  >
                    {" "}
                    Original Monthly Interest
                  </CelText>
                  <CelText
                    type="H3"
                    weight="600"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    strikethrough
                  >
                    {formatter.usd(
                      loan.original_monthly_interest_payment_in_usd
                    )}
                  </CelText>
                </View>

                <View style={style.separatorContainer}>
                  <Separator
                    vertical
                    height={"60%"}
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    style={style.textOpacity}
                  />
                </View>

                <View style={style.horizontalCardItem}>
                  <CelText
                    type="H6"
                    weight="300"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    style={style.textOpacity}
                  >
                    Discounted Monthly Interest
                  </CelText>
                  <CelText
                    type="H3"
                    weight="600"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                  >
                    {formatter.usd(
                      loan.discounted_monthly_interest_payment_in_usd
                    )}
                  </CelText>
                </View>
              </View>
            </Card>
            {/* // TODO: missing COLOR_KEY */}
            <Card noBorder color={getColor(COLOR_KEYS.CEL_REWARD_BOX)}>
              <View style={style.horizontalCardContainer}>
                <View style={style.horizontalCardItem}>
                  <CelText
                    type="H6"
                    weight="300"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    style={style.textOpacity}
                  >
                    {" "}
                    Original Total Interest
                  </CelText>
                  <CelText
                    type="H3"
                    weight="600"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    strikethrough
                  >
                    {formatter.usd(loan.original_total_interest_in_usd)}
                  </CelText>
                </View>

                <View style={style.separatorContainer}>
                  <Separator
                    vertical
                    height={"60%"}
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    style={style.textOpacity}
                  />
                </View>

                <View style={style.horizontalCardItem}>
                  <CelText
                    type="H6"
                    weight="300"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                    style={style.textOpacity}
                  >
                    Discounted Total Interest
                  </CelText>
                  <CelText
                    type="H3"
                    weight="600"
                    align="center"
                    color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
                  >
                    {formatter.usd(loan.discounted_total_interest_in_usd)}
                  </CelText>
                </View>
              </View>
            </Card>

            <CelText
              type="H6"
              weight="300"
              italic
              align="center"
              margin=" 0 0 5 0"
              color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
              style={style.textOpacity}
            >
              {" "}
              This rate is subject to change based on your loyalty level and
              CEL price at the time of payment.
            </CelText>
          </Card>

          {this.renderBankInfo()}

          <Card>
            <CelText type="H6" weight="300" align="center">
              {loan.coin}
              <CelText type="H6" weight="300" align="center">
                {" "}
                Margin Call at
              </CelText>
            </CelText>
            <CelText type="H3" weight="700" align="center" margin="5 0 10 0">
              {formatter.usd(loan.margin_call_price)}
            </CelText>
            <Card color={getColor(COLOR_KEYS.BACKGROUND)} noBorder>
              <CelText type="H6" weight="300">{`If ${
                loan.coin
              } drops below ${formatter.usd(
                loan.margin_call_price
              )}, you will be required to add collateral to meet the minimum LTV.`}</CelText>
            </Card>
          </Card>

          <Card>
            <CelText type="H6" weight="300" align="center">
              Liquidation at
            </CelText>
            <CelText type="H3" weight="700" align="center" margin="5 0 10 0">
              {formatter.usd(loan.liquidation_call_price)}
            </CelText>
            <Card color={getColor(COLOR_KEYS.BACKGROUND)} noBorder>
              <CelText type="H6" weight="300">{`If ${
                loan.coin
              } drops below ${formatter.usd(
                loan.liquidation_call_price
              )} and margin call has not been met we will liquidate a portion of your collateral to cover the Margin Call.`}</CelText>
            </Card>
          </Card>

          <CelButton
            onPress={() => actions.navigateTo(SCREENS.LOAN_TERMS_OF_USE, {extend: true})}
            margin="22 0 0 0"
          >
            Continue
          </CelButton>
        </View>
      </RegularLayout>
    );
  }
}

export default ConfirmExtendLoan
