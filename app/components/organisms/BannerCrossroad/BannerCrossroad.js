import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appActions from "../../../redux/actions";
// import BannerCrossroadStyle from "./BannerCrossroad.styles";
import { hasPassedKYC } from "../../../utils/user-util";
import KYCTrigger from "../../molecules/KYCTrigger/KYCTrigger";
import { KYC_STATUSES } from "../../../constants/DATA";
import LoanTrigger from "../../molecules/LoanTrigger/LoanTrigger";
import ReferralTrigger from "../../atoms/ReferralTrigger/ReferralTrigger";
import { isLoanBannerVisible } from "../../../utils/ui-util";

@connect(
  state => ({
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    isBannerVisible: state.ui.isBannerVisible,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class BannerCrossroad extends Component {
  static propTypes = {};
  static defaultProps = {};
  static bannerInterval;

  constructor(props) {
    super(props);
    this.state = {
      bannerSwitch: true,
    };
  }

  componentDidMount() {
    if (isLoanBannerVisible()) {
      this.bannerInterval = setInterval(
        () => this.setState(this.updateState()),
        30000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.bannerInterval);
  }

  updateState = () => {
    const { bannerSwitch } = this.state;
    this.setState({ bannerSwitch: !bannerSwitch });
  };

  render() {
    const { actions, kycStatus, isBannerVisible } = this.props;
    const { bannerSwitch } = this.state;
    // const style = BannerCrossroadStyle();

    if (!isBannerVisible) return null;

    if (!hasPassedKYC())
      return <KYCTrigger actions={actions} kycType={kycStatus} />;

    if (isLoanBannerVisible()) {
      if (!bannerSwitch)
        return <ReferralTrigger steps={"multi"} actions={actions} />;
      return <LoanTrigger steps={"multi"} actions={actions} />;
    }
    return <ReferralTrigger steps={"single"} actions={actions} />;
  }
}

export default BannerCrossroad;
