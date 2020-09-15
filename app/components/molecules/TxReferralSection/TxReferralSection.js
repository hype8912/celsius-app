import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import moment from "moment";

import ReferralSectionStyle from "./TxReferralSection.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import formatter from "../../../utils/formatter";
import { TRANSACTION_TYPES } from "../../../constants/DATA";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

class TxReferralSection extends Component {
  static propTypes = {
    transaction: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  render() {
    const style = ReferralSectionStyle();
    const { transaction } = this.props;

    const participant = transaction.type.includes("REFERRED")
      ? transaction.referral_data.referrer
      : transaction.referral_data.referred;

    const text = transaction.type.includes("REFERRED")
      ? "Referred by:"
      : "Invited:";

    // TOdo(ns) no proper text for when user is invited with referral code, test that transaction one more time

    return (
      <View>
        <Card margin={"20 0 20 0"}>
          <View style={style.text}>
            <CelText>{text}</CelText>
          </View>
          {transaction.type !== TRANSACTION_TYPES.REFERRER_HODL ? (
            <View style={style.content}>
              {participant && !participant.profile_picture ? (
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
                  {formatter.hideTextExceptFirstNLetters(
                    participant.first_name
                  )}{" "}
                  {formatter.hideTextExceptFirstNLetters(participant.last_name)}
                </CelText>
                <CelText
                  style={style.textTwo}
                  color={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
                  type="H6"
                >
                  {participant.email
                    ? formatter.maskEmail(participant.email)
                    : null}
                </CelText>
              </View>
            </View>
          ) : null}
          {transaction.type.includes("HODL") && (
            <CelText style={{ marginTop: 20 }} type="H5">
              If {formatter.hideTextExceptFirstNLetters(participant.first_name)}{" "}
              keeps initial transfer until
              <CelText
                type="H5"
                color={getColor(COLOR_KEYS.HEADLINE)}
                weight="600"
              >{` ${moment(transaction.time).format("D MMM YYYY")} `}</CelText>
              , your referral reward will unlock.
            </CelText>
          )}
        </Card>
        {transaction.type.includes("PENDING") && (
          <Card>
            <CelText type="H5">
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
