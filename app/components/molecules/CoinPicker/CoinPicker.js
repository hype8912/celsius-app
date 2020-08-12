import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CelText from "../../atoms/CelText/CelText";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import CoinPickerStyle from "./CoinPicker.styles";
import Icon from "../../atoms/Icon/Icon";
import { COLOR_KEYS } from "../../../constants/COLORS";

class CoinPicker extends Component {
  static propTypes = {
    updateFormField: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    coin: PropTypes.string,
    defaultSelected: PropTypes.string,
    availableCoins: PropTypes.instanceOf(Array).isRequired,
    navigateTo: PropTypes.func.isRequired,
    type: PropTypes.oneOf(["basic", "withIcon"]),
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: "basic",
    coin: "",
    defaultSelected: "",
  };

  constructor(props) {
    super(props);

    const { type, coin, availableCoins } = props;

    let coinListFormatted = [];
    if (type === "withIcon") {
      if (coin !== "USD" && availableCoins)
        availableCoins.forEach(c => {
          if (c.value !== "USD") coinListFormatted.push(c);
        });
      if (coin === "USD")
        coinListFormatted.push({ label: "Dollar (USD)", value: "USD" });
    } else {
      coinListFormatted = availableCoins;
    }

    this.state = {
      coinListFormatted,
    };
  }

  componentDidMount() {
    const { updateFormField, field, defaultSelected, onChange } = this.props;

    if (defaultSelected) {
      if (onChange) {
        onChange(field, defaultSelected);
      }
      updateFormField(field, defaultSelected);
    }
  }

  getIconColor = style => StyleSheet.flatten(style.iconColor).color;

  renderByType = () => {
    const { type, coin, navigateTo, field, onChange } = this.props;
    const { coinListFormatted } = this.state;
    const iconColor = this.getIconColor(CoinPickerStyle());
    const style = CoinPickerStyle();
    const icon = coin ? `Icon${coin}` : "StackedCoins";
    const label = coin
      ? coinListFormatted.find(c => c.value === coin) &&
        coinListFormatted.find(c => c.value === coin).label
      : "Choose a coin";

    switch (type) {
      case "withIcon":
        return (
          <View>
            <TouchableOpacity
              onPress={() =>
                navigateTo("SelectCoin", { coinListFormatted, onChange, field })
              }
              style={style.coinPicking}
              disabled={coin === "USD"}
            >
              <View>
                {coin === "USD" ? (
                  <View style={[style.circleWrapper]}>
                    <CelText color={iconColor} weight={"300"} type={"H2"}>
                      $
                    </CelText>
                  </View>
                ) : (
                  <CircleButton
                    iconSize={30}
                    style={style.circleButton}
                    type="coin"
                    icon={icon}
                    disabled
                    iconColor={COLOR_KEYS.HEADLINE}
                  />
                )}
              </View>
              <View style={style.iconStyle}>
                <CelText
                  type="H3"
                  margin={"10 0 10 0"}
                  style={{ paddingRight: 10 }}
                >
                  {label}
                </CelText>
                {coin !== "USD" && (
                  <Icon
                    width="13"
                    height="13"
                    name="CaretDown"
                    fill={COLOR_KEYS.HEADLINE}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        );

      case "basic":
        return (
          <View style={style.selectWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigateTo("SelectCoin", { coinListFormatted, onChange, field })
              }
            >
              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
              >
                <CelText type="H3" style={{ paddingRight: 10 }}>
                  {label}
                </CelText>
                <Icon
                  width="13"
                  height="13"
                  name="CaretDown"
                  fill={COLOR_KEYS.HEADLINE}
                />
              </View>
            </TouchableOpacity>
          </View>
        );

      default:
        break;
    }
  };

  render() {
    const CoinPickerByType = this.renderByType;
    return <CoinPickerByType />;
  }
}

export default CoinPicker;
