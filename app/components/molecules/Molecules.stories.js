import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react-native/dist";
import store from "../../redux/store";
import CenterView from "../../../storybook/stories/CenterView";
import BannerStories from "./Banner/Banner.stories";
import RegisterToUCardStories from "./RegisterToUCard/RegisterToUCard.stories";
import RegisterPromoCodeCardStories from "./RegisterPromoCodeCard/RegisterPromoCodeCard.stories";

storiesOf("Molecules", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("Banner", BannerStories)
  .add("RegisterToUCard", RegisterToUCardStories)
  .add("RegisterPromoCodeCard", RegisterPromoCodeCardStories);
