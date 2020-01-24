import React, { Component } from "react";
import PropTypes from "prop-types";

import Banner from "../../molecules/Banner/Banner";
import STYLES from "../../../constants/STYLES";
import { MODALS } from "../../../constants/UI";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";

class ReferralTrigger extends Component {
  static propTypes = {
    actions: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { actions } = this.props;

    const content =
      "Earn even more when others sign up for Celsius with your referral code!\n" +
      "\n" +
      "How it works:\n" +
      "1. New user signs up with your referral code\n" +
      "2. New user deposits $200 or more in crypto\n" +
      "3. You and the new user each earn $10 in BTC!\n" +
      "\n" +
      "*BTC unlocked 72 hours after initial deposit";

    return (
      <Banner
        backgroundColor={STYLES.COLORS.CELSIUS_BLUE}
        image={require("../../../../assets/images/present-image.png")}
        action={() => {
          actions.openModal(MODALS.REFERRAL_SEND_MODAL);
          mixpanelAnalytics.userStartingReferral();
        }}
        buttonText={"Share referral code"}
        title={"Refer & Earn!"}
        content={content}
        close={() => actions.closeBanner()}
      />
    );
  }
}

export default ReferralTrigger;
