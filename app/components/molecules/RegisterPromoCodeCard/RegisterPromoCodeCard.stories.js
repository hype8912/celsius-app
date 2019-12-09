import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../../redux/store";
import { openModal } from "../../../redux/ui/uiActions";
import CenterView from "../../../../storybook/stories/CenterView";
import RegisterPromoCodeCard from "./RegisterPromoCodeCard";

storiesOf("RegisterPromoCodeCard", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("with promoCode", () => (
    <View>
      <RegisterPromoCodeCard
        promoCode="Hello World"
        openModal={store.dispatch(openModal)}
      />
    </View>
  ))
  .add("without promoCode", () => (
    <View>
      <RegisterPromoCodeCard openModal={store.dispatch(openModal)} />
    </View>
  ));
