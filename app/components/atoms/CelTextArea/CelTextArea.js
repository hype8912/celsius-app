import React from "react";
import { View, Platform } from "react-native";

import CelTextAreaStyle from "./CelTextArea.styles";
import CelInputText from "../../atoms/CelInput/CelInputText.js";

const CelTextArea = props => {
  const style = CelTextAreaStyle();
  const {numberOfLines} = props
  return (
    <View>
      <View style={style}>
        <CelInputText
          style={{
            height:
              Platform.OS === "android"
                ? numberOfLines * 40
                : numberOfLines * 35,
          }}
          {...props}
          multiline
        />
      </View>
    </View>
  );
};

export default CelTextArea;
