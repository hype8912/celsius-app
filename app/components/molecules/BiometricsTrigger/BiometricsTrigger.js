import React, { Component } from "react";
import PropTypes from "prop-types";

import Banner from "../Banner/Banner";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { DONT_SHOW } from "../../../constants/UI";
import { setSecureStoreKey } from "../../../utils/expo-storage";

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
    const content = `Access to your account is much easier now! Celsius alows you to  use Touch or Face ID instead of other authentication methods.`;
    return (
      <Banner
        backgroundColor={getColor(COLOR_KEYS.LINK)}
        image={require("../../../../assets/images/biometrics.png")}
        buttonText={"Enable biometrics"}
        action={() => {
          actions.navigateTo("BiometricAuthentication");
        }}
        title={"Fast & Secure Authentication"}
        content={content}
        textButtonText={"Don't show"}
        textButtonAction={() => {
          actions.closeBanner();
          setSecureStoreKey(DONT_SHOW.BIOMETRIC_BANNER, JSON.stringify(true));
        }}
        close={() => actions.closeBanner()}
      />
    );
  }
}

export default BiometricsTrigger;
