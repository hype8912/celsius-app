import React, { Component } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";

import CelSegmentedControlStyle from "./CelSegmentedControl.styles";

const icons = {
  "email-inactive": require("../../../../assets/images/icons/email-inactive.png"),
  "email-active": require("../../../../assets/images/icons/email-active.png"),
  "mail-inactive": require("../../../../assets/images/icons/mail-inactive.png"),
  "mail-active": require("../../../../assets/images/icons/mail-active.png"),
};

class CelAnimatedSwitch extends Component {
  static propTypes = {
    options: PropTypes.instanceOf(Object),
    onValueChange: PropTypes.func,
  };
  static defaultProps = {
    options: null,
    onValueChange: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      thumbAnimation: new Animated.Value(0),
      activeIndex: 0,
    };
  }

  moveLogo = index => {
    const { width, options } = this.props;

    Animated.timing(this.state.thumbAnimation, {
      toValue: (index * width) / options.length,
      duration: 200,
      useNativeDriver: true,
    }).start(() => this.setState({ activeIndex: index }));
  };

  renderOptions = () => {
    const { options, width, height } = this.props;

    const style = CelSegmentedControlStyle();

    return options.map((option, index) => {
      const icon =
        index === this.state.activeIndex
          ? icons[`${option.image}-active`]
          : icons[`${option.image}-inactive`];
      const color = index === this.state.activeIndex ? "white" : "gray";
      return (
        <TouchableWithoutFeedback onPress={() => this.moveLogo(index)}>
          <View
            style={{
              ...style.optionView,
              width: width / 2,
              borderRadius: height / 2,
            }}
          >
            <Image source={icon} style={style.image} />
            <Text style={{ color }}>{option.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  render() {
    const { options, width, height } = this.props;

    const style = CelSegmentedControlStyle();

    return (
      <View
        style={{ ...style.container, width, height, borderRadius: height / 2 }}
      >
        {options && this.renderOptions()}
        <Animated.View
          style={[
            style.thumb,
            {
              width: width / 2,
              transform: [
                {
                  translateX: this.state.thumbAnimation,
                },
              ],
            },
          ]}
        />
      </View>
    );
  }
}

export default CelAnimatedSwitch;
