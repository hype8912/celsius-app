import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TouchableOpacity, View } from "react-native";

import Card from "../../atoms/Card/Card";
import STYLES from "../../../constants/STYLES";
import CelText from "../../atoms/CelText/CelText";
import * as appActions from "../../../redux/actions";
// import { getTheme } from "../../../utils/styles-util";
import ToggleInfoCardStyle from "./ToggleInfoCard.styles";
import Icon from "../../atoms/Icon/Icon";
import CelSwitch from "../../atoms/CelSwitch/CelSwitch";
// import StoryWrapper from "../../atoms/StoryWrapper/StoryWrapper";

@connect(
  state => ({
    interestRates: state.generalData.interestRates,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class ToggleInfoCard extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(["info", "toggle"]).isRequired,
    status: PropTypes.oneOf(["info", "enabled", "disabled"]),
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
      activeType: "disabled",
    };
  }

  getCardProps = active => {
    const { activeType } = this.state;
    const status = active || activeType;
    switch (status) {
      case "info":
        return {
          name: "Shield",
          colors: {
            background: STYLES.COLORS.WHITE,
            circleColor: STYLES.COLORS.CELSIUS_BLUE_OPACITY1,
            fill: STYLES.COLORS.CELSIUS_BLUE,
            textTitle: STYLES.COLORS.CELSIUS_BLUE,
            textSubtitle: STYLES.COLORS.DARK_GRAY,
          },
          titleText: "Check Withdrawal Addresses",
          titleTextSize: "H7",
          textTitleTouchDisabled: false,
        };
      case "enabled":
        return {
          name: "Checked",
          colors: {
            background: STYLES.COLORS.GREEN,
            circleColor: STYLES.COLORS.WHITE_OPACITY2,
            fill: STYLES.COLORS.WHITE,
            textTitle: STYLES.COLORS.WHITE,
            textSubtitle: STYLES.COLORS.WHITE,
          },
          titleText: "ENABLED",
          titleTextSize: "H2",
          textTitleTouchDisabled: true,
        };
      case "disabled":
        return {
          name: "Shield",
          colors: {
            background: STYLES.COLORS.WHITE,
            circleColor: STYLES.COLORS.RED_OPACITY2,
            fill: STYLES.COLORS.RED,
            textTitle: STYLES.COLORS.RED,
            textSubtitle: STYLES.COLORS.DARK_GRAY,
          },
          titleText: "DISABLED",
          titleTextSize: "H2",
          textTitleTouchDisabled: true,
        };
      default:
        return;
    }
  };

  // TODO change 5 and 10 with prop values (passed or from Redux)
  renderInfoSubtitle = cardParams => {
    const style = ToggleInfoCardStyle();
    return (
      <View style={style.infoSubtitleWrapper}>
        <CelText type="H3" weight="600" color={cardParams.colors.textSubtitle}>
          5
        </CelText>
        <CelText type="H5" color={cardParams.colors.textSubtitle}>
          /10
        </CelText>
      </View>
    );
  };

  // TODO pass API call
  toggleSwitch = () => {
    this.setState(
      {
        switchActivated: !this.state.switchActivated,
      },
      () => {
        if (this.state.switchActivated)
          this.setState({ activeType: "enabled" });
        else this.setState({ activeType: "disabled" });
      }
    );
  };

  renderToggleOrIcon = (mode, cardParams) => {
    const style = ToggleInfoCardStyle();
    if (mode === "toggle") {
      return (
        <View style={[style.circle, { alignItems: "center" }]}>
          <CelSwitch
            value={this.state.switchActivated}
            onValueChange={this.toggleSwitch}
          />
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
    // const theme = getTheme();
    const style = ToggleInfoCardStyle();

    const { mode, status, subtitle, onPress } = this.props;
    const cardParams = this.getCardProps(status);

    if (!cardParams) return null;

    return (
      <Card
        margin="20 0 20 0"
        padding={"2 2 2 2"}
        styles={[style.card, { backgroundColor: cardParams.colors.background }]}
      >
        {this.renderToggleOrIcon(mode, cardParams)}

        <View style={style.text}>
          {status !== "info" ? (
            <CelText type="H7" color={cardParams.colors.textSubtitle}>
              {subtitle}
            </CelText>
          ) : (
            this.renderInfoSubtitle(cardParams)
          )}

          <TouchableOpacity
            onPress={onPress}
            disabled={cardParams.textTitleTouchDisabled}
          >
            <CelText
              type={cardParams.titleTextSize}
              weight="600"
              color={cardParams.colors.textTitle}
            >
              {cardParams.titleText}
            </CelText>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
}

export default ToggleInfoCard;
