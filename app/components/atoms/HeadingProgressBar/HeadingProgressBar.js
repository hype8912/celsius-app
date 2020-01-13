import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HeadingProgressBarStyle from "./HeadingProgressBar.styles";

class HeadingProgressBar extends Component {
  static propTypes = {
    steps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    width: PropTypes.number,
  };
  static defaultProps = {};

  renderSteps = () => {
    const { steps, currentStep } = this.props;
    const style = HeadingProgressBarStyle();
    const views = [];

    for (let step = 1; step <= steps; step++) {
      let stepView;
      const stepViewStyle = [{ flex: 1 / steps }];
      if (step <= currentStep) {
        stepViewStyle.push(style.colored);
        // if (step === 1) stepViewStyle.push(style.radiusLeft)
        if (step === currentStep || step === steps)
          stepViewStyle.push(style.radiusRight);
        stepView = <View style={stepViewStyle} key={step} />;
      } else {
        stepViewStyle.push(style.nonColor);
        if (step === steps) stepViewStyle.push(style.radiusRight);
        stepView = <View style={stepViewStyle} key={step} />;
      }
      views.push(stepView);
    }
    return views;
  };

  render() {
    const style = HeadingProgressBarStyle();
    const Steps = this.renderSteps;
    return (
      <View style={style.container}>
        <Steps />
      </View>
    );
  }
}

export default HeadingProgressBar;
