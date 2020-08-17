import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import {
  COIN_CARD_TYPE,
  LOAN_ALERTS,
  LOAN_PAYMENT_REASONS,
} from "../../../constants/UI";
import PaymentCard from "../../molecules/PaymentCard/PaymentCard";
import MarginCallConfirmModal from "../../modals/MarginCallConfirmModal/MarginCallConfirmModal";

@connect(
  state => ({
    loanAlerts: state.loans.loanAlerts,
    currencyRates: state.currencies.rates,
    allLoans: state.loans.allLoans,
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

  selectCoin = loan => {
    this.setState({
      modalLoan: loan,
    });
  };

  render() {
    const { modalLoan } = this.state;
    const { allLoans, loanAlerts, currencyRates } = this.props;

    const loansOverview = allLoans
      .filter(loan =>
        loanAlerts.find(
          alert =>
            alert.id === loan.id && alert.type === LOAN_ALERTS.MARGIN_CALL_ALERT
        )
      )
      .sort((a, b) => a.id - b.id);
    return (
      <RegularLayout>
        {loansOverview.map((loan, i) => {
          return (
            <View key={loan.id}>
              <PaymentCard
                coin={currencyRates.find(cr => cr.short === loan.coin)}
                type={COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD}
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
