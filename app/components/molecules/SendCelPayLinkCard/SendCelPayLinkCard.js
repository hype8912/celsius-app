import React from 'react';
import PropTypes from "prop-types";
import { Share, View } from "react-native";

import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import CelButton from "../../atoms/CelButton/CelButton";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import { getPadding } from "../../../utils/styles-util";
import formatter from "../../../utils/formatter";
import mixpanelAnalytics from "../../../utils/mixpanel-analytics"

class SendCelPayLinkCard extends React.Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
  }
  static defaultProps = {}

  shareCelPayLink = () => {
    const { transaction } = this.props

    const branchLink = transaction.transfer_data.branch_link;
    const shareMsg = `You got ${formatter.crypto(
      Math.abs(transaction.amount),
      transaction.coin
    )}! Click on the link to claim it ${branchLink}`;
    Share.share({ message: shareMsg, title: "Celsius CelPay" });
    mixpanelAnalytics.sharedCelPayLink()
  }

  render() {
    const { transaction } = this.props

    const padding = getPadding("20 20 20 20")

    // Sent to friend pending email verification
    if (transaction.transfer_data.claimer && transaction.type === TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION) {
      return (
        <View style={padding}>
          <Card>
            <CelText type="H6" align="center">
              After you confirm the CelPay transaction via email your friend will see it in their Celsius wallet.
            </CelText>
          </Card>
        </View>
      )
    }

    // Sent to as link pending email verification
    if (!transaction.transfer_data.claimer && transaction.type === TRANSACTION_TYPES.CELPAY_PENDING_VERIFICATION) {
      return (
        <View style={padding}>
          <Card>
            <CelText type="H6" align="center">
              After you confirm the CelPay transaction via email you will be able to share your CelPay link.
            </CelText>

            <CelButton margin="16 0 0 0" onPress={this.shareCelPayLink} disabled>
              Share CelPay link
            </CelButton>
          </Card>
        </View>
      )
    }

    // Sent to as link pending calimer
    if (!transaction.transfer_data.claimer && transaction.type === TRANSACTION_TYPES.CELPAY_PENDING) {
      return (
        <View style={padding}>
          <Card>
            <CelText type="H6" align="center">
              You are now able to share the CelPay link to your friends.
            </CelText>

            <CelButton margin="16 0 0 0" onPress={this.shareCelPayLink}>
              Share CelPay link
            </CelButton>
          </Card>
        </View>
      )
    }

    return null
  }

}

export default SendCelPayLinkCard
