import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import STYLES from "../../../constants/STYLES";
import CelInputText from "./CelInputText";
import { THEMES } from "../../../constants/UI";
import CelText from "../CelText/CelText";

class CelInputPassword extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      "text",
      "password",
      "phone",
      "checkbox",
      "pin",
      "tfa",
      "number",
    ]),
    autoFocus: PropTypes.bool,
    // autoComplete: // android only
    disabled: PropTypes.bool,
    maxLenght: PropTypes.number,
    placeholder: PropTypes.string,
    keyboardType: PropTypes.oneOf([
      "default",
      "number-pad",
      "decimal-pad",
      "numeric",
      "email-address",
      "phone-pad",
    ]),
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
    style: PropTypes.oneOfType([
      PropTypes.instanceOf(Object),
      PropTypes.number,
    ]),
    autoCapitalize: PropTypes.oneOf([
      "none",
      "sentences",
      "words",
      "characters",
    ]),
    onChange: PropTypes.func, //
    autoCorrect: PropTypes.bool, //
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), //
    field: PropTypes.string.isRequired, //
    error: PropTypes.string, //
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };

  static defaultProps = {
    type: "text",
    keyboardType: "default",
    autoFocus: false,
    disabled: false,
    maxLenght: 100,
    autoCapitalize: "none",
    value: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      visible: false,
    };
  }

  render() {
    const { theme, value, disabled } = this.props;
    const { visible } = this.state;
    const fillColor =
      theme !== THEMES.DARK ? STYLES.COLORS.GRAY : STYLES.COLORS.WHITE;
    const iconName = visible ? "HIDE" : "SHOW";
    return (
      <React.Fragment>
        <CelInputText
          {...this.props}
          secureTextEntry={!visible}
          style={{ paddingRight: 15 }}
        />
        {!!value && !disabled && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 13,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => this.setState({ visible: !visible })}
          >
            <CelText type="H5" align={"center"} color={fillColor}>
              {iconName}
            </CelText>
          </TouchableOpacity>
        )}
      </React.Fragment>
    );
  }
}

export default CelInputPassword;
