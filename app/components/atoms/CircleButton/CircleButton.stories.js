import React from "react";

import CircleButton from "../CircleButton/CircleButton";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const CircleButtonStories = () => (
  <StoryWrapper title="CircleButton">
    <StoryWrapper title="Default state">
      <CircleButton />
    </StoryWrapper>
    <StoryWrapper title="With Icon">
      <CircleButton icon={"Checked"} iconSize={15} />
    </StoryWrapper>
    <StoryWrapper title="With Text">
      <CircleButton text={"Text"} />
    </StoryWrapper>
    <StoryWrapper title="Disabled">
      <CircleButton disabled />
    </StoryWrapper>
    <StoryWrapper title="Selectable - not selected">
      <CircleButton selectable isSelected={false} />
    </StoryWrapper>
  </StoryWrapper>
);

export default CircleButtonStories;
