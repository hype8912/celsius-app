import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../../redux/store";
import { updateFormField } from "../../../redux/forms/formsActions";
import CenterView from "../../../../storybook/stories/CenterView";
import RegisterToUCard from "./RegisterToUCard";
import CelText from "../../atoms/CelText/CelText";

storiesOf("RegisterToUCard", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("ToU on & off", () => (
    <View>
      <View style={{ marginBottom: 10 }}>
        <CelText margin="0 0 5 0">ToU checked</CelText>
        <RegisterToUCard termsOfUse updateFormField={updateFormField} />
      </View>
      <View style={{ marginBottom: 10 }}>
        <CelText margin="0 0 5 0">ToU unchecked</CelText>
        <RegisterToUCard updateFormField={updateFormField} />
      </View>
    </View>
  ));
