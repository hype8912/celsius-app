import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";

import CelModalButtonStyle from "./CelModalButton.styles";
import CelText from "../CelText/CelText";
import Spinner from "../Spinner/Spinner";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class CelModalButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(["single", "middle", "left", "right"]).isRequired,
    onPress: PropTypes.func,
    buttonStyle: PropTypes.oneOf([
      "basic",
      "secondary",
      "disabled",
      "red",
      "green",
      "white",
    ]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
  };
  static defaultProps = {
    buttonStyle: "basic",
    position: "single",
  };

  handleButtonStyle = () => {
    const { buttonStyle } = this.props;
    const style = CelModalButtonStyle();
    switch (buttonStyle) {
      case "secondary":
        return style.secondaryButtonStyle;
      case "red":
        return style.redButtonStyle;
      case "disabled":
        return style.disabledButtonStyle;
      case "green":
        return style.greenButtonStyle;
      case "white":
        return style.whiteButtonStyle;
      default:
        return style.defaultButtonStyle;
    }
  };

  handleBorderRadius = () => {
    const { position } = this.props;

    switch (position) {
      case "single":
        return {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        };
      case "left":
        return {
          borderBottomLeftRadius: 8,
        };
      case "right":
        return {
          borderBottomRightRadius: 8,
        };
      default:
        return null;
    }
  };

  render() {
    const { children, onPress, buttonStyle, loading, disabled } = this.props;
    const style = CelModalButtonStyle();
    const borderRadius = this.handleBorderRadius();
    const buttonColor = this.handleButtonStyle();

    return (
      <View style={style.container}>
        <TouchableOpacity
          style={[style.buttonStyle, borderRadius, buttonColor]}
          onPress={buttonStyle !== "disabled" ? onPress : null}
          disabled={buttonStyle === "disabled" || loading || disabled}
        >
          {loading ? (
            <Spinner size={25} color={getColor(COLOR_KEYS.CARDS)} />
          ) : (
            <CelText color={buttonColor.color} type={"H4"} weight={"500"}>
              {children}
            </CelText>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

export default CelModalButton;
