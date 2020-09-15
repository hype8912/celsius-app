import React from "react";
import { View } from "react-native";
// eslint-disable-next-line import/no-unresolved
import { openInbox } from "react-native-email-link";

import CheckEmailInfoBoxStyle from "./CheckEmailInfoBox.styles";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";
import CelButton from "../CelButton/CelButton";
import InfoBox from "../InfoBox/InfoBox";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

const CheckEmailInfoBox = props => {
  const style = CheckEmailInfoBoxStyle(props.theme);

  return (
    <View style={style.container}>
      <InfoBox
        backgroundColor={getColor(COLOR_KEYS.ALERT_STATE)}
        padding={"20 30 20 10"}
      >
        <View style={style.direction}>
          <View style={style.circle}>
            <Icon
              name={"Mail"}
              height="20"
              width="20"
              fill={getColor(COLOR_KEYS.ALERT_STATE)}
            />
          </View>
          <CelText color={"white"} margin={"0 20 0 10"}>
            {props.infoText}
          </CelText>
        </View>

        <CelButton
          style={{ alignSelf: "flex-start" }}
          margin={"20 0 0 35"}
          color={"white"}
          size={"small"}
          textColor={getColor(COLOR_KEYS.ALERT_STATE)}
          onPress={() => openInbox()}
        >
          Check your Email!
        </CelButton>
      </InfoBox>
    </View>
  );
};

export default CheckEmailInfoBox;
