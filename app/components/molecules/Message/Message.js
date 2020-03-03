import React, { Component } from "react";
import { Animated, Easing, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import * as appActions from "../../../redux/actions";
import MessageStyle from "./Message.styles";
import CelText from "../../atoms/CelText/CelText";
import Icon from "../../atoms/Icon/Icon";
import STYLES from "../../../constants/STYLES";

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
      Animated.timing(
        prevState.opacity,
        {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.linear
        }
      ).start();
    }
    return null;
  }

  state = {
    opacity: new Animated.Value(0.3)
  };

  // componentWillReceiveProps(nextProps) {
  //   const { message } = this.props;
  //   const { opacity } = this.state;

  //   if (!message && nextProps.message) {
  //     Animated.timing(
  //       opacity,
  //       {
  //         toValue: 1,
  //         duration: 800,
  //         useNativeDriver: true,
  //         easing: Easing.linear
  //       }
  //     ).start();
  //   }
  // }

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

  render() {
    const { message, actions } = this.props;
    if (!message || !message.text) return null;
    const style = MessageStyle();

    const icon = this.getIcon();

    return (
      <Animated.View style={style[`${message.type}Container`]}>
        <View style={style.circle}>
          <Icon {...icon} height='29' width='29' fill={STYLES.COLORS.WHITE} />
        </View>
        <View style={{ width: "65%" }}>
          <CelText margin={"5 0 0 0"} color="white">
            {message.text}
          </CelText>
        </View>
        <TouchableOpacity onPress={() => actions.clearMessage()} style={style.closeButton}>
        <View style={style.closeButtonView}>
          <Icon name="Close" height="20" width="20" viewBox="0 0 1000 1000" fill="#FFFFFF" />
        </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default Message
