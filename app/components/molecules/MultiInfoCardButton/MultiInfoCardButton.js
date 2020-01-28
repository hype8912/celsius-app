import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import MultiInfoCardStyle from "./MultiInfoCardButton.styles";
import CelText from "../../atoms/CelText/CelText";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import Badge from "../../atoms/Badge/Badge";

class MultiInfoCardButton extends Component {
  static propTypes = {
    darkImage: PropTypes.number,
    lightImage: PropTypes.number,
    textButton: PropTypes.string,
    explanation: PropTypes.string,
    onPress: PropTypes.func,
    isActive: PropTypes.bool,
  };
  static defaultProps = {};

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
      isActive
    } = this.props;

    const style = MultiInfoCardStyle();
    return (
      <Card onPress={onPress} padding={"20 20 20 10"}>
        <View style={style.cardWrapper}>
          <View style={style.imageWrapper}>
            <ThemedImage
              style={style.image}
              darkSource={darkImage}
              lightSource={lightImage}
            />
          </View>
          <View style={style.explanationWrapper}>
              <CelText
                weight={"500"}
                type={"H3"}
                color={STYLES.COLORS.CELSIUS_BLUE}
                margin={"0 0 0 0"}
              >
                {textButton}
              </CelText>
            {isActive ? (
              <View style={style.active}>
                <Badge
                  color={STYLES.COLORS.GREEN}
                  style={{ alignItems: "flex-start" }}
                >
                  <CelText type="H5" color="white">
                    Currently active
                  </CelText>
                </Badge>
              </View>
            ) : null}
            {!!explanation && (
              <CelText weight={"200"} type={"H4"} align={"left"} margin={"10 0 0 0"}>
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
