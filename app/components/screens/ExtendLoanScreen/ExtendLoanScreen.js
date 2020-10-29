import React, { Component } from "react";
import { TextInput, View } from "react-native";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BigNumber from "bignumber.js";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import ExtendLoanScreenStyle from "./ExtendLoanScreen.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import CelButton from "../../atoms/CelButton/CelButton";
import formatter from "../../../utils/formatter";
import { COLOR_KEYS } from "../../../constants/COLORS";
import PredefinedAmounts from "../../organisms/PredefinedAmounts/PredefinedAmounts";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import Separator from "../../atoms/Separator/Separator";
import Card from "../../atoms/Card/Card";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import { SCREENS } from "../../../constants/SCREENS";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { EXTEND_LOAN } from "../../../constants/DATA";
import { getColor, getFontSize } from "../../../utils/styles-util";

let timeout;

@connect(
  state => ({
    currencyRates: state.currencies.currencyRatesShort,
    allLoans: state.loans.allLoans,
    bankAccountInfo: state.user.bankAccountInfo,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ExtendLoanScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  inputRef = React.createRef();

  static navigationOptions = () => ({
    title: "Extend Loan",
    right: "profile",
    customCenterComponent: {steps: 3, currentStep: 1, flowProgress: true}
  });

  constructor(props) {
    super(props);
    props.actions.updateFormField("term_of_loan", "1");

    this.state = {
      activePeriod: { label: `6 months`, value: 6 },
      months: 6
    }
  }

  componentDidMount = async () => {
    const { actions } = this.props;
    actions.updateFormField("term_of_loan", 6)
    await actions.getLinkedBankAccount()
  }

  inc = (input) => {

    return  input + 1
  }

  handleAmountChange = (newValue) => {
    const { actions } = this.props;
    if (timeout) clearTimeout(timeout);
    if (Number(newValue) < 6) {
      timeout = setTimeout(() => {
        actions.showMessage(
          "warning",
          `6 months is currently the minimum extendable period. Please adjust your extend period to proceed.`
        );
      }, 3000);
    }

    if (Number(newValue) > 36) {
      timeout = setTimeout(() => {
        actions.showMessage(
          "warning",
          `36 months is currently the maximum extendable period. Please adjust your extend period to proceed.`
        );
      }, 3000);
    }
    this.setState({ months: Number(newValue) });
  };

  calculateAdditionalInterest = (usdValue, coinRate, coin) => {
    const rate = coin === "USD" ? 1 : coinRate;
    return formatter.crypto(usdValue / rate, coin, {precision: 2});
  };

  extendLoanDecrement = () => {
    // add parameter
    const { months } = this.state;
    if (months === 6 ) return
    this.setState({
      months: months - 1
    })
  };

  extendLoanIncrement = () => {
    // parametar
    const { months } = this.state;
    if (months === 36 ) return
    this.setState({
      months: months + 1
    })
  };

  onPressPredefinedAmount = ({ value, label }) => {
     if (value === "6") {
      this.setState({
        months: EXTEND_LOAN.MIN_VALUE,
        activePeriod: {
          label
        }
      })
    }
    if (value === "36") {
      this.setState({
        months: EXTEND_LOAN.MAX_VALUE,
        activePeriod: {
          label
        },
      })
    }
  };

  handleConfirmation = (loan, bankAccountInfo, newTotal) => {
  const { actions } = this.props;
  const { months } = this.state;
    actions.updateFormFields({
      collateralCoin: loan.coin,
      ltv: loan.ltv,
      interest: loan.interest,
      loanAmount: loan.loan_amount,
      termOfLoan: `${months}`,
      bankInfo: bankAccountInfo.id ? bankAccountInfo.id : undefined,
      coin: loan.coin_loan_asset,
      loanType: loan.coin_loan_asset !== "USD" ? "STABLE_COIN_LOAN" : "USD_LOAN",
      loanId: loan.id
    });
    actions.navigateTo(SCREENS.CONFIRM_EXTEND_LOAN, { newTotal })
  }

  extendLoanCalculateInterest = (loan) => {
    const { months } = this.state;
    const originatingDate = moment();
    const maturityDate = originatingDate.clone().add(months, "month");
    const loanTermInDays = maturityDate.diff(originatingDate, "days");
    const additionalInterest = new BigNumber(loan.interest)
      .dividedBy(365)
      .multipliedBy(loanTermInDays)
      .multipliedBy(loan.loan_amount)
      .toNumber();
    const monthlyInterest = additionalInterest / months;
    const amountLeft = loan.amortization_table.filter(l => l.status === "DUE" && l.type === "monthly_interest" ).reduce((a,b) => {
      return Number(a) + Number(b.amountToPay)}, 0)
    const totalNewInterest = additionalInterest + amountLeft;
    return {
      totalNewInterest,
      monthlyInterest,
      additionalInterest
    }
  }

  render() {
    const { allLoans, navigation, bankAccountInfo } = this.props;
    const { activePeriod, months } = this.state;
    if (!bankAccountInfo)
      return <LoadingScreen />;
    const style = ExtendLoanScreenStyle()
    const loanId = navigation.getParam("id");
    const loan = allLoans.find(l => l.id === loanId);
    let disabled = false;
    let color = "black"

    const predefinedAmount = [
      { label: `6 months`, value: "6" },
      { label: `36 months`, value: "36" },
    ];
    const interest = this.extendLoanCalculateInterest(loan)
    if (months < 6 || months > 36) {
      disabled = true
      color = getColor(COLOR_KEYS.NEGATIVE_STATE)
    }

    return (
      <RegularLayout>
        <View style={style.wrapper}>
          <View>
            <CelText align={"center"} weight={"300"}>
              How long would you like to extend loan
            </CelText>
            <PredefinedAmounts
              data={predefinedAmount}
              onSelect={this.onPressPredefinedAmount}
              activePeriod={activePeriod}
            />
          </View>

          <View style={style.circleWrapper}>
              <CircleButton
                icon={"Minus2"}
                size={30}
                onPress={() => this.extendLoanDecrement()}
              />
              <View style={style.input}>
                <TextInput
                  keyboardType={KEYBOARD_TYPE.NUMBER_PAD}
                  autoFocus
                  onChangeText={newValue => this.handleAmountChange(newValue)}
                  maxLenght={2}
                  field={"term_of_loan"}
                  style={[style.textInput, { fontSize: getFontSize("H1"), color }]}
                >
                  {months}
                </TextInput>
                <CelText margin={"0 20 0 20"} weight={"200"} type={"H3"}>
                  {"months"}
                </CelText>
              </View>
            <CircleButton
              icon={"Plus"}
              size={30}
              onPress={() => this.extendLoanIncrement()}
            />
          </View>
          <View>
            <Card size={"twoThirds"} color={COLOR_KEYS.BACKGROUND}>
              <CelText type={"H6"}>{`Additional interest: ${formatter.crypto(interest.additionalInterest, loan.coin_loan_asset, { precision: 2} )}`}</CelText>
              <Separator margin={"10 0 10 0"}/>
              <CelText type={"H6"}>{`New monthly interest: ${formatter.crypto(interest.monthlyInterest, loan.coin_loan_asset, { precision: 2} )}`}</CelText>
              <Separator margin={"10 0 10 0"}/>
              <CelText type={"H6"}>{`Total interest : ${formatter.crypto(interest.totalNewInterest, loan.coin_loan_asset, { precision: 2} )}`}</CelText>
            </Card>

          </View>

          <View>
            <CelButton
              onPress={() => this.handleConfirmation(loan, bankAccountInfo, interest.totalNewInterest)}
              margin={"30 0 0 0"}
              iconRight={"IconArrowRight"}
              iconRightWidth={20}
              disabled={disabled}
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
