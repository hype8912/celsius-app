import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import { getTheme } from "../../../utils/styles-util";
import ToggleInfoCardStyle from "./ToggleInfoCard.styles";
import Icon from "../../atoms/Icon/Icon";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";

class ToggleInfoCard extends Component {
  static propTypes = {
    enabled: PropTypes.bool,
    coin: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      switchActivated: false,
      enabled: props.enabled,
    };
  }

  getCardProps = () => {
    const { enabled } = this.state;
    const theme = getTheme();
    if (enabled) {
      return {
        name: "Checked",
        colors: {
          circleColor: STYLES.COLORS.WHITE_OPACITY2,
          fill: STYLES.COLORS.WHITE,
          textTitle: STYLES.COLORS.WHITE,
          textSubtitle: STYLES.COLORS.WHITE,
        },
        titleText: "ENABLED",
        titleTextSize: "H2",
        textTitleTouchDisabled: true,
      };
    }
    return {
      colors: {
        circleColor: STYLES.COLORS.RED_OPACITY2,
        fill: STYLES.COLORS.RED,
        textTitle: STYLES.COLORS.RED,
        textSubtitle:
          theme === "light" ? STYLES.COLORS.DARK_GRAY : STYLES.COLORS.WHITE,
      },
      titleText: "DISABLED",
      titleTextSize: "H2",
      textTitleTouchDisabled: true,
    };
  };

  // TODO pass API call
  toggleSwitch = () => {
    this.setState({
      enabled: !this.state.enabled,
    });
  };

  renderToggleOrIcon = cardParams => {
    const { enabled } = this.state;
    const style = ToggleInfoCardStyle();
    if (!enabled) {
      return (
        <View style={style.toggleWrapper}>
          <CelSwitch value={enabled} onValueChange={this.toggleSwitch} />
        </View>
      );
    }
    return (
      <View
        style={[
          style.circle,
          { backgroundColor: cardParams.colors.circleColor },
        ]}
      >
        <Icon
          name={cardParams.name}
          fill={cardParams.colors.fill}
          width={35}
          height={35}
        />
      </View>
    );
  };

  render() {
    const style = ToggleInfoCardStyle();

    const { subtitle } = this.props;
    const { enabled } = this.state;
    const cardParams = this.getCardProps();
    const backgroundColorStyle = enabled
      ? { backgroundColor: STYLES.COLORS.GREEN }
      : {};

    if (!cardParams) return null;

    return (
      <Card
        margin="20 0 20 0"
        padding={"2 2 2 2"}
        styles={[style.card, backgroundColorStyle]}
      >
        {this.renderToggleOrIcon(cardParams)}

        <View style={style.text}>
          <CelText type="H7" color={cardParams.colors.textSubtitle}>
            {subtitle}
          </CelText>

          <CelText
            type={cardParams.titleTextSize}
            weight="600"
            color={cardParams.colors.textTitle}
          >
            {cardParams.titleText}
          </CelText>
        </View>
      </Card>
    );
  }
}

export default ToggleInfoCard;
