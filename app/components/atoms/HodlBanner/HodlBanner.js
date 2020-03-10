import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as moment from "moment";

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
    // change unactive to inactive
    if (status.state === "Deactivated" || status.state === "Unactive")
      return null;

    const now = moment.utc();
    const deactivatedAt = moment.utc(status.deactivated_at);
    const diff = deactivatedAt.diff(now);
    const hours = Math.abs(moment.duration(diff).hours());
    const minutes = Math.abs(moment.duration(diff).minutes());
    // remove seconds and inform nir
    const seconds = Math.abs(moment.duration(diff).seconds());

    return (
      <View style={style.container}>
        {status.state === "Activated" ? (
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
            {`EXITING HODL MODE: ${hours}:${minutes}:${seconds}`}
          </CelText>
        )}
      </View>
    );
  }
}

export default HodlBanner;
