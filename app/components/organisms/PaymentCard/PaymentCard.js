import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import PaymentCardsStyle from "./PaymentCard.styles";
import CelText from "../../atoms/CelText/CelText";
import Card from "../../atoms/Card/Card";
import ThemedImage from "../../atoms/ThemedImage/ThemedImage";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import Badge from "../../atoms/Badge/Badge";

class PaymentCard extends Component {
  static propTypes = {
    cardTitle: PropTypes.string,
    cardCopy: PropTypes.string,
    lightImage: PropTypes.number,
    darkImage: PropTypes.number,
    onPressAction: PropTypes.func,
    isActive: PropTypes.bool,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      cardTitle,
      cardCopy,
      lightImage,
      darkImage,
      onPressAction,
      isActive,
    } = this.props;
    const style = PaymentCardsStyle();

    return (
      <View style={style.container}>
        <Card onPress={onPressAction}>
          <View style={style.cardStyle}>
            <View style={[style.iconWrapper]}>
              <ThemedImage
                style={style.iconStyle}
                lightSource={lightImage}
                darkSource={darkImage}
              />
            </View>

            <View style={style.cardCopy}>
              <View style={{ flexDirection: "row" }}>
                <CelText
                  type={"H3"}
                  color={STYLES.COLORS.CELSIUS_BLUE}
                  margin={"0 0 10 0"}
                  weight={"500"}
                >
                  {cardTitle}
                </CelText>
                <Icon
                  name={"IconChevronRight"}
                  fill={STYLES.COLORS.GRAY}
                  height={15}
                  width={20}
                  style={{ marginTop: 10 }}
                />
              </View>
              {isActive ? (
                <View style={{ alignSelf: "flex-start" }}>
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
              <CelText type={"H4"} weight={"300"}>
                {cardCopy}
              </CelText>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

PaymentCard.propTypes = {
  style: PropTypes.instanceOf(Object),
  cardTitle: PropTypes.string,
  cardCopy: PropTypes.string,
  lightImage: PropTypes.number,
  darkImage: PropTypes.number,
};

export default PaymentCard;
