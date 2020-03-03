import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import SelectCoinStyle from "./SelectCoin.styles";
import Separator from "../../atoms/Separator/Separator";
import Icon from "../../atoms/Icon/Icon";
import { THEMES } from "../../../constants/UI";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import STYLES from "../../../constants/STYLES";
import { getTheme } from "../../../utils/styles-util";

@connect(
  state => ({
    formData: state.forms.formData,
    walletSummary: state.wallet.summary,
    currencies: state.currencies.rates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class SelectCoin extends Component {
  static propTypes = {
    value: PropTypes.string,
  };
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Select Coin",
    right: "search",
  });

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.formData.search !== prevState.search) {
      const coinListFormatted = nextProps.navigation.getParam(
        "coinListFormatted"
      );

      const allCoins = coinListFormatted.map(coin => {
        return {
          ...coin,
          image: getImageForCrypto(coin, nextProps.currencies),
        };
      });

      const text =
        (nextProps.formData &&
          nextProps.formData.search &&
          nextProps.formData.search.toLowerCase()) ||
        "";

      newState.filteredCoins = allCoins.filter(
        coin =>
          coin.label.toLowerCase().includes(text) ||
          coin.value.toLowerCase().includes(text)
      );

      newState.search = nextProps.formData.search;
    }

    return newState;
  }

  constructor(props) {
    super(props);
    const coinListFormatted = props.navigation.getParam("coinListFormatted");

    const allCoins = coinListFormatted.map(coin => {
      return {
        ...coin,
        image: getImageForCrypto(coin, props.currencies),
      };
    });

    this.state = {
      filteredCoins: allCoins,
      search: "",
    };
  }

  getSelectStyle = (style, isActive = false) => {
    const theme = getTheme();
    const itemStyle = [style.item];

    if (isActive && theme !== THEMES.DARK) {
      itemStyle.push({ backgroundColor: STYLES.COLORS.WHITE });
    } else if (isActive && theme === THEMES.DARK) {
      itemStyle.push({ backgroundColor: STYLES.COLORS.DARK_GRAY3 });
    }
    return itemStyle;
  };

  renderItem = ({ item }) => {
    const { actions, formData, navigation } = this.props;
    const selectedCoin = formData.selectedCoin;
    const coin = formData.coin;
    const isActive = selectedCoin
      ? selectedCoin === item.value
      : coin === item.value;
    const style = SelectCoinStyle();
    const itemStyle = this.getSelectStyle(style, isActive);
    const field = navigation.getParam("field");
    const onChange = navigation.getParam("onChange");

    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => {
            if (onChange) {
              onChange(field, item.value);
            }
            actions.updateFormField(field, item.value);
            actions.navigateBack();
          }}
        >
          <View style={itemStyle}>
            <View style={style.left}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 30, height: 30 }}
              />
              <CelText style={{ paddingLeft: 10 }}>{item.label}</CelText>
            </View>
            {isActive && (
              <View style={style.right}>
                <Icon width="26" height="26" name="GreenCheck" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Separator />
      </React.Fragment>
    );
  };

  render() {
    const { filteredCoins } = this.state;

    return (
      <RegularLayout fabType="hide">
        <View>
          {filteredCoins.length > 0 ? (
            <FlatList
              data={filteredCoins}
              renderItem={this.renderItem}
              keyExtractor={index => index.label}
            />
          ) : (
            <View>
              <CelText>No coin match your search.</CelText>
            </View>
          )}
        </View>
      </RegularLayout>
    );
  }
}

function getImageForCrypto(coin, currencies) {
  const cryptoCoin = currencies.find(c => c.short === coin.value);
  return cryptoCoin && cryptoCoin.image_url;
}

export default SelectCoin;
