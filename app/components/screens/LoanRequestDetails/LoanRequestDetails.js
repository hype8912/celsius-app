import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import LoanRequestDetailsStyle from "./LoanRequestDetails.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";

import Icon from "../../atoms/Icon/Icon";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CelButton from "../../atoms/CelButton/CelButton";
import { LOAN_STATUS } from "../../../constants/DATA";
import formatter from "../../../utils/formatter";
import LoanApplicationSuccessModal from "../../modals/LoanApplicationSuccessModal/LoanApplicationSuccessModal";
import TxBasicSection from "../../atoms/TxBasicSection/TxBasicSection";
import TxBasicCardSection from "../../atoms/TxBasicCardSection/TxBasicCardSection";
import TxCardSection from "../../atoms/TxCardSection/TxCardSection";
import { getColor } from "../../../utils/styles-util";
import { SCREENS } from "../../../constants/SCREENS";

@connect(
  state => ({
    allLoans: state.loans.allLoans,
    activeLoan: state.loans.activeLoan,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class LoanRequestDetails extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = ({ navigation }) => {
    const hideBack = navigation.getParam("hideBack");

    return {
      title: `Loan Details`,
      right: "profile",
      hideBack,
    };
  };

  componentDidMount = async () => {
    const { navigation, actions } = this.props;
    const id = navigation.getParam("id");
    actions.setActiveLoan(id);
    await actions.getLoanById(id);
  };

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.activeLoan, this.props.activeLoan)) {
      if (this.props.activeLoan && this.props.activeLoan.uiProps) {
        this.props.navigation.setParams({
          title: `${this.props.activeLoan.uiProps.displayText} Details`,
        });
      }
    }
  }

  renderSection = sectionType => {
    const { activeLoan } = this.props;

    if (!activeLoan) return null;

    switch (sectionType) {
      case "completion:date":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Loan Completion Date"}
            value={moment(activeLoan.maturity_date).format("D MMM YYYY")}
          />
        );
      case "rejection:date":
        return (
          !!activeLoan.rejected_at &&
          activeLoan.rejected_at > "2017-01-01T00:00:00.000Z" && (
            <TxBasicSection
              key={sectionType}
              label={"Loan Rejection Date"}
              value={moment(activeLoan.rejected_at).format("D MMM YYYY")}
            />
          )
        );
      case "cancellation:date":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Loan Cancellation Date"}
            value={moment(activeLoan.canceled_at).format("D MMM YYYY")}
          />
        );
      case "refinanced:date":
        return (
          activeLoan.refinanced_at && (
            <TxBasicSection
              key={sectionType}
              label={"Loan Refinanced On"}
              value={moment(activeLoan.refinanced_at).format("D MMM YYYY")}
            />
          )
        );
      case "initiation:date":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Loan Initiation Date"}
            value={moment(activeLoan.created_at).format("D MMM YYYY")}
          />
        );
      case "unlocked:collateral":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Unlocked Collateral"}
            value={formatter.crypto(
              activeLoan.amount_collateral_crypto,
              activeLoan.coin
            )}
          />
        );
      case "estimated:collateral":
        return (
          <TxCardSection
            key={sectionType}
            title={activeLoan.uiProps.collateral}
            cardText={
              [LOAN_STATUS.PENDING].includes(activeLoan.status) &&
              "Exact collateral amount would be determined upon approval"
            }
            coin={activeLoan.coin}
            coinAmount={activeLoan.amount_collateral_crypto}
          />
        );
      case "collateral":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Locked Collateral"}
            value={formatter.crypto(
              activeLoan.amount_collateral_crypto,
              activeLoan.coin
            )}
          />
        );
      case "term":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Term Length"}
            value={`${activeLoan.term_of_loan} months`}
          />
        );
      case "annualInterest":
        return (
          <TxBasicCardSection
            key={sectionType}
            label={"Annual Interest Rate"}
            coin={activeLoan.coin_loan_asset}
            value={activeLoan.interest}
            monthly={activeLoan.monthly_payment}
            total={activeLoan.total_interest}
          />
        );
      case "marginCall":
        return (
          <TxCardSection
            key={sectionType}
            title={`${activeLoan.coin} Margin Call At:`}
            amount={activeLoan.margin_call_price}
            cardText={`If ${activeLoan.coin} drops below ${formatter.fiat(
              activeLoan.margin_call_price,
              "USD"
            )} you will get a notification asking for additional collateral.`}
          />
        );
      case "liquidation":
        return (
          <TxCardSection
            key={sectionType}
            title={"Liquidation At:"}
            amount={activeLoan.liquidation_call_price}
            cardText={`If ${activeLoan.coin} drops below ${formatter.fiat(
              activeLoan.liquidation_call_price,
              "USD"
            )} we will sell some of your collateral to cover the margin.`}
          />
        );
      case "maturity":
        return (
          <TxBasicSection
            key={sectionType}
            label={"Maturity Date"}
            noSeparator
            value={moment(activeLoan.maturity_date).format("D MMM YYYY")}
          />
        );
      default:
        break;
    }
  };

  render() {
    const { actions, activeLoan } = this.props;
    if (!activeLoan || !activeLoan.uiProps) return <LoadingScreen />;

    const style = LoanRequestDetailsStyle();

    const loanCoinType =
      activeLoan.type === "USD_LOAN"
        ? formatter.fiat(activeLoan.loan_amount_usd, "USD")
        : formatter.crypto(activeLoan.loan_amount, activeLoan.coin_loan_asset, {
            noPrecision: true,
          });

    const sections = activeLoan.uiSections;
    return (
      <RegularLayout>
        <View style={style.container}>
          <View style={style.status}>
            <Icon
              name={"TransactionLoan"}
              fill={getColor(activeLoan.uiProps.color)}
              width={"25"}
              height={"25"}
            />
            <CelText
              type={"H5"}
              color={getColor(activeLoan.uiProps.color)}
              margin={"0 5 0 0"}
            >
              {activeLoan.uiProps.displayText}
            </CelText>
          </View>
          <CelText type={"H2"} weight={"600"} margin={"5 0 5 0"}>
            {loanCoinType}
          </CelText>
        </View>

        {sections.map(this.renderSection)}

        <CelButton
          basic
          onPress={() => actions.resetToScreen(SCREENS.WALLET_LANDING)}
          margin={"20 0 0 0"}
        >
          Go back to the wallet
        </CelButton>

        <LoanApplicationSuccessModal loanId={activeLoan.id} />
      </RegularLayout>
    );
  }
}

export default LoanRequestDetails;
