import React from "react";
import { View } from "react-native";

import CheckEmailInfoBoxStyle from "./CheckEmailInfoBox.styles";
import Icon from "../Icon/Icon";
import CelText from "../CelText/CelText";
import InfoBox from "../InfoBox/InfoBox";
import { COLOR_KEYS } from "../../../constants/COLORS";
import { getColor } from "../../../utils/styles-util";

const CheckEmailInfoBox = props => {
  const style = CheckEmailInfoBoxStyle(props.theme);

  return (
    <View style={style.container}>
      <InfoBox
        backgroundColor={getColor(COLOR_KEYS.PRIMARY_BUTTON)}
        padding={"20 30 20 10"}
      >
        <View style={style.direction}>
          <View style={style.circle}>
            <Icon
              name={"Mail"}
              height="20"
              width="20"
              fill={COLOR_KEYS.ALERT_STATE}
            />
          </View>
          <CelText color={"white"} margin={"0 20 0 10"}>
            {props.infoText}
          </CelText>
        </View>
      </InfoBox>
    </View>
  );
};

export default CheckEmailInfoBox;
