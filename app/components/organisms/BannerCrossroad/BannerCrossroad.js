import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appActions from "../../../redux/actions";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import KYCTrigger from "../../molecules/KYCTrigger/KYCTrigger";
import { KYC_STATUSES } from "../../../constants/DATA";
import LoanTrigger from "../../molecules/LoanTrigger/LoanTrigger";
import ReferralTrigger from "../../atoms/ReferralTrigger/ReferralTrigger";
import BiometricsTrigger from "../../molecules/BiometricsTrigger/BiometricsTrigger";
import {
  isLoanBannerVisible,
  isBiometricsBannerVisible,
} from "../../../utils/ui-util";

@connect(
  state => ({
    kycStatus: state.user.profile.kyc
      ? state.user.profile.kyc.status
      : KYC_STATUSES.collecting,
    isBannerVisible: state.ui.isBannerVisible,
    bannerProps: state.ui.bannerProps,
    userTriggeredActions: state.user.appSettings.user_triggered_actions || {},
    biometrics: state.biometrics.biometrics,
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
      biometricBannerHidden: false,
      bannerSwitch: 0,
    };
  }

  async componentDidMount() {
    if (isLoanBannerVisible()) {
      this.bannerInterval = setInterval(
        () => this.setState(this.updateState()),
        30000
      );
    }
    const biometricBannerHidden = await isBiometricsBannerVisible();
    if (biometricBannerHidden) this.setState({ biometricBannerHidden });
  }

  componentWillUnmount() {
    clearInterval(this.bannerInterval);
  }

  updateState = () => {
    const { bannerSwitch } = this.state;
    this.setState({ bannerSwitch: !bannerSwitch });
  };

  isPowerOfTwo(bannerCounter) {
    return bannerCounter % 2 === 0;
  }

  render() {
    const {
      actions,
      kycStatus,
      isBannerVisible,
      bannerProps,
      userTriggeredActions,
      biometrics,
    } = this.props;
    const { bannerSwitch } = this.state;
    const currentDate = moment.utc().format();

    if (!hasPassedKYC())
      return <KYCTrigger actions={actions} kycType={kycStatus} />;

    if (!isBannerVisible) return null;

    if (biometrics.available && !this.state.biometricBannerHidden) {
      return <BiometricsTrigger actions={actions} />;
    }

    if (this.isPowerOfTwo(bannerProps.sessionCount)) return null;
    if (userTriggeredActions.bannerResurrectionDay) {
      if (
        moment(currentDate).isBefore(
          moment(userTriggeredActions.bannerResurrectionDay)
            .utc()
            .format()
        )
      )
        return null;
    }

    if (isLoanBannerVisible()) {
      if (!bannerSwitch) return <ReferralTrigger actions={actions} />;
      return <LoanTrigger actions={actions} />;
    }
    if (
      !bannerProps.lastReferral ||
      moment(currentDate).isAfter(
        moment(bannerProps.lastReferral)
          .utc()
          .add(14, "days")
          .format()
      )
    )
      return <ReferralTrigger actions={actions} />;
    return null;
  }
}

export default BannerCrossroad;
