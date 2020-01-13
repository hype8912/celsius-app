import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import SeparatorStyle from "./Separator.styles";
import CelText from "../CelText/CelText";
import { getMargins, getTheme } from "../../../utils/styles-util";
import { THEMES } from "../../../constants/UI";
import STYLES from "../../../constants/STYLES";

class Separator extends Component {
  static propTypes = {
    text: PropTypes.string,
    vertical: PropTypes.bool,
    size: PropTypes.number,
    fontType: PropTypes.oneOf(["H1", "H2", "H3", "H4", "H5", "H6", "H7"]),
    allCaps: PropTypes.bool,
    dashed: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    textOpacity: PropTypes.number,
    margin: PropTypes.string,
    height: PropTypes.string,
    top: PropTypes.number,
  };
  static defaultProps = {
    vertical: false,
    size: 1,
    fontType: "H6",
    allCaps: true,
    dashed: false,
    color: "",
    opacity: 1,
    textOpacity: 1,
    margin: "0 0 0 0",
    height: "100%",
    top: 0,
  };

  getSeparatorColor = style => StyleSheet.flatten(style.separatorColor).color; // get color from raw json depending on style theme

  renderVertical = () => {
    const { size, color, dashed, opacity, margin, height, top } = this.props;
    const style = SeparatorStyle();
    const separatorColor = color || this.getSeparatorColor(style);
    const margins = getMargins(margin);

    return (
      <View
        style={[
          style.separatorVertical,
          {
            borderColor: separatorColor,
            width: size,
            borderWidth: size / 2,
            borderStyle: dashed ? "dashed" : "solid",
            opacity,
            height,
            top,
          },
          margins,
        ]}
      />
    );
  };

  renderLine = () => {
    const { size, color, dashed, opacity, margin } = this.props;
    const style = SeparatorStyle();
    const separatorColor = color || this.getSeparatorColor(style);
    const margins = getMargins(margin);

    return (
      <View
        style={[
          style.separator,
          {
            borderColor: separatorColor,
            borderWidth: size / 2,
            borderStyle: dashed ? "dashed" : "solid",
            opacity,
          },
          margins,
        ]}
      />
    );
  };

  renderWithText = () => {
    const {
      text,
      opacity,
      textOpacity,
      size,
      allCaps,
      fontType,
      color,
      dashed,
      margin,
    } = this.props;
    const style = SeparatorStyle();
    const separatorColor = color || this.getSeparatorColor(style);
    const margins = getMargins(margin);
    const theme = getTheme();

    return (
      <View style={[style.content, margins]}>
        <View
          style={[
            style.left,
            {
              borderColor: separatorColor,
              borderWidth: size / 2,
              borderStyle: dashed ? "dashed" : "solid",
              opacity,
            },
          ]}
        />
        <View style={[style.center, { opacity: textOpacity }]}>
          <CelText
            allCaps={allCaps}
            color={
              theme === THEMES.LIGHT
                ? STYLES.COLORS.MEDIUM_GRAY
                : STYLES.COLORS.WHITE_OPACITY5
            }
            align="center"
            type={fontType}
          >
            {text}
          </CelText>
        </View>
        <View
          style={[
            style.right,
            {
              borderColor: separatorColor,
              borderWidth: size / 2,
              borderStyle: dashed ? "dashed" : "solid",
              opacity,
            },
          ]}
        />
      </View>
    );
  };

  render() {
    const { text, vertical } = this.props;
    const VerticalSeparator = this.renderVertical;
    const HorizontalSeparator = this.renderLine;
    const TextSeparator = this.renderWithText;

    if (vertical) {
      return <VerticalSeparator />;
    }

    if (!text) {
      return <HorizontalSeparator />;
    }

    return <TextSeparator />;
  }
}

export default Separator;
