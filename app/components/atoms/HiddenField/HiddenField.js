import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { TextInput, TouchableOpacity, View } from "react-native";

import HiddenFieldStyle from "./HiddenField.styles";
import { KEYBOARD_TYPE } from "../../../constants/UI";
import Constants from "../../../../constants";
import * as appActions from "../../../redux/actions";

const {STORYBOOK} = Constants

@connect(
  state => ({
    formData: state.forms.formData
  }),
  dispatch => ({actions: bindActionCreators(appActions, dispatch)})
)
// function getCircleStyle(props, style, index) {
//   const circleStyle = [style.basicCircle];
//   if (props.value[index - 1]) circleStyle.push(style.activeCircle);
//   if (index === props.length && props.value[index - 1])
//     circleStyle.push(style.lastCircle);
//
//   if (!props.value[index - 1] && !props.error)
//     circleStyle.push({ opacity: 0.3 });
//
//   if (props.error) {
//     circleStyle.push(style.errorCircle);
//   }
//
//   return circleStyle;
// }

class HiddenField extends Component {
  static propTypes = {
    // value: PropTypes.string,
    handleVerification: PropTypes.func.isRequired,
    field: PropTypes.string.isRequired,
    length: PropTypes.number,
    error: PropTypes.bool,
    loading: PropTypes.bool,
    // updateFormField: PropTypes.func,
    shouldShow2FA: PropTypes.bool,
    // handleInputChange: PropTypes.func,
  }

  getCircleStyle = (props, style, index) => {
    const { formData, length, error } = this.props

    const value = formData.pin || formData.code || formData.pinConfirm || ""
    const circleStyle = [style.basicCircle];
    if (value[index - 1]) circleStyle.push(style.activeCircle);
    if (index === length && value[index - 1])
      circleStyle.push(style.lastCircle);

    if (!value[index - 1] && !props.error)
      circleStyle.push({ opacity: 0.3 });

    if (error) {
      circleStyle.push(style.errorCircle);
    }

    return circleStyle;
  }

  changeInputText = num => {
    const { actions, field, handleVerification } = this.props;

    if (num.length === 6) {
      handleVerification(num)
      actions.updateFormField(field, num);
      this.inputRef.clear()
    }
    actions.updateFormField(field, num);
  };

  render() {
    const style = HiddenFieldStyle();
    const circles = [];
    const {
      formData,
      length = 6,
      error,
    } = this.props
    const value = formData.pin || formData.code || formData.pinConfirm || ""
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
          onChangeText={(num) => this.changeInputText(num)}
          style={{height: 0, opacity: 0}}
          autoFocus={!STORYBOOK}
        />
      </View>
    )
  }
}

export default HiddenField;
