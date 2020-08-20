import React, { Component } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";

import { THEMES } from "../../../constants/UI";
import Icon from "../Icon/Icon";
import { getColor, getTheme } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class CoinIcon extends Component {
  static propTypes = {
    url: PropTypes.string,
    coinShort: PropTypes.string,
    customStyles: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { url, coinShort, customStyles } = this.props;
    const theme = getTheme();

    return (
      <View>
        {theme !== THEMES.DARK ? (
          <Image source={{ uri: url }} style={customStyles} />
        ) : (
          <Icon
            name={`Icon${coinShort}`}
            fill={getColor(COLOR_KEYS.PRIMARY_BUTTON_FOREGROUND)}
            style={[customStyles, { opacity: 0.5 }]}
          />
        )}
      </View>
    );
  }
}

export default CoinIcon;
