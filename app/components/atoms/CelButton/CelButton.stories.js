import React from "react";
import { storiesOf } from "@storybook/react-native/dist";
import { action } from "@storybook/addon-actions";
import { ScrollView } from "react-native";
import CenterView from "../../../../storybook/stories/CenterView/index";

import CelButton from "../CelButton/CelButton";
import STYLES from "../../../constants/STYLES";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

storiesOf("CelButton", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add("CelButton states", () => (
    <ScrollView style={{ marginBottom: 30 }}>
      <StoryWrapper title="Default button">
        <CelButton onPress={action("tapped-default")}>Join Celsius</CelButton>
      </StoryWrapper>

      <StoryWrapper title="Default button with some margins">
        <CelButton margin="10 30 0 0" onPress={action("tapped-default")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Small button">
        <CelButton size={"small"} onPress={action("tapped-default-small")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Green button">
        <CelButton color={"green"} onPress={action("tapped-green")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Red button">
        <CelButton color={"red"} onPress={action("tapped-red")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="White button with colored text">
        <CelButton
          color={"white"}
          textColor={STYLES.COLORS.CELSIUS_BLUE}
          onPress={action("tapped-green")}
        >
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Disabled button">
        <CelButton disabled onPress={action("tapped-disabled")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Default button with icon on right">
        <CelButton
          iconRight="IconArrowRight"
          onPress={action("tapped-with-right-icon")}
        >
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Loading button">
        <CelButton loading onPress={action("tapped-loading")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Basic button">
        <CelButton basic onPress={action("tapped-basic")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>

      <StoryWrapper title="Ghost button">
        <CelButton ghost onPress={action("tapped-ghost")}>
          Join Celsius
        </CelButton>
      </StoryWrapper>
    </ScrollView>
  ));
