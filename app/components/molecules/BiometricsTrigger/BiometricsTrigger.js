import React, { Component } from "react";
import PropTypes from "prop-types";

import Banner from "../Banner/Banner";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { setSecureStoreKey } from "../../../utils/storage-util";
import { STORAGE_KEYS } from "../../../constants/DATA";
import { SCREENS } from "../../../constants/SCREENS";

class BiometricsTrigger extends Component {
  static propTypes = {
    actions: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { actions } = this.props;
    const content = `Access to your account is much easier now! Celsius allows you to use Touch or Face ID instead of other authentication methods.`;
    return (
      <Banner
        backgroundColor={getColor(COLOR_KEYS.LINK)}
        image={require("../../../../assets/images/biometrics.png")}
        imageStyle={{ width: 55, height: 55, marginLeft: 5 }}
        buttonText={"Enable biometrics"}
        action={() => {
          actions.navigateTo(SCREENS.BIOMETRICS_AUTHENTICATION);
        }}
        title={"Fast & Secure Authentication"}
        content={content}
        textButtonText={"Don't show"}
        textButtonAction={() => {
          actions.closeBanner();
          setSecureStoreKey(
            STORAGE_KEYS.BIOMETRIC_BANNER,
            JSON.stringify(true)
          );
        }}
        close={() => actions.closeBanner()}
      />
    );
  }
}

export default BiometricsTrigger;
