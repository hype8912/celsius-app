import React, { Component } from "react";
import SvgIcon from "react-native-svg-icon";
import PropTypes from "prop-types";
import { View } from "react-native";

import Svgs from "../../../constants/SVGS";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    fill: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    iconOpacity: PropTypes.number,
  };
  static defaultProps = {
    fill: "primary",
    width: 40,
    height: 40,
    iconOpacity: 1,
  };

  render() {
    const { name, fill, iconOpacity, style } = this.props;
    let fillColor = fill;
    const svgIcons = Svgs;

    if (["primary", "inactive"].includes(fill))
      fillColor = getColor(COLOR_KEYS.TAB_UNSELECTED);
    if (["active"].includes(fill))
      fillColor = getColor(COLOR_KEYS.TAB_SELECTED);
    if (Object.values(COLOR_KEYS).includes(fill)) fillColor = getColor(fill);

    const viewBox = svgIcons[`${name}ViewBox`] || this.props.viewBox;

    return (
      <View style={{ overflow: "hidden", opacity: iconOpacity }}>
        <SvgIcon
          viewBox={viewBox}
          name={name}
          {...this.props}
          svgs={svgIcons}
          fill={fillColor}
          style={[{ alignSelf: "center", justifyContent: "center" }, style]}
        />
      </View>
    );
  }
}

export default Icon;
