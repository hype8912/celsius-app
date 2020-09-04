import React, { Component } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import Banner from "../Banner/Banner";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";

class LoanTrigger extends Component {
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
    const content = `Need funds? With Celsius you can borrow against your crypto. No credit check required!`;
    return (
      <Banner
        backgroundColor={getColor(COLOR_KEYS.LINK)}
        image={require("../../../../assets/images/illustration-borrow-dollars_white.png")}
        action={() => {
          actions.navigateTo("BorrowChooseLoan");
          mixpanelAnalytics.userInitiatingLoanOnWallet();
        }}
        buttonText={"Get a loan"}
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
        textButtonText={"Don't show"}
        title={"Don’t sell coins, HODL and borrow like the 1%"}
        content={content}
        close={() => actions.closeBanner()}
      />
    );
  }
}

export default LoanTrigger;
