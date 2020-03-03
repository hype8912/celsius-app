import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HodlBannerStyle from "./HodlBanner.styles";
import CelText from "../../atoms/CelText/CelText";

class HodlBanner extends Component {
  static propTypes = {
    // text: PropTypes.string,
    status: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    const style = HodlBannerStyle();
    const { status } = this.props;
    return (
      <View style={style.container}>
        {status ? (
          <CelText
            font={"RobotoMono"}
            weight="regular"
            type={"H6"}
            color={"white"}
          >
            HODL MODE: ON
          </CelText>
        ) : (
          <CelText
            font={"RobotoMono"}
            weight="regular"
            type={"H6"}
            color={"white"}
          >
            EXITING HODL MODE: 06 : 06 : 06
          </CelText>
        )}
      </View>
    );
  }
}

export default HodlBanner;
