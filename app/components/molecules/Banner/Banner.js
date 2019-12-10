import React from "react";
import PropTypes from "prop-types";
import { Image, TouchableOpacity, View } from "react-native";

import BannerStyle from "./Banner.styles";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import STYLES from "../../../constants/STYLES";

const Banner = props => {
  const style = BannerStyle(props.theme);
  return (
    <View style={[style.container, { backgroundColor: props.backgroundColor }]}>
      <View style={style.mainWrapper}>
        <View style={style.halfCircleRight}>
          <Image style={style.image} source={props.image} />
        </View>
        <View>
          <View style={style.textAlignment}>
            <CelText
              color={"white"}
              type={"H4"}
              weight={"500"}
              margin={"0 0 0 0"}
            >
              {props.title}
            </CelText>
            {!!props.info && (
              <CelText
                color={"white"}
                type={"H7"}
                weight={"300"}
                margin={"8 0 0 0"}
              >
                {props.info}
              </CelText>
            )}
            <CelText
              color={"white"}
              type={"H6"}
              weight={"300"}
              margin={"8 0 15 0"}
            >
              {props.content}
            </CelText>
            {!!props.action && (
              <CelButton
                margin={"0 0 15 0"}
                color={"white"}
                size={"small"}
                onPress={props.action}
                textColor={props.backgroundColor}
              >
                {props.buttonText}
              </CelButton>
            )}
            {!!props.textButtonAction && (
              <TouchableOpacity onPress={props.textButtonAction}>
                <CelText
                  margin={"5 0 20 0"}
                  color={STYLES.COLORS.WHITE}
                  type={"H6"}
                >
                  {props.textButtonText}
                </CelText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  info: PropTypes.string,
  action: PropTypes.func,
  textButtonText: PropTypes.string,
  buttonText: PropTypes.string,
  textButtonAction: PropTypes.func,
  backgroundColor: PropTypes.string,
  image: PropTypes.number,
};

export default Banner;
