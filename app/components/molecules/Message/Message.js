import React, { Component } from "react";
import { Animated, Dimensions, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
import MessageStyle from "./Message.styles";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import animationsUtil from "../../../utils/animations-util";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

@connect(
  state => ({
    message: state.ui.message,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class Message extends Component {
  static propTypes = {};
  static defaultProps = {};

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.message) {
      animationsUtil.openMessage(prevState.yOffset);
    }
    return null;
  }

  state = {
    yOffset: new Animated.Value(0),
  };

  getIcon = () => {
    const { message } = this.props;

    switch (message.type) {
      case "info":
        return { name: "InfoCircle" };
      case "warning":
        return { name: "WarningCircle" };
      case "error":
        return { name: "AlertIcon" };
      case "success":
      default:
        return { name: "CheckCircle" };
    }
  };

  closeMessage = () => {
    const { actions } = this.props;
    const { yOffset } = this.state;
    animationsUtil.closeMessage(yOffset, () => actions.clearMessage());
  };

  render() {
    const { message } = this.props;
    const { yOffset } = this.state;
    const { height } = Dimensions.get("window");
    if (!message || !message.text) return null;
    const { action } = message;
    const style = MessageStyle();

    const icon = this.getIcon();

    return (
      <Animated.View
        style={[
          style[`${message.type}Container`],
          {
            transform: [
              {
                translateY: yOffset.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={style.circle}>
          <Icon
            {...icon}
            height="29"
            width="29"
            fill={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
          />
        </View>

        <View style={{ width: "65%" }}>
          <CelText margin={"3 0 0 0"} color="white">
            {message.text}
          </CelText>
          {!!action && (
            <CelText
              margin={"5 0 0 0"}
              color="white"
              weight="bold"
              onPress={action.action}
            >
              {action.text} >
            </CelText>
          )}
        </View>

        <TouchableOpacity
          onPress={() => this.closeMessage()}
          style={style.closeButton}
        >
          <View style={style.closeButtonView}>
            <Icon
              name="Close"
              height="20"
              width="20"
              viewBox="0 0 1000 1000"
              fill="#FFFFFF"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Message;
