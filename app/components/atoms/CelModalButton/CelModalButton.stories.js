import React from "react";
import { View } from "react-native";

import CelModalButton from "../CelModalButton/CelModalButton";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const CelModalButtonStories = () => (
  <StoryWrapper title="CelModalButton">
    <StoryWrapper title="Default state">
      <StoryWrapper>
        <CelModalButton>Basic Button (default)</CelModalButton>
      </StoryWrapper>
      <StoryWrapper>
        <CelModalButton buttonStyle={"secondary"}>
          Secondary Button
        </CelModalButton>
      </StoryWrapper>
      <StoryWrapper>
        <CelModalButton buttonStyle={"disabled"}>
          Disabled Button
        </CelModalButton>
      </StoryWrapper>
      <StoryWrapper>
        <CelModalButton buttonStyle={"red"}>Red Button</CelModalButton>
      </StoryWrapper>
      <StoryWrapper>
        <CelModalButton buttonStyle={"green"}>Green Button</CelModalButton>
      </StoryWrapper>
      <StoryWrapper>
        <CelModalButton buttonStyle={"white"}>White Button</CelModalButton>
      </StoryWrapper>
      <StoryWrapper>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <CelModalButton position={"left"}>Left</CelModalButton>
          <CelModalButton position={"middle"}>Middle</CelModalButton>
          <CelModalButton position={"right"}>Right</CelModalButton>
        </View>
      </StoryWrapper>
    </StoryWrapper>
  </StoryWrapper>
);

export default CelModalButtonStories;
