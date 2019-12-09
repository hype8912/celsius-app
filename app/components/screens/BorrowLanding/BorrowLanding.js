import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Animated, View, TouchableOpacity, Image } from "react-native";

import * as appActions from "../../../redux/actions";
import BorrowLandingStyle from "./BorrowLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { hasPassedKYC } from "../../../utils/user-util";
import { EMPTY_STATES, MODALS } from "../../../constants/UI";
import formatter from "../../../utils/formatter";
import BorrowCalculatorScreen from "../BorrowCalculatorScreen/BorrowCalculatorScreen";
import { KYC_STATUSES } from "../../../constants/DATA";
import { widthPercentageToDP } from "../../../utils/styles-util";
import LoanOverviewCard from "../../organisms/LoanOverviewCard/LoanOverviewCard";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import CancelLoanModal from "../../modals/CancelLoanModal/CancelLoanModal";

const cardWidth = widthPercentageToDP("70%");

@connect(
  state => {
    const loanCompliance = state.compliance.loan;
    const walletSummary = state.wallet.summary;
    const eligibleCoins =
      walletSummary &&
      walletSummary.coins.filter(coinData =>
        loanCompliance.collateral_coins.includes(coinData.short)
      );
    const maxAmount =
      walletSummary &&
      eligibleCoins.reduce(
        (max, element) => (element.amount_usd > max ? element.amount_usd : max),
        0
      );

    return {
      user: state.user.profile,
      formData: state.forms.formData,
      currencies: state.currencies.rates,
      loanCompliance,
      walletSummary,
      allLoans: state.loans.allLoans,
      minimumLoanAmount: state.generalData.minimumLoanAmount,
      ltv: state.loans.ltvs,
      kycStatus: state.user.profile.kyc
        ? state.user.profile.kyc.status
        : KYC_STATUSES.collecting,
      eligibleCoins,
      maxAmount,
      loyaltyInfo: state.user.loyaltyInfo,
    };
  },
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BorrowLanding extends Component {
  static navigationOptions = () => ({
    title: "Loan Overview",
    right: "profile",
  });

  constructor(props) {
    super(props);
    const { ltv } = this.props;

    this.state = {
      isLoading: true,
      xOffset: new Animated.Value(0),
    };

    this.bestLtv = Math.max(...ltv.map(x => x.percent));
  }

  async componentDidMount() {
    const { actions, loanCompliance, formData } = this.props;
    if (formData.prepayLoanId) {
      actions.openModal(MODALS.PREPAYMENT_SUCCESSFUL_MODAL);
    }

    if (loanCompliance.allowed) {
      await actions.getAllLoans();
    }
    this.setState({ isLoading: false });
  }

  getMinLtv = () => {
    const { ltv } = this.props;

    return Math.max(...ltv.map(x => x.percent));
  };

  transitionAnimation = index => ({
    transform: [
      { perspective: 800 },
      {
        scale: this.state.xOffset.interpolate({
          inputRange: [
            (index - 1) * cardWidth,
            index * cardWidth,
            (index + 1) * cardWidth,
          ],
          outputRange: [0.9, 1, 0.9],
          extrapolate: "clamp",
        }),
      },
    ],
  });

  // TODO (fj) move to loans util
  emitParams = () => {
    const {
      formData,
      currencies,
      ltv,
      minimumLoanAmount,
      eligibleCoins,
    } = this.props;
    const loanParams = {};

    if (formData && formData.coin !== "USD" && formData.ltv) {
      loanParams.annualInterestPct = formData.ltv.interest;
      loanParams.totalInterestPct =
        loanParams.annualInterestPct * (formData.termOfLoan / 12);
      loanParams.monthlyInterestPct =
        loanParams.totalInterestPct / formData.termOfLoan;

      loanParams.totalInterest = formatter.usd(
        Number(loanParams.totalInterestPct * formData.amount)
      );
      loanParams.monthlyInterest = formatter.usd(
        Number(
          (loanParams.totalInterestPct * formData.amount) / formData.termOfLoan
        )
      );
      loanParams.collateralNeeded =
        Number(formData.amount) /
        currencies.find(c => c.short === formData.coin).market_quotes_usd
          .price /
        formData.ltv.percent;
      loanParams.bestLtv = Math.max(...ltv.map(x => x.percent));

      const arrayOfAmountUsd = eligibleCoins.map(c => c.amount_usd);

      const indexOfLargestAmount = arrayOfAmountUsd.indexOf(
        Math.max(...arrayOfAmountUsd)
      );

      loanParams.largestAmountCrypto =
        eligibleCoins[indexOfLargestAmount].amount;
      loanParams.largestShortCrypto = eligibleCoins[indexOfLargestAmount].short;
      loanParams.minimumLoanAmountCrypto =
        minimumLoanAmount /
        currencies.find(
          c => c.short === eligibleCoins[indexOfLargestAmount].short
        ).market_quotes_usd.price;
      loanParams.missingCollateral = Math.abs(
        (loanParams.largestAmountCrypto - loanParams.minimumLoanAmountCrypto) /
          loanParams.bestLtv
      );
    }
    return loanParams;
  };

  hasEnoughForLoan = () => {
    const { minimumLoanAmount, maxAmount } = this.props;
    const minLtv = this.getMinLtv();

    return maxAmount > minimumLoanAmount / minLtv;
  };

  renderCard = () => {
    const style = BorrowLandingStyle();
    const { actions } = this.props;
    return (
      <Card padding="12 12 12 12">
        <View style={style.buttonsWrapper}>
          <View style={style.buttonsIconText}>
            <TouchableOpacity
              style={style.buttonIconText}
              onPress={() => actions.navigateTo("BorrowChooseLoan")}
            >
              <View style={style.buttonItself}>
                <Image
                  style={style.buttonIconHand}
                  source={require("../../../../assets/images/icon-apply-for-a-new-loan.png")}
                />
                <CelText align="center">Apply for a loan</CelText>
              </View>
            </TouchableOpacity>
            <Separator vertical height={"35%"} top={42} />
            <TouchableOpacity
              style={style.buttonIconText}
              onPress={() => {
                actions.navigateTo("BorrowCalculatorScreen", {
                  emitParams: this.emitParams,
                });
              }}
            >
              <View style={style.buttonItself}>
                <Image
                  style={style.buttonIconCalc}
                  source={require("../../../../assets/images/calculator.png")}
                />
                <CelText align="center">Calculator</CelText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  renderDefaultView() {
    const { xOffset } = this.state;
    const { actions, allLoans, loyaltyInfo } = this.props;

    return (
      <RegularLayout padding={"20 0 100 0"}>
        <View>
          <View style={{ marginLeft: 20, marginRight: 20 }}>
            {this.renderCard()}
          </View>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xOffset } } }],
              { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={cardWidth}
            snapToAlignment={"right"}
          >
            {allLoans &&
              allLoans.map((loan, index) => {
                const opacity = xOffset.interpolate({
                  inputRange: [
                    (index - 1) * cardWidth,
                    index * cardWidth,
                    (index + 1) * cardWidth,
                  ],
                  outputRange: [0.3, 1, 0.15],
                  extrapolate: "clamp",
                });

                return (
                  <Animated.View
                    key={loan.id}
                    style={[this.transitionAnimation(index), { opacity }]}
                  >
                    <LoanOverviewCard
                      loan={loan}
                      index={index}
                      length={allLoans.length - 1}
                      navigateTo={actions.navigateTo}
                      actions={actions}
                      celDiscount={loyaltyInfo.tier.loanInterestBonus}
                    />
                  </Animated.View>
                );
              })}
          </Animated.ScrollView>
          <CancelLoanModal actions={actions} />
        </View>
      </RegularLayout>
    );
  }

  renderNoLoans = () => (
    <RegularLayout>
      <EmptyState purpose={EMPTY_STATES.NO_LOANS} />
    </RegularLayout>
  );

  // slavija intersection
  renderIntersection() {
    const { user, kycStatus, loanCompliance, allLoans } = this.props;

    const hasLoans = !!allLoans.length;

    if (kycStatus && !hasPassedKYC())
      return (
        <BorrowCalculatorScreen
          emitParams={this.emitParams}
          purpose={EMPTY_STATES.NON_VERIFIED_BORROW}
        />
      );
    if (!user.celsius_member)
      return (
        <BorrowCalculatorScreen
          emitParams={this.emitParams}
          purpose={EMPTY_STATES.NON_MEMBER_BORROW}
        />
      );
    if (!loanCompliance.allowed)
      return (
        <BorrowCalculatorScreen
          emitParams={this.emitParams}
          purpose={EMPTY_STATES.COMPLIANCE}
        />
      );

    if (!hasLoans) return this.renderNoLoans();

    return this.renderDefaultView();
  }

  render() {
    const { walletSummary } = this.props;
    if (!walletSummary) return null;
    return this.renderIntersection();
  }
}

export default BorrowLanding;
