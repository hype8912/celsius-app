import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import CelButtonStyle from "./CelButton.styles";
import Icon from "../Icon/Icon";
import { getMargins } from "../../../utils/styles-util";
import CelText from "../CelText/CelText";
import Spinner from "../Spinner/Spinner";
import STYLES from "../../../constants/STYLES";
import userBehaviorUtil from "../../../utils/user-behavior-util";

const buttonSizes = ["small", "medium"];

class CelButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    iconRight: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    margin: PropTypes.string,
    basic: PropTypes.bool,
    size: PropTypes.oneOf(buttonSizes),
    textColor: PropTypes.string,
    iconRightHeight: PropTypes.string,
    iconRightWidth: PropTypes.string,
    iconRightColor: PropTypes.string,
    ghost: PropTypes.bool,
    textSize: PropTypes.string,
    color: PropTypes.oneOf(["green", "red", "white"]),
  };

  static defaultProps = {
    iconRight: undefined,
    disabled: false,
    loading: false,
    margin: "0 0 0 0",
    basic: false,
    size: "medium",
    textColor: "",
    iconRightHeight: "46",
    iconRightWidth: "26",
    ghost: false,
  };

  getButtonStyle = style => {
    const { margin, disabled, basic, size, ghost, color } = this.props;
    const buttonStyles = [style.container, style[`${size}Container`]];
    buttonStyles.push(getMargins(margin));
    if (color) buttonStyles.push(style[`${color}Button`]);
    if (disabled) buttonStyles.push(style.disabledButton);
    if (basic) buttonStyles.push(style.basicButton);
    if (ghost) buttonStyles.push(style.ghostButton);
    if (ghost && color) buttonStyles.push(style[`ghost${color}Button`]);
    if (basic && color) buttonStyles.push(style[`basic${color}Button`]);
    return buttonStyles;
  };

  getTitleStyle = style => {
    const {
      disabled,
      basic,
      size,
      textColor,
      ghost,
      textSize,
      color,
    } = this.props;
    const titleStyle = [style.baseTitle, textSize ? {} : style[`${size}Title`]];
    if (disabled) titleStyle.push(style.disabledTitleColor);
    if (basic) titleStyle.push(style.basicTitle);
    if (ghost) titleStyle.push(style.ghostTitle);
    if (basic && color) titleStyle.push(style[`basic${color}TitleButton`]);
    if (textColor) titleStyle.push({ color: textColor });

    return titleStyle;
  };

  handlePress = () => {
    const { onPress, children } = this.props;

    userBehaviorUtil.buttonPressed(children);
    onPress();
  };

  renderIconRight = () => {
    const {
      iconRight,
      basic,
      children,
      iconRightHeight,
      iconRightWidth,
      iconRightColor,
      disabled,
    } = this.props;
    let color;
    if (iconRightColor) {
      color = iconRightColor;
    } else if (basic) {
      color = STYLES.COLORS.DARK_GRAY_OPACITY;
    } else {
      color = disabled
        ? STYLES.COLORS.MEDIUM_GRAY
        : STYLES.COLORS.WHITE_OPACITY3;
    }

    return (
      <View
        style={{ paddingLeft: children ? 10 : 0, opacity: disabled ? 0.3 : 1 }}
      >
        <Icon
          name={iconRight}
          height={iconRightHeight}
          width={iconRightWidth}
          fill={color}
        />
      </View>
    );
  };

  renderLoader = () => {
    const style = CelButtonStyle();
    const buttonStyle = this.getButtonStyle(style);
    const titleStyle = this.getTitleStyle(style);

    // extracting color from styles array
    let spinnerColor = "white";
    titleStyle.forEach(ts => {
      if (ts.color) spinnerColor = ts.color;
    });

    return (
      <View style={buttonStyle}>
        <Spinner color={spinnerColor} opacity={1} size={30} />
      </View>
    );
  };

  renderButton = () => {
    const { children, iconRight, style, textSize } = this.props;
    const celBtnStyle = CelButtonStyle();
    const buttonStyle = this.getButtonStyle(celBtnStyle);
    const titleStyle = this.getTitleStyle(celBtnStyle);

    return (
      <View style={[buttonStyle, style]}>
        {!!children && (
          <CelText type={textSize} style={titleStyle}>
            {children}
          </CelText>
        )}
        {!!iconRight && this.renderIconRight()}
      </View>
    );
  };

  render() {
    const { disabled, loading, basic } = this.props;
    const Loader = this.renderLoader;
    const Button = this.renderButton;
    const activeOpacity = basic ? 0.3 : 0.8;

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        disabled={disabled || loading}
        activeOpacity={activeOpacity}
        style={{ alignItems: "center" }}
      >
        {loading ? <Loader /> : <Button />}
      </TouchableOpacity>
    );
  }
}

export default CelButton;
