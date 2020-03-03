import React from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";



import HiddenFieldStyle from "./HiddenField.styles";

function getCircleStyle(props, style, index) {
  const circleStyle = [style.basicCircle]

  if (props.value[index - 1]) circleStyle.push(style.activeCircle)
  if (index === props.length && props.value[index - 1]) circleStyle.push(style.lastCircle)
  if (!props.value && !props.error) circleStyle.push({ opacity: 0.3 })
  if (props.error) {
    circleStyle.push(style.errorCircle)
  }

  return circleStyle;
}

const HiddenField = ({
  value = '',
  length = 4,
  error,
}) => {
  const style = HiddenFieldStyle()
  const circles = [];

  let i = 1;
  while (i <= length) {
    circles.push(<View key={i} style={getCircleStyle({ value, length, error }, style, i)} />)
    i++;
  }

  return (
    <View style={style.wrapper}>
      { circles }
    </View>
  )
}

HiddenField.propTypes = {
  value: PropTypes.string,
  length: PropTypes.number,
  error: PropTypes.bool,
}

export default HiddenField
