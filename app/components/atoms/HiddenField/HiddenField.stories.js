import React from "react";

import HiddenField from "../HiddenField/HiddenField";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const HiddenFieldStories = () => (
  <StoryWrapper title="HiddenField">
    <StoryWrapper title="Default state">
      <HiddenField value={"1234"} length={4} />
    </StoryWrapper>
    <StoryWrapper title="Error entering">
      <HiddenField value={"1234"} length={4} error />
    </StoryWrapper>
  </StoryWrapper>
);

export default HiddenFieldStories;
