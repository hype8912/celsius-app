import React, { Component } from "react";
import PropTypes from "prop-types";

import { KYC_STATUSES } from "../../../constants/DATA";
import { MODALS } from "../../../constants/UI";
import Banner from "../Banner/Banner";
import { hasPassedKYC } from "../../../utils/user-util/user-util";
import { getColor } from "../../../utils/styles-util";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { SCREENS } from "../../../constants/SCREENS";

class KYCTrigger extends Component {
  static propTypes = {
    kycType: PropTypes.string.isRequired,
    actions: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  getColor = () => {
    const { kycType } = this.props;
    let color;

    switch (kycType) {
      case KYC_STATUSES.pending:
      case KYC_STATUSES.sending:
      case KYC_STATUSES.sent:
        color = getColor(COLOR_KEYS.ALERT_STATE);
        break;
      case KYC_STATUSES.permanently_rejected:
      case KYC_STATUSES.rejected:
        color = getColor(COLOR_KEYS.NEGATIVE_STATE);
        break;
      default:
        color = getColor(COLOR_KEYS.LINK);
    }

    return color;
  };

  renderKycInfo = () => {
    const { kycType } = this.props;

    let title;
    let content;
    let info;

    switch (kycType) {
      case KYC_STATUSES.pending:
      case KYC_STATUSES.sending:
      case KYC_STATUSES.sent:
        title = "Your Profile Verification Is In Progress";
        content =
          "It typically takes just a few minutes to verify your identity. Please contact support if you do not receive verification within the next 24 hours.";
        info = "STARTED FEW MOMENTS AGO";
        break;
      case KYC_STATUSES.permanently_rejected:
      case KYC_STATUSES.rejected:
        title = "Identity Verification Failed!";
        content =
          "Please go through the verification process again or contact our support for help.";
        break;
      default:
        title = "Verify Your Profile";
        content =
          "Complete verification to have full access your to Celsius Network wallet.";
    }

    return { title, content, info };
  };

  render() {
    const { actions, kycType } = this.props;
    const kycInfo = this.renderKycInfo();

    if (hasPassedKYC()) return null;

    return (
      <Banner
        backgroundColor={this.getColor()}
        image={require("../../../../assets/images/kyc-icon.png")}
        action={
          ![
            KYC_STATUSES.pending,
            KYC_STATUSES.sending,
            KYC_STATUSES.sent,
          ].includes(kycType)
            ? () => actions.navigateTo(SCREENS.KYC_PROFILE_DETAILS)
            : null
        }
        buttonText={
          ![KYC_STATUSES.pending].includes(kycType) ? "Verify Profile" : null
        }
        textButtonAction={
          [KYC_STATUSES.rejected, KYC_STATUSES.permanently_rejected].includes(
            kycType
          )
            ? () => actions.openModal(MODALS.KYC_REJECTION_REASONS_MODAL)
            : null
        }
        textButtonText={
          [KYC_STATUSES.rejected, KYC_STATUSES.permanently_rejected].includes(
            kycType
          )
            ? "Rejection reasons"
            : null
        }
        title={kycInfo.title}
        content={kycInfo.content}
        info={kycInfo.info}
        noClose
      />
    );
  }
}

export default KYCTrigger;
