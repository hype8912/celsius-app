import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import moment from "moment";

import ReferralSectionStyle from "./TxReferralSection.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import formatter from "../../../utils/formatter";

class TxReferralSection extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  render() {
    const style = ReferralSectionStyle();
    const { transaction } = this.props;

    const participant = transaction.type.includes("REFERRED")
      ? transaction.referral_data.referred
      : transaction.referral_data.referrer;

    return (
      <View style={style.container}>
        <Card margin={"20 0 20 0"}>
          <View style={style.text}>
            <CelText color={STYLES.COLORS.MEDIUM_GRAY}>
              Referral Details:
            </CelText>
          </View>
          <View style={style.content}>
            {!participant.profile_picture ? (
              <Image
                source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                style={style.image}
              />
            ) : (
              <Image
                source={{ uri: participant.profile_picture }}
                style={style.image}
              />
            )}
            <View style={style.data}>
              <CelText weight="600" type="H4">
                {formatter.hideTextExceptFirstNLetters(participant.first_name)}{" "}
                {formatter.hideTextExceptFirstNLetters(participant.last_name)}
              </CelText>
              <CelText
                style={style.textTwo}
                color={STYLES.COLORS.CELSIUS_BLUE}
                type="H6"
              >
                {participant.email
                  ? formatter.maskEmail(participant.email)
                  : null}
              </CelText>
            </View>
          </View>
          {transaction.type.includes("HODL") && (
            <CelText
              style={{ marginTop: 20 }}
              type="H5"
              color={STYLES.COLORS.MEDIUM_GRAY}
            >
              If {formatter.hideTextExceptFirstNLetters(participant.first_name)}{" "}
              keeps initial deposit until
              <CelText
                type="H5"
                color={STYLES.COLORS.DARK_GRAY}
                weight="600"
              >{` ${moment(transaction.time).format("D MMM YYYY")} `}</CelText>
              , your referral reward will unlock.
            </CelText>
          )}
        </Card>
        {transaction.type.includes("PENDING") && (
          <Card>
            <CelText type="H5" color={STYLES.COLORS.MEDIUM_GRAY}>
              Your award is yet to be confirmed. You will be able to see it in
              your wallet, soon.
            </CelText>
          </Card>
        )}
      </View>
    );
  }
}

export default TxReferralSection;