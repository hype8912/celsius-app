import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { FlatList, ScrollView, View } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import TransactionFilterModalStyle from "./TransactionFilterModal.styles";
import CelModal from "../CelModal/CelModal.js";
import {
  MODALS,
  TRANSACTION_FILTER_DATE,
  TRANSACTION_FILTER_TYPE,
} from "../../../constants/UI";
import ExpandableItem from "../../molecules/ExpandableItem/ExpandableItem";
import * as appActions from "../../../redux/actions";
import Separator from "../../atoms/Separator/Separator";
import { widthPercentageToDP } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import TransactionsFilterItem from "../../atoms/TransactionsFilterItem/TransactionsFilterItem";
import CelModalButton from "../../atoms/CelModalButton/CelModalButton";

@connect(
  state => ({
    coins: state.currencies.rates,
    formData: state.forms.formData,
    depositCompliance: state.compliance.deposit,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class TransactionFilterModal extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    const { coins, depositCompliance } = props;

    const coinSelectItems =
      coins && coins.filter(c => depositCompliance.coins.includes(c.short));

    const coinsList = coinSelectItems
      ? coinSelectItems.map(c => ({
          value: c.short,
          icon: `Icon${c.short}`,
          image_url: c.image_url,
          title: `${formatter.capitalize(c.name)} (${c.short})`,
        }))
      : [];

    this.state = {
      coinsList,
    };
  }

  async componentDidMount() {
    const { actions, formData } = this.props;

    await actions.updateFormFields({
      filterTransactionsDate: formData.filterTransactionsDate || null,
      filterTransactionsType: formData.filterTransactionsType || [],
      filterTransactionsCoins: formData.filterTransactionsCoins || [],
    });
  }

  selectDateItem = async item => {
    const { actions } = this.props;
    await actions.updateFormField("filterTransactionsDate", item.value);
  };

  selectTypeItem = item => {
    const { actions, formData } = this.props;
    const { filterTransactionsType } = formData;

    if (item.value) {
      if (filterTransactionsType) {
        if (filterTransactionsType.includes(item.value)) {
          const newFilter = filterTransactionsType;
          newFilter.splice(newFilter.indexOf(item.value), 1);
          actions.updateFormField("filterTransactionsType", newFilter);
        } else {
          actions.updateFormField("filterTransactionsType", [
            ...filterTransactionsType,
            item.value,
          ]);
        }
      }
    } else {
      actions.updateFormField("filterTransactionsType", []);
    }
  };

  selectCoinItem = item => {
    const { actions, formData } = this.props;
    const { filterTransactionsCoins } = formData;

    if (item.value) {
      if (filterTransactionsCoins) {
        if (filterTransactionsCoins.includes(item.value)) {
          const newFilter = filterTransactionsCoins;
          newFilter.splice(newFilter.indexOf(item.value), 1);
          actions.updateFormField("filterTransactionsCoins", newFilter);
        } else {
          actions.updateFormField("filterTransactionsCoins", [
            ...filterTransactionsCoins,
            item.value,
          ]);
        }
      }
    } else {
      actions.updateFormField("filterTransactionsCoins", []);
    }
  };

  applyFilters = async () => {
    const { actions, formData } = this.props;

    await actions.getAllTransactions({
      coin: formData.filterTransactionsCoins,
      type: formData.filterTransactionsType,
      period: formData.filterTransactionsDate,
    });
    actions.closeModal();
  };

  renderDateList = () => {
    const { formData } = this.props;
    const { filterTransactionsDate } = formData;
    const style = TransactionFilterModalStyle();

    return (
      <View style={style.allFiltersContainer}>
        <ExpandableItem
          heading={"DATE"}
          isExpanded
          margin={"0 20 0 20"}
          childrenStyle={{ marginTop: 20, marginBottom: 20 }}
        >
          <FlatList
            keyExtractor={i => i.value}
            data={TRANSACTION_FILTER_DATE}
            extraData={formData}
            renderItem={({ item }) => {
              let isActive = filterTransactionsDate === item.value;
              isActive = isActive || (!item.value && !filterTransactionsDate);
              return (
                <TransactionsFilterItem
                  item={item}
                  onPress={this.selectDateItem}
                  isActive={isActive}
                />
              );
            }}
          />
        </ExpandableItem>
      </View>
    );
  };

  renderTransactionTypeList = () => {
    const { formData } = this.props;
    const { filterTransactionsType } = formData;
    const style = TransactionFilterModalStyle();
    return (
      <View style={style.allFiltersContainer}>
        <ExpandableItem
          heading={"TRANSACTION TYPE"}
          isExpanded
          margin={"0 20 0 20"}
          childrenStyle={{ marginTop: 20, marginBottom: 20 }}
        >
          <FlatList
            keyExtractor={i => i.value}
            data={TRANSACTION_FILTER_TYPE}
            extraData={formData}
            renderItem={({ item }) => {
              let isActive =
                filterTransactionsType &&
                filterTransactionsType.includes(item.value);
              const areAllTypesSelected =
                !item.value &&
                ((filterTransactionsType && !filterTransactionsType.length) ||
                  !filterTransactionsType);
              isActive = isActive || areAllTypesSelected;
              return (
                <TransactionsFilterItem
                  item={item}
                  onPress={this.selectTypeItem}
                  isActive={isActive}
                />
              );
            }}
          />
        </ExpandableItem>
      </View>
    );
  };

  renderCoinsList = () => {
    const style = TransactionFilterModalStyle();
    const { coinsList } = this.state;
    const { formData } = this.props;
    const { filterTransactionsCoins } = formData;

    return (
      <View style={style.allFiltersContainer}>
        <View
          style={{
            width: widthPercentageToDP("80%"),
            alignSelf: "center",
          }}
        >
          <Separator text={"COINS"} margin={"0 0 20 0"} />
        </View>
        <FlatList
          keyExtractor={i => i.value}
          data={coinsList}
          extraData={formData}
          renderItem={({ item }) => {
            let isActive =
              filterTransactionsCoins &&
              filterTransactionsCoins.includes(item.value);
            const areAllCoinsSelected =
              !item.value &&
              ((filterTransactionsCoins && !filterTransactionsCoins.length) ||
                !filterTransactionsCoins);
            isActive = isActive || areAllCoinsSelected;

            return (
              <TransactionsFilterItem
                item={item}
                onPress={this.selectCoinItem}
                isActive={isActive}
              />
            );
          }}
        />
      </View>
    );
  };

  render() {
    const style = TransactionFilterModalStyle();
    return (
      <CelModal
        style={style.container}
        name={MODALS.TRANSACTION_FILTER_MODAL}
        maxHeight={"92%"}
      >
        <ScrollView>
          {this.renderDateList()}
          {this.renderTransactionTypeList()}
          {this.renderCoinsList()}
        </ScrollView>
        <View style={style.buttonsWrapper}>
          <CelModalButton onPress={() => this.applyFilters()}>
            Apply
          </CelModalButton>
        </View>
      </CelModal>
    );
  }
}

export default TransactionFilterModal;
