import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import BadgeStyle from "./Badge.styles";
import { getPadding, getMargins, getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

const Badge = ({
  color = getColor(COLOR_KEYS.POSITIVE_STATE),
  margin = "5 5 5 5",
  padding = "5 5 5 5",
  children,
}) => {
  const styles = BadgeStyle();
  const badgeStyles = [
    styles.container,
    { backgroundColor: color, alignItems: "flex-end" },
    getMargins(margin),
    getPadding(padding),
  ];
  return <View style={badgeStyles}>{children}</View>;
};

Badge.propTypes = {
  color: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  style: PropTypes.instanceOf(Object),
};

export default Badge;
