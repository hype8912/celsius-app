import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, FlatList, TouchableOpacity } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import TransactionsHistoryStyle from "./TransactionsHistory.styles";
import TransactionRow from "../../atoms/TransactionRow/TransactionRow";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import { getMargins } from "../../../utils/styles-util";
import apiUtil from "../../../utils/api-util";
import API from "../../../constants/API";
import LoadingState from "../../atoms/LoadingState/LoadingState";
import EmptyState from "../../atoms/EmptyState/EmptyState";
import * as appActions from "../../../redux/actions";
import transactionsFilterUtil from "../../../utils/transactions-filter-util";
import { MODALS } from "../../../constants/UI";
import TransactionFilterModal from "../../modals/TransactionFilterModal/TransactionFilterModal";
import Card from "../../atoms/Card/Card";
import CelButton from "../../atoms/CelButton/CelButton";

@connect(
  state => ({
    transactions: state.transactions.transactionList,
    currencyRatesShort: state.currencies.currencyRatesShort,
    formData: state.forms.formData,
    callsInProgress: state.api.callsInProgress,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionsHistory extends Component {
  static propTypes = {
    margin: PropTypes.string,
    filterOptions: PropTypes.instanceOf(Array),
    additionalFilter: PropTypes.instanceOf(Object),
    hasFilter: PropTypes.bool,
  };
  static defaultProps = {
    margin: "20 0 0 0",
    hasFilter: true,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { actions, additionalFilter } = this.props;
    actions.getAllTransactions(additionalFilter);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.clearForm();
  }

  prepTransactions() {
    const {
      transactions,
      additionalFilter,
      currencyRatesShort,
      formData,
    } = this.props;

    const coin = formData.filterTransactionsCoins;
    const type = formData.filterTransactionsType;
    const period = formData.filterTransactionsDate;

    const transactionsArray = transactionsFilterUtil.filterTransactions(
      transactions,
      {
        coin,
        type,
        period,
        ...additionalFilter,
      }
    );

    const transactionsDisplay = transactionsArray.map(t => ({
      ...t,
      id: t.id,
      amount: t.amount,
      amount_usd: t.amount_usd
        ? t.amount_usd
        : t.amount * currencyRatesShort[t.coin],
      nature: t.nature,
      interest_coin: t.interest_coin,
      coin: t.coin,
      time: moment(t.time).isSame(moment(), "day")
        ? moment(t.time).format("HH:mm")
        : moment(t.time).format("DD MMM YYYY"),
      status: t.is_confirmed ? t.type : "pending",
      type: t.type,
      transfer_data: t.transfer_data,
    }));

    return transactionsDisplay;
  }

  handleGetAllTransactions = async () => {
    const { actions, additionalFilter } = this.props;

    if (additionalFilter) {
      await actions.navigateTo("AllTransactions", { additionalFilter });
    } else {
      await actions.navigateTo("AllTransactions");
    }
    await actions.getAllTransactions();
  };

  sendCsvRequest = async () => {
    const { actions } = this.props;
    await actions.sendCsvEmail();
  };

  renderEmailButton = () => {
    const { callsInProgress } = this.props;
    const disabled = apiUtil.areCallsInProgress(
      [API.GET_CSV_EMAIL],
      callsInProgress
    );
    return (
      <Card padding={"20 0 20 0"}>
        <TouchableOpacity
          onPress={() => this.sendCsvRequest()}
          disabled={disabled}
        >
          <Icon name="Mail" width={30} height={30} />
          <CelText align={"center"}>Send CSV to Email</CelText>
        </TouchableOpacity>
      </Card>
    );
  };

  renderPickerSelect = () => {
    const { actions } = this.props;
    return (
      <TouchableOpacity
        onPress={() => actions.openModal(MODALS.TRANSACTION_FILTER_MODAL)}
        style={{
          height: 50,
          width: 50,
          paddingTop: 20,
          alignItems: "flex-end",
        }}
      >
        <Icon name="Filter" width="16" height="16" />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      actions,
      margin,
      callsInProgress,
      hasFilter,
      transactions,
      additionalFilter,
      // navigation
    } = this.props;
    const style = TransactionsHistoryStyle();
    const margins = getMargins(margin);
    // const transactionType = navigation.getParam('transactionType') || null
    const transactionsDisplay = this.prepTransactions();

    const emptyStateText =
      additionalFilter &&
      additionalFilter.type &&
      additionalFilter.type[0] === "celpay"
        ? "There are currently no CelPay transactions to display for this account"
        : "No transactions for given filters in your wallet";

    if (
      !transactionsDisplay.length &&
      apiUtil.areCallsInProgress([API.GET_ALL_TRANSACTIONS], callsInProgress)
    ) {
      return <LoadingState />;
    }

    if (transactions && transactions.length === 0) {
      return (
        <EmptyState
          heading="Sorry"
          paragraphs={["No transactions in your wallet"]}
        />
      );
    }

    return (
      <View style={[style.container]}>
        <View
          style={[
            style.filterContainer,
            hasFilter ? { marginBottom: 10 } : margins,
          ]}
        >
          <View>
            <CelText weight="medium" type="H6" margin="0 0 0 0">
              Transaction history
            </CelText>
          </View>
          {hasFilter && this.renderPickerSelect()}
        </View>

        {this.renderEmailButton()}

        {!transactionsDisplay.length ? (
          <EmptyState heading="Sorry" paragraphs={[emptyStateText]} />
        ) : (
          <View>
            <FlatList
              data={transactionsDisplay}
              renderItem={({ item, index }) => (
                <TransactionRow
                  transaction={item}
                  index={index}
                  count={transactionsDisplay.length}
                  onPress={() =>
                    actions.navigateTo("TransactionsIntersection", {
                      id: item.id,
                    })
                  }
                />
              )}
              keyExtractor={item => item.id}
            />
            {additionalFilter && additionalFilter.limit && (
              <CelButton basic onPress={() => this.handleGetAllTransactions()}>
                See all
              </CelButton>
            )}
          </View>
        )}
        <TransactionFilterModal />
      </View>
    );
  }
}

export default TransactionsHistory;
