import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import CelText from "../../atoms/CelText/CelText";
import SelectCoinStyle from "./SelectCoin.styles";
import Icon from "../../atoms/Icon/Icon";
import { THEMES } from "../../../constants/UI";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { getColor, getTheme } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import formatter from "../../../utils/formatter";

@connect(
  state => ({
    formData: state.forms.formData,
    currencies: state.currencies.rates,
    activeScreen: state.nav.activeScreen,
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

      const allCoins =
        coinListFormatted &&
        coinListFormatted.map(coin => {
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

      newState.filteredCoins =
        allCoins &&
        allCoins.filter(
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

    this.state = {
      filteredCoins: {},
    };
  }

  componentDidMount() {
    const { currencies, navigation } = this.props;
    const coinListFormatted = navigation.getParam("coinListFormatted");

    const allCoins =
      coinListFormatted &&
      coinListFormatted.map(coin => {
        return {
          ...coin,
          image: getImageForCrypto(coin, currencies),
        };
      });
    this.setState({
      filteredCoins: allCoins,
    });
  }

  getSelectStyle = (style, isActive = false) => {
    const itemStyle = [style.item];

    if (isActive) {
      itemStyle.push({
        backgroundColor: getColor(COLOR_KEYS.CARDS),
      });
    }
    return itemStyle;
  };

  renderIcon = item => {
    const theme = getTheme();
    const style = SelectCoinStyle();

    if (theme !== THEMES.DARK && item.image) {
      return (
        <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
      );
    }

    if (theme === THEMES.DARK && item.image) {
      return <Icon name={`Icon${item.value}`} height={30} width={30} />;
    }

    return (
      <View style={style.iconCircle}>
        <Icon
          name={`Icon${item.value}`}
          fill={COLOR_KEYS.BACKGROUND}
          height={30}
          width={30}
        />
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { actions, formData, navigation, activeScreen } = this.props;
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
            actions.updateFormFields({
              [field]: item.value,
              search: "",
            });
            if (activeScreen === "SelectCoin") {
              actions.navigateBack();
            }
          }}
        >
          <View style={itemStyle}>
            <View style={style.left}>
              {this.renderIcon(item)}
              <CelText style={{ paddingLeft: 10 }}>{formatter.capitalize(item.label)}</CelText>
            </View>
            {isActive && (
              <View style={style.right}>
                <Icon width="26" height="26" name="GreenCheck" />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  render() {
    const { filteredCoins } = this.state;

    return (
      <RegularLayout>
        <View>
          {filteredCoins && filteredCoins.length > 0 ? (
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
