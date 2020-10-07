import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

import * as appActions from "../../../redux/actions";
import BorrowLandingStyle from "./BorrowLanding.styles";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import { EMPTY_STATES, MODALS, LOAN_FILTER_ITEMS } from "../../../constants/UI";
import BorrowCalculatorScreen from "../BorrowCalculatorScreen/BorrowCalculatorScreen";
import { KYC_STATUSES } from "../../../constants/DATA";
import { getColor, widthPercentageToDP } from "../../../utils/styles-util";
import LoanOverviewCard from "../../organisms/LoanOverviewCard/LoanOverviewCard";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import Separator from "../../atoms/Separator/Separator";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import CancelLoanModal from "../../modals/CancelLoanModal/CancelLoanModal";
import InterestDueModal from "../../modals/InterestDueModal/InterestDueModal";
import LoanAlertsModalWrapper from "../../modals/LoanAlertsModals/LoanAlertsModalWrapper";
import Spinner from "../../atoms/Spinner/Spinner";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";
import Constants from "../../../../constants";

const { STORYBOOK } = Constants;
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
      loyaltyInfo: state.loyalty.loyaltyInfo,
      activeLoan: state.loans.activeLoan,
      userTriggeredActions: state.user.appSettings.user_triggered_actions || {},
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
      isLoading: !STORYBOOK,
      xOffset: new Animated.Value(0),
      filterItem: null,
    };

    this.bestLtv = Math.max(...ltv.map(x => x.percent));
  }

  async componentDidMount() {
    const { actions, loanCompliance, formData } = this.props;
    actions.checkForLoanAlerts();

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

  hasEnoughForLoan = () => {
    const { minimumLoanAmount, maxAmount } = this.props;
    const minLtv = this.getMinLtv();

    return maxAmount > minimumLoanAmount / minLtv;
  };

  handleFilter = () => {
    const { allLoans } = this.props;
    const { filterItem } = this.state;

    if (filterItem === null) return allLoans;

    const filteredLoans = allLoans.filter(
      item => item.status.toUpperCase() === filterItem
    );

    return filteredLoans;
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
              onPress={() => actions.navigateTo(SCREENS.BORROW_CHOOSE_LOAN)}
            >
              <View style={style.buttonItself}>
                <ThemedImage
                  style={style.buttonIconHand}
                  lightSource={require("../../../../assets/images/icon-apply-for-a-new-loan.png")}
                  darkSource={require("../../../../assets/images/icon-apply-for-a-new-loan.png")}
                  unicornSource={require("../../../../assets/images/icon-apply-for-a-new-loan-unicorn.png")}
                />
                <CelText align="center">Apply for a loan</CelText>
              </View>
            </TouchableOpacity>
            <Separator vertical height={"35%"} top={42} />
            <TouchableOpacity
              style={style.buttonIconText}
              onPress={() => {
                actions.navigateTo(SCREENS.BORROW_CALCULATOR_SCREEN);
              }}
            >
              <View style={style.buttonItself}>
                <ThemedImage
                  style={style.buttonIconCalc}
                  lightSource={require("../../../../assets/images/calculator.png")}
                  darkSource={require("../../../../assets/images/calculator.png")}
                  unicornSource={require("../../../../assets/images/calculator-unicorn.png")}
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
    const { xOffset, filterItem, isLoading } = this.state;
    const { actions, allLoans, loyaltyInfo, activeLoan } = this.props;
    const style = BorrowLandingStyle();
    const filteredLoans = this.handleFilter();
    const filter = filterItem || "ALL";

    return (
      <RegularLayout
        padding={"20 0 100 0"}
        pullToRefresh={() => actions.getAllLoans()}
      >
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          {this.renderCard()}
        </View>
        {isLoading ? (
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </View>
        ) : (
          <View>
            <ScrollView
              horizontal
              style={style.tabs}
              showsHorizontalScrollIndicator={false}
            >
              {LOAN_FILTER_ITEMS.map(item => (
                <TouchableOpacity
                  key={item}
                  style={style.tab}
                  onPress={() =>
                    this.setState({
                      filterItem: item !== "ALL" ? item : null,
                    })
                  }
                >
                  <CelText
                    type={"H6"}
                    weight={item === filter ? "500" : "300"}
                    color={
                      item === filter
                        ? getColor(COLOR_KEYS.PRIMARY_BUTTON)
                        : undefined
                    }
                  >
                    {item}
                  </CelText>
                  {filter === item && <View style={style.activeFilterLine} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
            {filteredLoans.length > 0 ? (
              <View>
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
                  {filteredLoans &&
                    filteredLoans.map((loan, index) => {
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
                <InterestDueModal
                  closeModal={actions.closeModal}
                  activeLoan={activeLoan}
                  navigateTo={actions.navigateTo}
                />
              </View>
            ) : (
              <View style={style.noSelectedItems}>
                <CelText align={"center"} width={"300"}>
                  Sorry, there are no loans for the selected category.
                </CelText>
              </View>
            )}
          </View>
        )}
        <LoanAlertsModalWrapper />
      </RegularLayout>
    );
  }

  renderNoLoans = () => (
    <RegularLayout>
      <EmptyState purpose={EMPTY_STATES.NO_LOANS} />
    </RegularLayout>
  );

  renderNoCompliance = () => (
    <RegularLayout>
      <View style={{ height: "100%", justifyContent: "center" }}>
        <CelText type={"H4"} weight={"500"} align={"center"}>
          You are unable to access this feature due to your jurisdiction. For
          more information please reach out to
          <CelText
            color={getColor(COLOR_KEYS.LINK)}
            onPress={() => Linking.openURL("mailto:loans@celsius.network")}
            type={"H4"}
            weight={"500"}
          >
            {" "}
            loans@celsius.network.
          </CelText>
        </CelText>
      </View>
    </RegularLayout>
  );

  // slavija intersection
  renderIntersection() {
    const { kycStatus, loanCompliance, allLoans } = this.props;

    const hasLoans = !!allLoans.length;

    if (kycStatus && !hasPassedKYC())
      return (
        <BorrowCalculatorScreen purpose={EMPTY_STATES.NON_VERIFIED_BORROW} />
      );
    if (!loanCompliance.allowed) return this.renderNoCompliance();

    if (!hasLoans) return this.renderNoLoans();

    return this.renderDefaultView();
  }

  render() {
    const { walletSummary } = this.props;

    if (!walletSummary) return null;

    return <>{this.renderIntersection()}</>;
  }
}

export default BorrowLanding;
