import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';



import BadgeStyle from "./Badge.styles";
import STYLES from "../../../constants/STYLES";
import { getPadding, getMargins } from "../../../utils/styles-util";

const { COLORS } = STYLES;

const Badge = ({
  color = COLORS.GREEN,
  margin = "5 5 5 5",
  padding = "5 5 5 5",
  children
}) => {
  const styles = BadgeStyle()
  const badgeStyles = [
    styles.container,
    { backgroundColor: color },
    getMargins(margin),
    getPadding(padding),
  ]
  return (
    <View style={badgeStyles}>
      { children }
    </View>
  )
}

Badge.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
}

export default Badge
