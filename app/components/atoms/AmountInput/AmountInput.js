import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from "react-native";

class AmountInput extends Component {
  static propTypes = {
    field: PropTypes.string,
    placeholder: PropTypes.string,
    updateFormField: PropTypes.func,
    onChange: PropTypes.func,
    style: PropTypes.instanceOf(Object),
    maxLength: PropTypes.number,
    autofocus: PropTypes.bool,
    keyboardType: PropTypes.string
  };

  handleChangeText = (text) => {
    const { onChange, field, updateFormField } = this.props
    let amount = text
    const lastCharacter = amount[amount.length - 1]
    // const validCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ","]

    if (lastCharacter === ",") {
      amount = amount.replace(",", ".");
    }

    // Don't allow non decimal numbers to start with zero
    // if (amount[0] === "0" && amount[1] !== "." || amount[1] !== ",") {
    //   // [amount.slice(0, 1), ".", amount.slice(1)].join("")
    //   amount = amount.slice(0, -1)
    // }


    // Don't allow amount to start with multiple zeros
    // if (amount[0] === '0' && amount[1] === '0') {
    //   amount = value
    // }


    // Don't allow multiple decimal dots
    // if (lastCharacter === '.' && amount.indexOf('.') !== amount.length - 1) {
    //   amount = value
    // }


    // Don't allow invalid characters
    // if (!validCharacters.includes(lastCharacter) && amount !== "") {
    //   amount = value
    // }

    if (onChange) {
      onChange(amount)
    } else {
      updateFormField(field, amount)
    }
  }

  render() {
    const { value, style, placeholder, maxLength, autofocus, keyboardType } = this.props
    return (
      <TextInput
        textAlign={"center"}
        keyboardType={keyboardType}
        autoFocus
        value={value}
        onChangeText={this.handleChangeText}
        style={[style, {paddingRight: 20}]}
        placeholder={placeholder}
        maxLength={maxLength}
        autofocus={autofocus}
      />
    );
  }
}

export default AmountInput
