import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Image } from "react-native";

import LoginButtonStyle from "./LoginButton.styles";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";

class LoginButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    text: "",
    onPress: () => {},
    disabled: false,
  };

  renderLoginButtonContent = () => {
    const { icon, text, disabled } = this.props;
    const style = LoginButtonStyle();
    const disabledStyle = disabled ? { opacity: 0.4 } : {};

    return (
      <>
        <View style={[style.container, disabledStyle]}>
          <View style={style.iconWrapper}>
            <Image source={icon} style={style.icon} />
          </View>
          <View style={{ flex: 5, justifyContent: "center" }}>
            <CelText
              type="H4"
              style={style.text}
              color={STYLES.COLORS.MEDIUM_GRAY}
            >
              {text}
            </CelText>
          </View>
          <View style={{ flex: 1 }} />
        </View>
      </>
    );
  };

  render() {
    const { onPress, disabled, text } = this.props;
    const LoginButtonContent = this.renderLoginButtonContent;

    if (text.includes("Twitter")) return <LoginButtonContent />;

    return (
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <LoginButtonContent />
      </TouchableOpacity>
    );
  }
}

export default LoginButton;
