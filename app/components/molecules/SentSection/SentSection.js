import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";

import SentSectionStyle from "./SentSection.styles";
import Card from "../../atoms/Card/Card";
import CelText from "../../atoms/CelText/CelText";
import STYLES from "../../../constants/STYLES";
import Icon from "../../atoms/Icon/Icon";

class SentSection extends Component {
  static propTypes = {
    text: PropTypes.oneOf(["From", "Sent to"]).isRequired,
    transaction: PropTypes.instanceOf(Object),
  };
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      // initial state
    };

    // binders
  }

  render() {
    const style = SentSectionStyle();
    const { transaction, text } = this.props;

    const data = transaction.transfer_data;
    const participant =
      text === "From"
        ? transaction.transfer_data.sender
        : transaction.transfer_data.claimer;

    return (
      <View style={style.container}>
        <Card margin={"20 0 20 0"}>
          <View style={style.text}>
            <CelText
              style={{ color: STYLES.COLORS.MEDIUM_GRAY }}
            >{`${text}:`}</CelText>
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
                style={[style.image, ...STYLES.SHADOW_STYLES]}
              />
            )}
            {data && participant && (
              <View style={style.data}>
                <CelText weight="600" type="H4">
                  {participant.first_name} {participant.last_name}
                </CelText>
                <CelText
                  style={{ paddingTop: 5 }}
                  color={STYLES.COLORS.CELSIUS_BLUE}
                  type="H6"
                >
                  {participant.email ? participant.email : " "}
                </CelText>
              </View>
            )}
            <View style={style.icon}>
              <Icon
                name="Celsius"
                fill={STYLES.COLORS.CELSIUS_BLUE}
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

export default SentSection;
