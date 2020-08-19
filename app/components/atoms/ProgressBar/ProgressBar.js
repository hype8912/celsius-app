import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import ProgressBarStyle from "./ProgressBar.styles";
import { getMargins } from "../../../utils/styles-util";

class ProgressBar extends Component {
  static propTypes = {
    steps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    width: PropTypes.number,
    margin: PropTypes.string,
  };
  static defaultProps = {
    margin: "0 0 0 0",
  };

  renderSteps = () => {
    const { steps, currentStep } = this.props;
    const style = ProgressBarStyle();
    const views = [];

    for (let step = 1; step <= steps; step++) {
      let stepView;
      const stepViewStyle = [{ flex: 1 / steps }];
      if (step <= currentStep) {
        stepViewStyle.push(style.colored);
        if (step === 1) stepViewStyle.push(style.radiusLeft);
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
    const { margin } = this.props;
    const style = ProgressBarStyle();
    const Steps = this.renderSteps;
    const margins = getMargins(margin);
    return (
      <View style={[style.container, margins]}>
        <Steps />
      </View>
    );
  }
}

export default ProgressBar;
