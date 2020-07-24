import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import CelText from "../../atoms/CelText/CelText";
import CircleButton from "../../atoms/CircleButton/CircleButton";
import CoinPickerStyle from "./CoinPicker.styles";
import Icon from "../../atoms/Icon/Icon";

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
    coin: "",
    defaultSelected: "",
  };

  constructor(props) {
    super(props);

    const { coin, availableCoins } = props;

    const coinListFormatted = [];

    if (coin !== "USD" && availableCoins)
      availableCoins.forEach(c => {
        if (c.value !== "USD") coinListFormatted.push(c);
      });
    if (coin === "USD")
      coinListFormatted.push({ label: "Dollar (USD)", value: "USD" });

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

  getIconColor = style => StyleSheet.flatten(style.iconColor).color; // get color from raw json depending on style theme

  renderByType = () => {
    const { type, coin, navigateTo, field, onChange } = this.props;
    const { coinListFormatted } = this.state;
    const iconColor = this.getIconColor(CoinPickerStyle());
    const style = CoinPickerStyle();
    const icon = coin ? `Icon${coin}` : "StackedCoins";
    if (!coinListFormatted) return null

    const label = coin
      ? coinListFormatted.find(c => c.value === coin).value
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
                  />
                )}
              </View>
              <View style={style.iconStyle}>
                <CelText
                  color={iconColor}
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
                    fill={iconColor}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        );

      case "basic":
        return (
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
              <Icon width="20" height="20" name={icon} fill={iconColor} />
              <CelText
                margin={"0 0 0 4"}
                type="H3"
                style={{ paddingRight: 10 }}
              >
                {label}
              </CelText>
              <Icon width="13" height="13" name="CaretDown" fill={iconColor} />
            </View>
          </TouchableOpacity>
        );
      case "basic2":
        return (
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
            <View style={[style.circleWrapper]}>
              <CelText color={iconColor} weight={"300"} type={"H7"}>
                $
              </CelText>
            </View>
            <CelText margin={"0 0 0 4"} type="H3" style={{ paddingRight: 10 }}>
              {label}
            </CelText>
            <Icon width="13" height="13" name="CaretDown" fill={iconColor} />
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
