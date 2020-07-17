import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import MultiInfoCardStyle from "./MultiInfoCardButton.styles";
import CelText from "../../atoms/CelText/CelText";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import Card from "../../atoms/Card/Card";
import Badge from "../../atoms/Badge/Badge";
import Icon from "../../atoms/Icon/Icon";
import {
  getColor,
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class MultiInfoCardButton extends Component {
  static propTypes = {
    darkImage: PropTypes.number,
    lightImage: PropTypes.number,
    textButton: PropTypes.string,
    explanation: PropTypes.string,
    onPress: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      darkImage,
      lightImage,
      textButton,
      explanation,
      onPress,
      label,
      disabled,
    } = this.props;

    const style = MultiInfoCardStyle();
    return (
      <Card onPress={onPress} padding={"20 20 20 10"} disabled={disabled}>
        <View style={style.cardWrapper}>
          <View style={style.imageWrapper}>
            <ThemedImage
              style={[style.image, disabled ? { opacity: 0.3 } : null]}
              darkSource={darkImage}
              lightSource={lightImage}
            />
          </View>
          <View style={style.explanationWrapper}>
            <View style={style.titleWrapper}>
              <CelText
                weight={"500"}
                type={"H3"}
                color={getColor(COLOR_KEYS.LINK)}
                margin={"0 0 0 0"}
                style={disabled ? { opacity: 0.3 } : null}
              >
                {textButton}
              </CelText>
              <Icon
                name={"IconChevronRight"}
                fill={COLOR_KEYS.LINK}
                height={heightPercentageToDP("2.5%")}
                width={widthPercentageToDP("3%")}
                style={style.chevronStyle}
              />
            </View>
            {label ? (
              <View style={style.active}>
                <Badge
                  color={getColor(COLOR_KEYS.POSITIVE_STATE)}
                  style={{ alignItems: "flex-start", opacity: 1, zIndex: 100 }}
                >
                  <CelText type="H6" color="white">
                    {label}
                  </CelText>
                </Badge>
              </View>
            ) : null}
            {!!explanation && (
              <CelText
                weight={"200"}
                type={"H4"}
                align={"left"}
                margin={"10 0 0 0"}
                style={disabled ? { opacity: 0.3 } : null}
              >
                {explanation}
              </CelText>
            )}
          </View>
        </View>
      </Card>
    );
  }
}

export default MultiInfoCardButton;
