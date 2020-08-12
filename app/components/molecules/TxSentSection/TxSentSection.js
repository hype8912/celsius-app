import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import SentSectionStyle from "./TxSentSection.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

class TxSentSection extends Component {
  static propTypes = {
    text: PropTypes.oneOf(["From", "Sent to"]).isRequired,
    transaction: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  render() {
    const style = SentSectionStyle();
    const { transaction, text } = this.props;

    const data = transaction.transfer_data;
    const participant = text === "Received from:" ? data.sender : data.claimer;

    if (!participant) return null;

    return (
      <View>
        <Card margin={"20 0 20 0"}>
          <View style={style.text}>
            <CelText>{`${text}`}</CelText>
          </View>
          <View style={style.content}>
            {!data || !participant || !participant.profile_picture ? (
              <Image
                source={require("../../../../assets/images/empty-profile/empty-profile.png")}
                style={[style.image]}
              />
            ) : (
              <Image
                source={{ uri: participant.profile_picture }}
                style={[style.image, STYLES.SHADOW_STYLES]}
              />
            )}
            {data && participant && (
              <View style={style.data}>
                <CelText weight="600" type="H4">
                  {participant.first_name} {participant.last_name}
                </CelText>
                <CelText
                  style={{ paddingTop: 5 }}
                  color={getColor(COLOR_KEYS.LINK)}
                  type="H6"
                >
                  {participant.email ? participant.email : " "}
                </CelText>
              </View>
            )}
            <View style={style.icon}>
              <Icon
                name="Celsius"
                fill={COLOR_KEYS.LINK}
                height={30}
                width={30}
              />
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

export default TxSentSection;
