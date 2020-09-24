import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { MODALS } from "../../../../constants/UI";
import * as appActions from "../../../../redux/actions";
import { SCREENS } from "../../../../constants/SCREENS";
import CelText from "../../../atoms/CelText/CelText";
import formatter from "../../../../utils/formatter";
import Separator from "../../../atoms/Separator/Separator";
import CelModalButton from "../../../atoms/CelModalButton/CelModalButton";
import CelModal from "../../CelModal/CelModal";
import LoanAlertsPayoutPrincipalModalStyle from "../LoanAlertsPayoutPrincipalModal/LoanAlertsPayoutPrincipalModal.styles";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    walletSummary: state.wallet.summary,
    currencyRates: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanAlertsPayoutPrincipalModal extends Component {
  constructor(props) {
    super(props);
    const { loan, allLoans } = props;
    this.state = {
      isLoadingExtend: false,
      isLoadingClose: false,
      loan: allLoans.find(l => l.id === loan.id),
    };
  }

  renderContent = () => {
    const { actions } = this.props;
    const { loan } = this.state;

    actions.navigateTo(SCREENS.VERIFY_PROFILE, {
      onSuccess: () => actions.payPrincipal(loan.id),
    });
    actions.closeModal();
    return {
      heading: "Confirm Principal Payment",
      buttonText: "Pay Principal",
      buttonTextTwo: "Extend Loan",
      onPress: async () => {
        this.setState({
          isLoadingClose: true,
        });
        await actions.payPrincipal(loan.id);
        this.setState({
          isLoadingClose: false,
        });
        actions.closeModal();
      },
      onPressTwo: async () => {
        this.setState({
          isLoadingExtend: true,
        });
        await actions.navigateTo(SCREENS.EXTEND_LOAN, {
          id: loan.id,
        });
        this.setState({
          isLoadingExtend: false,
        });
        actions.closeModal();
      },
    };
  };

  render() {
    const { loan, isLoadingClose } = this.state;
    return null;

    // eslint-disable-next-line no-unreachable
    const { walletSummary, currencyRates } = this.props;
    const style = LoanAlertsPayoutPrincipalModalStyle();

    const currency = currencyRates.filter(
      c => c.short === loan.coin_loan_asset.toUpperCase()
    )[0];
    const walletCoin = walletSummary.coins.find(
      c => c.short === loan.coin_loan_asset
    );
    const newBalanceCrypto = walletCoin.amount.minus(loan.loan_amount);
    const usdValue =
      Number(currency.market_quotes_usd.price) * Number(loan.loan_amount);
    const newBalanceUsd = walletCoin.amount_usd.minus(usdValue);
    const content = this.renderContent();

    return (
      <CelModal style={style.container} name={MODALS.LOAN_ALERT_MODAL}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <CelText type={"H2"} align={"center"} weight={"500"}>
            {content.heading}
          </CelText>
          <View>
            <CelText align={"center"} margin={"20 0 0 0"} type={"H5"}>
              You are about to pay
            </CelText>
            <CelText align={"center"} type={"H1"}>
              {formatter.crypto(loan.loan_amount, loan.coin_loan_asset)}
            </CelText>
            <CelText align={"center"}>
              {formatter.fiat(usdValue, "USD")}
            </CelText>
            <View>
              <Separator margin={"20 0 20 0"} />
            </View>
            <CelText align={"center"} type={"H6"}>
              New wallet balance:
            </CelText>
            <CelText
              margin={"5 0 0 0"}
              align={"center"}
              type={"H6"}
            >{`${formatter.crypto(
              newBalanceCrypto,
              loan.coin_loan_asset
            )} | ${formatter.fiat(newBalanceUsd, "USD")}`}</CelText>
          </View>
        </View>

        <View style={style.buttonsWrapper}>
          <CelModalButton
            buttonStyle={"green"}
            position={"single"}
            loading={isLoadingClose}
            onPress={content.onPress}
          >
            {content.buttonText}
          </CelModalButton>
          {/* <CelModalButton*/}
          {/*  buttonStyle={"green"}*/}
          {/*  position={"right"}*/}
          {/*  noLoading={isLoadingExtend}*/}
          {/*  onPress={content.onPressTwo}*/}
          {/* >*/}
          {/*  {content.buttonTextTwo}*/}
          {/* </CelModalButton>*/}
        </View>
      </CelModal>
    );
  }
}

LoanAlertsPayoutPrincipalModal.propTypes = {
  loan: PropTypes.instanceOf(Object),
};

export default LoanAlertsPayoutPrincipalModal;
