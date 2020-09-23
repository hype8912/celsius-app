import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import { getColor } from "../../../utils/styles-util";
import ToggleInfoCardStyle from "./ToggleInfoCard.styles";
import Icon from "../../atoms/Icon/Icon";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
import { COLOR_KEYS } from "../../../constants/COLORS";

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
    };
  }

  componentDidMount() {
    const { enabled } = this.props;
    this.setState({
      enabled,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.enabled !== this.props.enabled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ enabled: this.props.enabled });
    }
  }

  getCardProps = () => {
    const { enabled } = this.state;
    const { titleText } = this.props;

    if (enabled) {
      return {
        name: "Checked",
        colors: {
          circleColor: getColor(COLOR_KEYS.SECURITY_FIX_CIRCLE),
          fill: getColor(COLOR_KEYS.SECURITY_FIX_ICON),
          textTitle: getColor(COLOR_KEYS.POSITIVE_STATE),
        },
        titleText: titleText || "ENABLED",
        titleTextSize: "H2",
        textTitleTouchDisabled: true,
      };
    }
    return {
      colors: {
        circleColor: getColor(COLOR_KEYS.SECURITY_FIX_NEGATIVE_CIRCLE),
        fill: getColor(COLOR_KEYS.NEGATIVE_STATE),
        textTitle: getColor(COLOR_KEYS.NEGATIVE_STATE),
      },
      titleText: "DISABLED",
      titleTextSize: "H2",
      textTitleTouchDisabled: true,
    };
  };

  toggleSwitch = () => {
    const { onPress } = this.props;
    onPress();
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
      <View style={{ paddingLeft: 20, justifyContent: "center" }}>
        <View
          style={[
            style.circle,
            { backgroundColor: cardParams.colors.circleColor },
          ]}
        />
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
    const cardParams = this.getCardProps();

    if (!cardParams) return null;

    return (
      <Card margin="20 0 20 0" padding={"2 2 2 2"} styles={style.card}>
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
