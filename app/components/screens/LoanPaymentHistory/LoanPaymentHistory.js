import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import PaymentListItem from "../../atoms/PaymentListItem/PaymentListItem";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanPaymentHistory extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Payment History",
    right: "profile",
  });

  constructor(props) {
    super(props);

    const { navigation, allLoans } = props;
    const loanId = navigation.getParam("id");

    this.state = {
      loan: allLoans.find(l => l.id === loanId),
    };
  }

  render() {
    const { loan } = this.state;

    if (!loan.amortization_table) return null;

    const paymentHistory = loan.amortization_table.filter(p => p.isPaid);

    return (
      <RegularLayout>
        <View style={{ marginHorizontal: 15 }}>
          <CelText weight="500" type="H6">
            Payment History
          </CelText>
          <View style={{ marginTop: 15 }}>
            {paymentHistory.map((p, i) => (
              <PaymentListItem payment={p} key={`${p.dueDate}${i}`} />
            ))}
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default LoanPaymentHistory;
