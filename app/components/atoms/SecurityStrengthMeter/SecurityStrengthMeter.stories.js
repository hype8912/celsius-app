import React from "react";

import StoryWrapper from "../StoryWrapper/StoryWrapper";
import SecurityStrengthMeter from "./SecurityStrengthMeter";

const SecurityStrengthMeterStories = () => (
  <StoryWrapper title="SecurityStrengthMeter">
    <StoryWrapper title="Weak">
      <SecurityStrengthMeter level={"1"} />
    </StoryWrapper>

    <StoryWrapper title="Fair">
      <SecurityStrengthMeter level={"2"} />
    </StoryWrapper>

    <StoryWrapper title="Good">
      <SecurityStrengthMeter level={"3"} />
    </StoryWrapper>

    <StoryWrapper title="Strong">
      <SecurityStrengthMeter level={"4"} />
    </StoryWrapper>
  </StoryWrapper>
);

export default SecurityStrengthMeterStories;
