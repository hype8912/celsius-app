import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import PredefinedAmountsStyle from "./PredefinedAmounts.styles";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";

class PredefinedAmounts extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Object),
    onSelect: PropTypes.func,
    activePeriod: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.string,
    ]),
  };
  static defaultProps = {};

  render() {
    const { data, onSelect, activePeriod } = this.props;
    const style = PredefinedAmountsStyle();

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 30,
        }}
      >
        {data.map(({ label, value }) => (
          <TouchableOpacity
            key={label}
            style={[
              style.periodButton,
              activePeriod.value === value ? style.selectedAmount : null,
            ]}
            onPress={() => onSelect({ label, value })}
          >
            <CelText
              style={activePeriod === label ? style.selectedAmountText : null}
            >
              {label === "ALL"
                ? "ALL"
                : `$${formatter.round(label, { precision: 0 })}`}
            </CelText>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default PredefinedAmounts;
