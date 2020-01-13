import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import MultiInfoCardStyle from "./MultiInfoCard.styles";
import CelText from "../../atoms/CelText/CelText";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import Icon from "../../atoms/Icon/Icon";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";

class MultiInfoCard extends Component {
  static propTypes = {
    darkImage: PropTypes.number,
    lightImage: PropTypes.number,
    textButton: PropTypes.string,
    explanationOne: PropTypes.string,
    explanationTwo: PropTypes.string,
    explanationThree: PropTypes.string,
    navigateTo: PropTypes.func,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };
    // binders
  }

  // lifecycle methods
  // event hanlders
  // rendering methods
  render() {
    const {
      darkImage,
      lightImage,
      textButton,
      explanationOne,
      explanationTwo,
      explanationThree,
      navigateTo,
    } = this.props;

    const style = MultiInfoCardStyle();
    return (
      <Card styles={style.cardWrapper} onPress={navigateTo}>
        <ThemedImage
          style={style.image}
          darkSource={darkImage}
          lightSource={lightImage}
        />
        <View>
          <View style={style.buttonWrapper}>
            <CelText
              weight={"500"}
              type={"H3"}
              color={STYLES.COLORS.CELSIUS_BLUE}
              margin={"10 0 0 0"}
            >
              {textButton}
            </CelText>
            <Icon
              width={widthPercentageToDP("5%")}
              height={heightPercentageToDP("2%")}
              name={"IconChevronRight"}
              fill={STYLES.COLORS.SEMI_GRAY}
              style={style.icon}
            />
          </View>
          {explanationOne && (
            <CelText weight={"200"} type={"H4"}>
              {explanationOne}
            </CelText>
          )}
          {explanationTwo && (
            <CelText
              weight={"200"}
              type={"H4"}
              margin={explanationThree ? "0 0 0 0" : "0 0 20 0"}
            >
              {explanationTwo}
            </CelText>
          )}
          {explanationThree && (
            <CelText weight={"200"} type={"H4"} margin={"0 0 20 0"}>
              {explanationThree}
            </CelText>
          )}
        </View>
      </Card>
    );
  }
}

export default MultiInfoCard;
