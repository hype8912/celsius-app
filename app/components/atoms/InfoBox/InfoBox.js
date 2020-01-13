import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import Icon from "../Icon/Icon";

import { THEMES } from "../../../constants/UI";
// import InfoBoxStyle from "./InfoBox.styles";

import {
  heightPercentageToDP,
  widthPercentageToDP,
  getPadding,
} from "../../../utils/styles-util";
import CelText from "../CelText/CelText";
import STYLES from "../../../constants/STYLES";

class InfoBox extends Component {
  static propTypes = {
    margin: PropTypes.string,
    padding: PropTypes.string,
    color: PropTypes.string,
    onPress: PropTypes.func,
    theme: PropTypes.oneOf(Object.values(THEMES)),
    size: PropTypes.oneOf(["full", "half"]),
    titleText: PropTypes.string,
    boldText: PropTypes.string,
    infoText: PropTypes.string,
    right: PropTypes.bool,
    left: PropTypes.bool,
    backgroundColor: PropTypes.string,
    triangle: PropTypes.bool,
    opened: PropTypes.bool,
    explanationText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.component,
    ]),
  };

  static defaultProps = {
    padding: "20 20 20 20",
    triangle: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  renderLargeInfoBox() {
    const { open } = this.state;
    const o = !open;
    this.setState({
      open: o,
    });
  }

  render() {
    const {
      left,
      right,
      triangle,
      children,
      titleText,
      boldText,
      color,
      explanationText,
      backgroundColor,
      padding,
    } = this.props;
    const { open } = this.state;
    const paddingStyle = getPadding(padding);
    const rotate = open ? "0deg" : "180deg";

    if (triangle) {
      return (
        <TouchableOpacity
          style={[
            {
              width: "100%",
              backgroundColor,
              borderRadius: 8,
              marginTop: 10,
              marginBottom: 10,
            },
            { ...paddingStyle },
          ]}
          onPress={() => this.renderLargeInfoBox()}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingHorizontal: 12,
            }}
          >
            {left && (
              <View style={{ paddingRight: 20 }}>
                <Icon
                  name="WarningCircle"
                  height="29"
                  width="29"
                  fill={STYLES.COLORS.WHITE}
                />
              </View>
            )}
            <CelText type={"H4"} style={{ color, paddingRight: 20 }}>
              {titleText}
            </CelText>
            <View>{children}</View>
            {right && (
              <View style={{ paddingLeft: 20 }}>
                <Icon
                  name="WarningCircle"
                  width="23"
                  height="23"
                  stroke={backgroundColor}
                  fill={color}
                />
              </View>
            )}
            {triangle && (
              <View style={{ paddingLeft: 20 }}>
                <View
                  style={{
                    width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    marginTop: heightPercentageToDP("0.5%"),
                    borderLeftWidth: widthPercentageToDP("1.5%"),
                    borderRightWidth: widthPercentageToDP("1.5%"),
                    borderBottomWidth: widthPercentageToDP("1.5%"),
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: "white",
                    transform: [{ rotate }],
                  }}
                />
              </View>
            )}
          </View>
          {triangle && open && (
            <View
              style={{
                marginTop: 20,
                width: "100%",
                jutifyContetn: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <CelText
                type={"H5"}
                style={{
                  color,
                  width: "90%",
                  paddingBottom: heightPercentageToDP("2%"),
                }}
              >
                {explanationText}{" "}
                <CelText type={"H5"} weight={"700"} color={STYLES.COLORS.WHITE}>
                  {boldText}
                </CelText>
              </CelText>
            </View>
          )}
        </TouchableOpacity>
      );
    }

    return (
      <View
        style={[
          {
            width: "100%",
            backgroundColor,
            borderRadius: 8,
            marginTop: 10,
            marginBottom: 10,
          },
          { ...paddingStyle },
        ]}
      >
        {!!titleText && (
          <CelText type={"H4"} weight={"400"} style={{ color }}>
            {titleText}{" "}
            <CelText type={"H4"} weight={"600"} color="white">
              {boldText}
            </CelText>
          </CelText>
        )}
        <View>{children}</View>
      </View>
    );
  }
}

export default InfoBox;
