import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  TextInput,
  UIManager,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";

import KeyboardShiftStyles from "./KeyboardShiftStyles";

const { State: TextInputState } = TextInput;
const styles = KeyboardShiftStyles();

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    style={styles.container}
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    <>{children}</>
  </TouchableWithoutFeedback>
);

class KeyboardShift extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    shift: new Animated.Value(0),
  };

  componentWillMount() {
    if (Platform.OS === "android") {
      this.keyboardDidShowSub = Keyboard.addListener(
        "keyboardDidShow",
        this.handleKeyboardDidShow
      );
      this.keyboardDidHideSub = Keyboard.addListener(
        "keyboardDidHide",
        this.handleKeyboardDidHide
      );
    } else if (Platform.OS === "ios") {
      this.keyboardDidShowSub = Keyboard.addListener(
        "keyboardWillShow",
        this.handleKeyboardDidShow
      );
      this.keyboardDidHideSub = Keyboard.addListener(
        "keyboardWillHide",
        this.handleKeyboardDidHide
      );
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowSub.remove();
    this.keyboardDidHideSub.remove();
  }

  handleKeyboardDidShow = event => {
    const { height: windowHeight } = Dimensions.get("window");
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();

    if (currentlyFocusedField) {
      UIManager.measure(
        currentlyFocusedField,
        (_originX, _originY, _width, height, _pageX, pageY) => {
          const fieldHeight = height + 20; // zbog bottom paddinga
          const fieldTop = pageY;
          const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing(this.state.shift, {
            toValue: gap,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      );
    }
  };

  handleKeyboardDidHide = () => {
    Animated.timing(this.state.shift, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { children } = this.props;
    const { shift } = this.state;

    return (
      <Animated.View
        style={[styles.container, { transform: [{ translateY: shift }] }]}
      >
        <DismissKeyboard>{children}</DismissKeyboard>
      </Animated.View>
    );
  }
}

export default KeyboardShift;
