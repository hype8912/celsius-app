import React from "react";
import { View, Text, Platform } from "react-native";

import CelTextAreaStyle from "./CelTextArea.styles";
import Separator from "../Separator/Separator";
import CelInputText from "../../atoms/CelInput/CelInputText.js";

const CelTextArea = props => {
  const style = CelTextAreaStyle(props.theme);
  return (
    <View>
      <View style={style}>
        <CelInputText
          style={{
            height:
              Platform.OS === "android"
                ? props.numberOfLines * 40
                : props.numberOfLines * 35,
          }}
          {...props}
          multiline
        />
      </View>
      {props.emojis && (
        <View>
          <Separator color="#737A82" />
          <View
            style={{ height: 50, paddingVertical: 20, paaddingHorizontal: 20 }}
          >
            <Text> EMOJI </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CelTextArea;
