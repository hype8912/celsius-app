import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";

import { HODL_STATUS } from "../../../constants/UI";
import HodlBannerStyle from "./HodlBanner.styles";
import CelText from "../../atoms/CelText/CelText";
import { SCREENS } from "../../../constants/SCREENS";
import { presentTime } from "../../../utils/ui-util";

class HodlBanner extends Component {
  static propTypes = {
    status: PropTypes.instanceOf(Object),
    navigateTo: PropTypes.func,
    activeScreen: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    const style = HodlBannerStyle();
    const { status, actions, activeScreen } = this.props;
    if (!status.isActive || activeScreen === SCREENS.VERIFY_PROFILE)
      return null;

    const time = presentTime(status.deactivated_at);

    const isDisabled =
      status.state !== HODL_STATUS.ACTIVATED ||
      activeScreen === SCREENS.VERIFY_PROFILE;

    return (
      <TouchableOpacity
        style={style.container}
        disabled={isDisabled}
        onPress={() => {
          actions.setHodlProps(true);
          actions.navigateTo(SCREENS.HODL_LANDING, { deactivation: true });
        }}
      >
        {status.state === HODL_STATUS.ACTIVATED ? (
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
            {`EXITING HODL MODE: ${time.hours}H ${time.minutes}M`}
          </CelText>
        )}
      </TouchableOpacity>
    );
  }
}

export default HodlBanner;
