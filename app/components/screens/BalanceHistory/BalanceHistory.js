import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import formatter from "../../../utils/formatter";
import * as appActions from "../../../redux/actions";
import BalanceHistoryStyle from "./BalanceHistory.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import TransactionsHistory from "../../molecules/TransactionsHistory/TransactionsHistory";
import CelButton from "../../atoms/CelButton/CelButton";
import GraphContainer from "../../graphs/GraphContainer/GraphContainer";
import { hasPassedKYC } from "../../../utils/user-util";
import StaticScreen from "../StaticScreen/StaticScreen";
import { EMPTY_STATES } from "../../../constants/UI";

@connect(
  state => ({
    walletSummary: state.wallet.summary,
    currencyGraphs: state.currencies.graphs,
    walletTotalChartData: state.graph.walletTotalChartData,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BalanceHistory extends Component {
  static propTypes = {
    // text: PropTypes.string
  };
  static defaultProps = {};

  static navigationOptions = {
    title: "Wallet",
    right: "profile",
  };

  constructor(props) {
    super(props);

    this.state = {
      header: {
        title: "Wallet",
        left: "back",
        right: "profile",
      },
      dateArray: [],
      priceArray: [],
      timeInterval: "1d",
    };
  }

  handleGetAllTransactions = async () => {
    const { actions } = this.props;

    await actions.navigateTo("AllTransactions");
    await actions.getAllTransactions();
  };

  render() {
    const { walletSummary } = this.props;
    const style = BalanceHistoryStyle();

    if (!hasPassedKYC()) {
      return (
        <StaticScreen emptyState={{ purpose: EMPTY_STATES.NO_TRANSACTIONS }} />
      );
    }

    return (
      <RegularLayout padding="20 0 100 0">
        <View>
          <View style={style.container}>
            <Card styles={{ alignSelf: "center" }}>
              <CelText weight="300" type="H6">
                Total wallet balance
              </CelText>
              <CelText weight="600" type="H3">
                {walletSummary && formatter.usd(walletSummary.total_amount_usd)}
              </CelText>
            </Card>
          </View>

          <GraphContainer showCursor showPeriods type={"total-balance"} />

          <View style={style.container}>
            <TransactionsHistory
              hasFilter={false}
              additionalFilter={{ limit: 5 }}
            />

            <CelButton basic onPress={() => this.handleGetAllTransactions()}>
              See all
            </CelButton>
          </View>
        </View>
      </RegularLayout>
    );
  }
}

export default BalanceHistory;
