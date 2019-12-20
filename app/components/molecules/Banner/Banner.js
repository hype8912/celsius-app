import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";

import BannerStyle from "./Banner.styles";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";

class Banner extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    info: PropTypes.string,
    action: PropTypes.func,
    textButtonText: PropTypes.string,
    buttonText: PropTypes.string,
    textButtonAction: PropTypes.func,
    backgroundColor: PropTypes.string,
    image: PropTypes.number,
    close: PropTypes.func,
    type: PropTypes.string,
    steps: PropTypes.oneOf(["multi", "single"]),
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      types: ["referral", "loan"],
    };
  }

  render() {
    const {
      title,
      content,
      info,
      action,
      textButtonText,
      buttonText,
      textButtonAction,
      backgroundColor,
      image,
      close,
      type,
      steps,
    } = this.props;
    const { types } = this.state;
    const style = BannerStyle();

    return (
      <View style={[style.container, { backgroundColor }]}>
        <View style={style.mainWrapper}>
          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 0 }}
            onPress={close}
          >
            <Icon name="Close" fill={"white"} width="25" />
          </TouchableOpacity>
          <View style={style.halfCircleRight}>
            <Image style={style.image} source={image} />
          </View>
          <View style={style.textAlignment}>
            <View style={style.dotWrapper}>
              {type !== "kyc" && steps === "multi"
                ? types.map(d => (
                    <View
                      key={d}
                      style={[
                        style.dot,
                        {
                          backgroundColor:
                            d === type
                              ? STYLES.COLORS.WHITE
                              : STYLES.COLORS.WHITE_OPACITY5,
                        },
                      ]}
                    />
                  ))
                : null}
            </View>
            <CelText
              color={"white"}
              type={"H4"}
              weight={"500"}
              margin={"0 0 0 0"}
            >
              {title}
            </CelText>
            {!!info && (
              <CelText
                color={"white"}
                type={"H7"}
                weight={"300"}
                margin={"8 0 0 0"}
              >
                {info}
              </CelText>
            )}
            <CelText
              color={"white"}
              type={"H6"}
              weight={"300"}
              margin={"8 0 15 0"}
            >
              {content}
            </CelText>
            {!!action && (
              <CelButton
                margin={"0 0 15 0"}
                color={"white"}
                size={"small"}
                onPress={action}
                textColor={backgroundColor}
              >
                {buttonText}
              </CelButton>
            )}
            {!!textButtonAction && (
              <TouchableOpacity onPress={textButtonAction}>
                <CelText
                  margin={"5 0 20 0"}
                  color={STYLES.COLORS.WHITE}
                  type={"H6"}
                >
                  {textButtonText}
                </CelText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default Banner;
