import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from "react-native";
import { KEYBOARD_TYPE } from "../../../constants/UI";

class AmountInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    field: PropTypes.string,
    placeholder: PropTypes.string,
    updateFormField: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.instanceOf(Object),
    maxLength: PropTypes.number,
    autofocus: PropTypes.bool,
  };

  handleChangeText = (text) => {
    const { value, onChange, field, updateFormField } = this.props

    const lastCharacter = text[text.length - 1]
    let amount = text
    const validCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]

    // Don't allow amount to start with multiple zeros
    if (amount[0] === '0' && amount[1] === '0') {
      amount = value
    }

    // Don't allow multiple decimal dots
    if (lastCharacter === '.' && amount.indexOf('.') !== amount.length - 1) {
      amount = value
    }

    // Don't allow invalid characters
    if (!validCharacters.includes(lastCharacter) && amount !== "") {
      amount = value
    }

    if (onChange) {
      onChange(amount)
    } else {
      updateFormField(field, amount)
    }
  }

  render() {
    const { value, style, placeholder, maxLength, autofocus } = this.props
    return (
      <TextInput
        textAlign={"center"}
        keyboardType={KEYBOARD_TYPE.NUMERIC}
        autoFocus
        value={value}
        onChangeText={this.handleChangeText}
        style={style}
        placeholder={placeholder}
        maxLength={maxLength}
        autofocus={autofocus}
      />
    );
  }
}

export default AmountInput
