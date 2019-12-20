import React from "react";
import { storiesOf } from "@storybook/react-native/dist";
import { ScrollView } from "react-native";
import CenterView from "../../../../storybook/stories/CenterView/index";

import StoryWrapper from "../StoryWrapper/StoryWrapper";
import CelText from "./CelText";

storiesOf("CelText", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("Typography", () => (
    <ScrollView style={{ marginBottom: 30 }}>
      <StoryWrapper>
        <CelText>Default text</CelText>
      </StoryWrapper>

      <StoryWrapper>
        <CelText type="H0">Heading 0</CelText>
        <CelText type="H1">Heading 1</CelText>
        <CelText type="H2">Heading 2</CelText>
        <CelText type="H3">Heading 3</CelText>
        <CelText type="H4">Heading 4</CelText>
        <CelText type="H5">Heading 5</CelText>
        <CelText type="H6">Heading 6</CelText>
        <CelText type="H7">Heading 7</CelText>
      </StoryWrapper>

      <StoryWrapper>
        <CelText weight={"thin"}>Thin text</CelText>
        <CelText weight={"extra-light"}>Extra light text</CelText>
        <CelText weight={"light"}>Light text</CelText>
        <CelText weight={"regular"}>Regular text</CelText>
        <CelText weight={"medium"}>Medium text</CelText>
        <CelText weight={"semi-bold"}>Semi-bold text</CelText>
        <CelText weight={"bold"}>Bold text</CelText>
        <CelText weight={"black"}>Black text</CelText>
      </StoryWrapper>

      <StoryWrapper>
        <CelText align={"auto"}>Align auto</CelText>
        <CelText align={"left"}>Align left</CelText>
        <CelText align={"right"}>Align right</CelText>
        <CelText align={"center"}>Align center</CelText>
        <CelText align={"justify"}>Align justify</CelText>
      </StoryWrapper>

      <StoryWrapper>
        <CelText italic>Italic Text</CelText>
        <CelText strikethrough>Stikethrough Text</CelText>
      </StoryWrapper>
    </ScrollView>
  ));
