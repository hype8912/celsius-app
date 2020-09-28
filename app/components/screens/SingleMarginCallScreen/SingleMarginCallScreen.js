import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import Card from "../../atoms/Card/Card";
import { presentTime } from "../../../utils/ui-util";
import {
  COIN_CARD_TYPE,
  LOAN_PAYMENT_REASONS,
  MODALS,
} from "../../../constants/UI";
import PaymentCard from "../../molecules/PaymentCard/PaymentCard";
import LtvCard from "../../molecules/LtvCard/LtvCard";
import MarginCallConfirmModal from "../../modals/MarginCallConfirmModal/MarginCallConfirmModal";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

@connect(
  state => ({
    currencyRates: state.currencies.rates,
    allLoans: state.loans.allLoans,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SingleMarginCallScreen extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Margin Call",
    right: "profile",
  });

  constructor(props) {
    super(props);

    const { navigation, allLoans } = props;
    const loanId = navigation.getParam("id");

    this.state = {
      loan: allLoans.find(l => l.id === loanId),
      isLoading: false,
    };
  }

  onPress = () => {
    const { actions } = this.props;
    actions.openModal(MODALS.MARGIN_CALL_CONFIRM);
  };

  render() {
    const { loan, isLoading } = this.state;
    const { currencyRates } = this.props;
    if (!loan) return null;
    const time = presentTime(loan.margin_call.margin_call_detected, true);

    return (
      <RegularLayout>
        <Card>
          <CelText type={"H4"} weight={"500"}>{`Loan - #${loan.id}`}</CelText>
        </Card>
        <Card margin={"10 0 10 0"}>
          <CelText type={"H6"}>Time remaining to resolve Margin Call</CelText>
          <CelText weight={"500"} type={"H3"}>
            {time.days >= 1 ? `00h 00m` : `${time.hours}h ${time.minutes}m`}
          </CelText>
          {time.days >= 1 && (
            <Card color={getColor(COLOR_KEYS.NEGATIVE_STATE)}>
              <CelText weight={"300"} type={"H6"} color={"white"}>
                Your loan is now in default and you are at risk of collateral
                liquidation. We advise you to contact your loan manager now.
              </CelText>
            </Card>
          )}
        </Card>
        <PaymentCard
          coin={currencyRates.find(cr => cr.short === loan.coin)}
          type={COIN_CARD_TYPE.MARGIN_COLLATERAL_COIN_CARD}
          loan={loan}
          reason={LOAN_PAYMENT_REASONS.MARGIN_CALL}
          handleSelectCoin={() => this.onPress(loan)}
          isLoading={isLoading}
        />
        <LtvCard loan={loan} />
        <MarginCallConfirmModal loan={loan} />
      </RegularLayout>
    );
  }
}

export default SingleMarginCallScreen;
