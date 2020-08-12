import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import Banner from "../../molecules/Banner/Banner";
import { MODALS } from "../../../constants/UI";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class ReferralTrigger extends Component {
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

    const content =
      "\n" +
      "Celsius now pays you and your friends $20 every time a new Celsian deposits $200 for 30 days." +
      "\n";

    return (
      <Banner
        backgroundColor={getColor(COLOR_KEYS.LINK)}
        image={require("../../../../assets/images/present-image.png")}
        action={() => {
          actions.openModal(MODALS.REFERRAL_SEND_MODAL);
          mixpanelAnalytics.userStartingReferral();
        }}
        buttonText={"Share code"}
        textButtonText={"Don't show"}
        textButtonAction={() => {
          actions.setUserAppSettings({
            user_triggered_actions: {
              bannerResurrectionDay: moment(moment.utc().format())
                .add(30, "days")
                .utc()
                .format(),
            },
          });
          actions.closeBanner();
        }}
        title={"Earn $20 with each referral!"}
        content={content}
        close={() => actions.closeBanner()}
      />
    );
  }
}

export default ReferralTrigger;
