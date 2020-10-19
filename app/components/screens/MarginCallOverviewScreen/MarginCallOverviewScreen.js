import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import {
  COIN_CARD_TYPE,
  EMPTY_STATES,
  LOAN_ALERTS,
  LOAN_PAYMENT_REASONS,
} from "../../../constants/UI";
import PaymentCard from "../../molecules/PaymentCard/PaymentCard";
import MarginCallConfirmModal from "../../modals/MarginCallConfirmModal/MarginCallConfirmModal";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import Spinner from "../../atoms/Spinner/Spinner";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    currencyRates: state.currencies.rates,
    allLoans: state.loans.allLoans,
    callsInProgress: state.api.callsInProgress,
    activeScreen: state.nav.activeScreen,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class MarginCallOverviewScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Margin Call",
    right: "profile",
  });

  constructor(props) {
    super(props);

    this.state = {
      modalLoan: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { actions, activeScreen } = this.props;
    if (
      prevProps.activeScreen !== activeScreen &&
      _.isEqual(prevProps.loanAlerts[0], this.props.loanAlerts[0])
    ) {
      actions.getLoanAlerts();
    }
  }

  selectCoin = loan => {
    this.setState({
      modalLoan: loan,
    });
  };

  render() {
    const { modalLoan } = this.state;
    const {
      actions,
      allLoans,
      loanAlerts,
      currencyRates,
      callsInProgress,
    } = this.props;

    const isFetching = apiUtil.areCallsInProgress(
      [API.CHECK_LOAN_ALERTS, API.GET_LOAN_ALERTS],
      callsInProgress
    );

    if (isFetching)
      return (
        <RegularLayout>
          <View
            style={{
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </View>
        </RegularLayout>
      );

    const loansOverview = allLoans
      .filter(loan =>
        loanAlerts.find(
          alert =>
            alert.id === loan.id && alert.type === LOAN_ALERTS.MARGIN_CALL_ALERT
        )
      )
      .sort((a, b) => a.id - b.id);

    if (!loansOverview.length)
      return (
        <RegularLayout>
          <EmptyState purpose={EMPTY_STATES.NO_MARGIN_CALL_PAYMENTS} />
        </RegularLayout>
      );

    return (
      <RegularLayout pullToRefresh={() => actions.checkForLoanAlerts()}>
        {loansOverview.map((loan, i) => {
          return (
            <View key={loan.id}>
              <PaymentCard
                coin={currencyRates.find(cr => cr.short === loan.coin)}
                type={COIN_CARD_TYPE.MARGIN_CALL}
                loan={loan}
                reason={LOAN_PAYMENT_REASONS.MARGIN_CALL}
                handleSelectCoin={() => this.selectCoin(loan)}
                number={i}
                isOverview
              />
            </View>
          );
        })}
        <MarginCallConfirmModal loan={modalLoan} />
      </RegularLayout>
    );
  }
}

export default MarginCallOverviewScreen;
