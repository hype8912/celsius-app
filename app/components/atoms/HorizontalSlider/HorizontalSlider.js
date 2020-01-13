import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";

import HorizontalSliderStyle from "./HorizontalSlider.styles";
import STYLES from "../../../constants/STYLES";

class HorizontalSlider extends Component {
  static propTypes = {
    items: PropTypes.instanceOf(Array),
    field: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    updateFormField: PropTypes.func,
  };
  static defaultProps = {};

  handleChangeSlideValue = value => {
    const { onChange, updateFormField, field } = this.props;

    if (onChange) {
      onChange(field, value);
    } else {
      updateFormField(field, value);
    }
  };

  // lifecycle methods
  // event handlers
  // rendering methods
  render() {
    const { items, value } = this.props;
    const values = items.map(i => i.value);
    const style = HorizontalSliderStyle();

    return (
      <View style={style.container}>
        <Slider
          minimumTrackTintColor={STYLES.COLORS.CELSIUS_BLUE}
          maximumTrackTintColor={STYLES.COLORS.DARK_GRAY_OPACITY}
          thumbTintColor={STYLES.COLORS.CELSIUS_BLUE}
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={items.length - 1}
          step={1}
          value={values.indexOf(value)}
          onValueChange={step => this.handleChangeSlideValue(values[step])}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {items.map((item, index) => (
            <TouchableOpacity
              key={`value-${index}`}
              onPress={() => this.handleChangeSlideValue(item.value)}
              style={{
                marginTop: -12,
                height: 33,
                width: 30,
                alignItems: "center",
                justifyContent: "flex-end",
                zIndex: -1,
              }}
            >
              {item.label}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default HorizontalSlider;
