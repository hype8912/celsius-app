import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import SwitchButtonStyle from "./SwitchButton.styles";
import CelText from "../../atoms/CelText/CelText";
import { getMargins } from "../../../utils/styles-util";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";

class SwitchButton extends Component {
  static propTypes = {
    value: PropTypes.bool,
    margin: PropTypes.string,
    onPress: PropTypes.func,
    field: PropTypes.string,
    updateFormField: PropTypes.func,
  };
  static defaultProps = {
    margin: "20 0 0 0",
    value: false,
  };

  changeValue = value => {
    const { updateFormField, field } = this.props;
    updateFormField(field, value);
  };

  render() {
    const { children, margin, onPress, value } = this.props;
    const style = SwitchButtonStyle();
    return (
      <TouchableOpacity
        style={[style.container, { ...getMargins(margin) }]}
        onPress={onPress}
      >
        <CelText type="H4">{children}</CelText>
        <CelSwitch value={value} onValueChange={this.changeValue} />
      </TouchableOpacity>
    );
  }
}

export default SwitchButton;
