import React, { Component } from "react";
import PropTypes from "prop-types";

import STYLES from "../../../constants/STYLES";
import { KYC_STATUSES } from "../../../constants/DATA";
import { MODALS } from "../../../constants/UI";
import Banner from "../Banner/Banner";
import { hasPassedKYC } from "../../../utils/user-util";

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
        color = STYLES.COLORS.ORANGE;
        break;
      case KYC_STATUSES.permanently_rejected:
      case KYC_STATUSES.rejected:
        color = STYLES.COLORS.RED;
        break;
      default:
        color = STYLES.COLORS.CELSIUS_BLUE;
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
          "Become a Celsius member by verifying your profile. You will be able to earn interest on your deposited coins, take dollar and stable coin loans and send crypto to your friends.";
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
            ? () => actions.navigateTo("KYCProfileDetails")
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
