import { storiesOf } from "@storybook/react-native/dist";
import { Provider } from "react-redux";
import { View } from "react-native";
import React from "react";

import store from "../../../app/redux/store";
import StoryWrapper from "../../../app/components/atoms/StoryWrapper/StoryWrapper";
import CelText from "../../../app/components/atoms/CelText/CelText";
import STYLES from "../../../app/constants/STYLES";
import CenterView from "../CenterView";
import SVGS from "../../../app/constants/SVGS";
import Icon from "../../../app/components/atoms/Icon/Icon";

const colors = Object.keys(STYLES.COLORS);
const iconNames = Object.keys(SVGS).filter(name => !name.includes("ViewBox"));

storiesOf("Styleguide", module)
  .addDecorator(getStory => (
    <Provider store={store}>
      <CenterView>{getStory()}</CenterView>
    </Provider>
  ))
  .add("Colors", () => (
    <StoryWrapper title="Colors">
      {colors.map((c, i) => (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <CelText style={{ width: 30 }}>{i + 1}</CelText>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: STYLES.COLORS[c],
              marginRight: 5,
            }}
          />
          <View>
            <CelText>{c}</CelText>
            <CelText>{STYLES.COLORS[c]}</CelText>
          </View>
        </View>
      ))}
    </StoryWrapper>
  ))
  .add("Typography", () => (
    <StoryWrapper title="Typography">
      <CelText weight={"thin"}>Thin text</CelText>
      <CelText weight={"extra-light"}>Extra light text</CelText>
      <CelText weight={"light"}>Light text</CelText>
      <CelText weight={"regular"}>Regular text</CelText>
      <CelText weight={"medium"}>Medium text</CelText>
      <CelText weight={"semi-bold"}>Semi-bold text</CelText>
      <CelText weight={"bold"}>Bold text</CelText>
      <CelText weight={"black"}>Black text</CelText>
    </StoryWrapper>
  ))
  .add("Icons", () => (
    <StoryWrapper title="Icons">
      {iconNames.map((icon, i) => (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
        >
          <CelText style={{ width: 30 }}>{i + 1}</CelText>
          <Icon name={icon} width={30} height={30} />
          <CelText margin="0 0 0 10">{icon}</CelText>
        </View>
      ))}
    </StoryWrapper>
  ));
