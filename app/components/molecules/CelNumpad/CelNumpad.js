import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import { withNavigationFocus } from "react-navigation";

import {
  KEYBOARD_TYPE,
  KEYPAD_PURPOSES,
} from "../../../constants/UI";
import Constants from "../../../../constants";

const { STORYBOOK } = Constants;


const KEYBOARDS = {
  [KEYPAD_PURPOSES.WITHDRAW]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.VERIFICATION]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.CELPAY]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.AMOUNT]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.INTEREST_CALCULATOR]: KEYBOARD_TYPE.NUMERIC,
  [KEYPAD_PURPOSES.BORROW]: KEYBOARD_TYPE.NUMBER_PAD,
  [KEYPAD_PURPOSES.BUY_COINS]: KEYBOARD_TYPE.NUMERIC,
};

class CelNumpad extends Component {
  static propTypes = {
    field: PropTypes.string,
    autofocus: PropTypes.bool,
    value: PropTypes.string,
    onPress: PropTypes.func,
    updateFormField: PropTypes.func.isRequired,
    setKeypadInput: PropTypes.func.isRequired,
    toggleKeypad: PropTypes.func.isRequired,
    purpose: PropTypes.string.isRequired,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    autofocus: true,
    value: "",
  };

  componentDidMount = () => {
    const { setKeypadInput } = this.props;
    if (this.inputRef) {
      setKeypadInput(this.inputRef);
    }
  };

  componentDidUpdate(prevProps) {
    const { isFocused, setKeypadInput } = this.props;

    if (prevProps.isFocused === true && isFocused === false) {
      setKeypadInput(false);
    }
    if (prevProps.isFocused === false && isFocused === true) {
      setKeypadInput(this.inputRef);
    }
  }

  componentWillUnmount = () => {
    const { setKeypadInput } = this.props;
    setKeypadInput(false);
  };

  changeInputText = text => {
    const { value, onPress, updateFormField, field } = this.props;

    let newValue;
    if (text.includes(".") && text.includes(",")) {
      newValue = value;
    } else {
      newValue = text.replace(",", ".");
    }

    if (onPress) {
      onPress(newValue);
    } else {
      updateFormField(field, newValue);
    }
  };

  pressButton(button) {
    const { updateFormField, onPress, field, value } = this.props;

    let newValue = value;

    if (button === "<") {
      newValue = value.toString().slice(0, -1);
    } else if (button === ".") {
      if (!value) {
        newValue = ".";
      } else if (!value.toString().includes(".")) {
        newValue = `${value}${button}`;
      } else {
        newValue = value;
      }
    } else if (!isNaN(button)) {
      // Number pressed
      if (value) {
        newValue = `${value}${button}`;
      } else {
        newValue = button;
      }
    }

    if (onPress) {
      onPress(newValue);
    } else {
      updateFormField(field, newValue);
    }
  }

  render() {
    const { purpose, value, isFocused, autofocus, editable } = this.props;

    if (!isFocused) return null;

    return (
      <TextInput
        style={{ opacity: 0, position: "absolute" }}
        value={value || ""}
        onChangeText={this.changeInputText}
        keyboardType={KEYBOARDS[purpose]}
        ref={input => {
          this.inputRef = input;
        }}
        autoFocus={!STORYBOOK ? autofocus : false}
        editable={editable}
      />
    );
  }
}

export default withNavigationFocus(CelNumpad);
