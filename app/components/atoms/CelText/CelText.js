import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import {
  getMargins,
  getScaledFont,
  getFontFamily,
  getThemeFontFamily,
  getFontSize,
} from "../../../utils/styles-util";
import CelTextStyle from "./CelText.styles";
import { THEMES } from "../../../constants/UI";

class CelText extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["H0", "H1", "H2", "H3", "H4", "H5", "H6", "H7"]),
    font: PropTypes.oneOf(["Pangram", "Barlow", "RobotoMono"]),
    weight: PropTypes.oneOf([
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "thin",
      "extra-light",
      "light",
      "regular",
      "medium",
      "semi-bold",
      "bold",
      "extra-bold",
      "black",
    ]),
    italic: PropTypes.bool,
    color: PropTypes.string,
    margin: PropTypes.string,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.instanceOf(Object),
    ]),
    align: PropTypes.oneOf(["auto", "left", "right", "center", "justify"]),
    allCaps: PropTypes.bool,
    onPress: PropTypes.func,
    size: PropTypes.number,
    strikethrough: PropTypes.bool,
    theme: PropTypes.oneOf(Object.values(THEMES)),
    link: PropTypes.bool,
    underline: PropTypes.bool,
  };
  static defaultProps = {
    type: "H5",
    margin: "0 0 0 0",
    style: {},
    align: "left",
    allCaps: false,
    italic: false,
    strikethrough: false,
    link: false,
    underline: false,
  };

  getFontSize = () => {
    const { type, font, size } = this.props;
    const baseFontFamily = font || getThemeFontFamily();

    // NOTE(fj): Check usage of size
    const fontSize = size
      ? { fontSize: getScaledFont(size), lineHeight: getScaledFont(size) }
      : { fontSize: getFontSize(type, baseFontFamily) };

    return fontSize;
  };

  getFontWeightForType(type) {
    if (type === "H1") return "bold";
    return "regular";
  }

  getFontFamily = () => {
    const { font, weight, type, italic } = this.props;

    const fontWeightType = weight || this.getFontWeightForType(type);
    let fontFamily = getFontFamily(fontWeightType, font);

    // NOTE(fj): Pangram doesn't have italic text
    if (italic && getThemeFontFamily() === "Barlow") {
      fontFamily =
        fontFamily !== "Barlow-Regular"
          ? `${fontFamily}Italic`
          : `Barlow-Italic`;
    }

    return fontFamily;
  };

  getTextColor = () => {
    const { color, link, type } = this.props;
    const cmpStyle = CelTextStyle();

    if (color) return { color };

    let textColor = cmpStyle[type] ? cmpStyle[type].color : cmpStyle.text.color;

    if (link) {
      textColor = cmpStyle.link.color;
    }

    return { color: textColor };
  };

  getFontStyle = () => {
    const { margin, align, strikethrough, theme, link, underline } = this.props;
    const cmpStyle = CelTextStyle(theme);
    const fontSize = this.getFontSize();
    const fontFamily = { fontFamily: this.getFontFamily() };
    const colorStyle = this.getTextColor();
    const marginStyle = getMargins(margin);
    const alignStyle = { textAlign: align };
    const linkStyle = link ? cmpStyle.link : null;
    let decorationStyle;
    if (strikethrough) {
      decorationStyle = {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
      };
    } else if (underline) {
      decorationStyle = { textDecorationLine: "underline" };
    } else {
      decorationStyle = null;
    }
    return [
      cmpStyle.text,
      colorStyle,
      fontSize,
      fontFamily,
      marginStyle,
      alignStyle,
      decorationStyle,
      linkStyle,
    ];
  };

  // Greatest Bolognese Ever! CN-4818
  parseText() {
    const { children } = this.props;

    if (typeof children === "string") {
      let text = children;
      text = text.replace("MCDAI", "PLACEHOLDER1");
      text = text.replace("ollateral DAI", "PLACEHOLDER2");
      text = text.replace("DAI", "SAI");
      text = text.replace("PLACEHOLDER1", "DAI");
      text = text.replace("PLACEHOLDER2", "ollateral DAI");
      return text;
    }

    return children;
  }

  render() {
    const { style, allCaps, onPress } = this.props;
    const fontStyle = this.getFontStyle();

    return (
      <Text style={[fontStyle, style]} onPress={onPress}>
        {allCaps ? this.parseText().toUpperCase() : this.parseText()}
      </Text>
    );
  }
}

export default CelText;
