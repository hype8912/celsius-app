import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput, TouchableOpacity, View } from "react-native";

import HiddenFieldStyle from "./HiddenField.styles";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import Constants from "../../../../constants";

const { STORYBOOK } = Constants;

class HiddenField extends Component {
  static propTypes = {
    value: PropTypes.string,
    length: PropTypes.number,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    updateFormField: PropTypes.func,
    shouldShow2FA: PropTypes.func,
    handle2FAChange: PropTypes.func,
    handlePINChange: PropTypes.func
  }

  getCircleStyle = (props, style, index) => {
    const circleStyle = [style.basicCircle];

    if (props.value[index - 1]) circleStyle.push(style.activeCircle);
    if (index === props.length && props.value[index - 1])
      circleStyle.push(style.lastCircle);

    if (!props.value[index - 1] && !props.error)
      circleStyle.push({ opacity: 0.3 });

    if (props.error) {
      circleStyle.push(style.errorCircle);
    }

    return circleStyle;
  }
  render() {
    const style = HiddenFieldStyle();
    const circles = [];
    const {
      value,
      length = 6,
      error,
      loading,
      updateFormField,
      shouldShow2FA,
      handle2FAChange,
      handlePINChange
    } = this.props

    function changeInputText(num) {
      updateFormField(shouldShow2FA() ? "code" : "pin", num);
      if (num && num.length === 6) {
        if (shouldShow2FA()) {
          handle2FAChange(num);
          return
        }
        handlePINChange(num)
      }
    };
    console.log({ value})
  ;
    let i = 1;
    while (i <= length) {
      circles.push(
        <View
          key={i}
          style={this.getCircleStyle({ value, length, error }, style, i)}
        />
      );
      i++;
    }

    return (
      <View>
        <TouchableOpacity style={style.wrapper} onPress={() => this.inputRef.focus()}>
          {circles}
        </TouchableOpacity>
        <TextInput
          keyboardType={KEYBOARD_TYPE.NUMBER_PAD}
          ref={input => {
            this.inputRef = input;
          }}
          onChangeText={(num) => changeInputText(num)}
          style={{height: 0, opacity: 0}}
          autoFocus={!STORYBOOK}
          editable={loading}
        />
      </View>
    )
  }

};

export default HiddenField;
