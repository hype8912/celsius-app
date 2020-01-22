import React from "react";
import { Linking, View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../../redux/store";
import CenterView from "../../../../storybook/stories/CenterView";
import MultiInfoCardButton from "./MultiInfoCardButton";

storiesOf("MultiInfoCardButton", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))

  .add("MultiInfoCardButton", () => (
    <View style={{ marginBottom: 30 }}>
      <MultiInfoCardButton
        darkImage={require("../../../../assets/images/icons/help-center-dark.png")}
        lightImage={require("../../../../assets/images/icons/help-center.png")}
        textButton={"Help Center"}
        explanation={"Check answers to most common questions."}
        onPress={() =>
          Linking.openURL("https://support.celsius.network/hc/en-us")
        }
      />
    </View>
  ))



