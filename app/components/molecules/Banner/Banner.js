import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";

import BannerStyle from "./Banner.styles";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import Icon from "../../atoms/Icon/Icon";
import { getColor, widthPercentageToDP } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    image: PropTypes.string,
    imageStyle: PropTypes.instanceOf(Object),
    close: PropTypes.func,
    noClose: PropTypes.bool,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
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
      imageStyle,
      close,
      noClose,
    } = this.props;
    const style = BannerStyle();
    return (
      <View style={[style.container, { backgroundColor }]}>
        {!noClose && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              top: 5,
              width: 40,
              height: 40,
              zIndex: 1,
            }}
            onPress={close}
          >
            <Icon
              name="Close"
              fill={"white"}
              width={`${widthPercentageToDP("6%")}`}
              height={`${widthPercentageToDP("6%")}`}
            />
          </TouchableOpacity>
        )}
        <View style={style.circleWrapper}>
          <Image style={[style.image, imageStyle]} source={image} />

          <View style={style.halfCircle} />
        </View>
        <View style={style.textAlignment}>
          <CelText
            color={"white"}
            type={"H4"}
            weight={"500"}
            margin={"20 0 0 0"}
          >
            {title}
          </CelText>
          {!!info && (
            <CelText
              color={"white"}
              type={"H7"}
              weight={"300"}
              margin={"15 0 0 0"}
            >
              {info}
            </CelText>
          )}
          <CelText
            color={"white"}
            type={"H6"}
            weight={"300"}
            margin={"10 0 15 0"}
          >
            {content}
          </CelText>
          <View style={style.buttonsWrapper}>
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
                  margin={"7 0 0 10"}
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
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
