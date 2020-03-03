import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';



import DotsBarStyle from "./DotsBar.styles";

class DotsBar extends Component {


  static propTypes = {
    length: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
  };
  static defaultProps = {
  }

  getStyle(step, currentStep) {
    const style = DotsBarStyle();
    const circleSryle = [style.basicCircle]
    
    if (step <= currentStep) circleSryle.push(style.activeCircle)
    return circleSryle;
  }
  
  renderSteps = () => {
    const { length, currentStep } = this.props
    const circles = [];
    
    let step = 1;
    while (step <= length) {
      circles.push(<View key={step} style={this.getStyle(step, currentStep)} />)
      step++
    }
    return circles
  }

  render() {
    const style = DotsBarStyle()
    const Steps = this.renderSteps
    return (
      <View style={style.wrapper}>
        <Steps />
      </View>
    );
  }
}
export default DotsBar
