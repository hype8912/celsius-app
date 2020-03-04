import React from "react";

import StoryWrapper from "../StoryWrapper/StoryWrapper";
import SecurityScoreGauge from "./SecurityScoreGauge";

const SecurityScoreGaugeStories = () => (
  <StoryWrapper title="SecurityStrengthMeter">
    <StoryWrapper title="Weak">
      <SecurityScoreGauge level={"1"} />
    </StoryWrapper>

    <StoryWrapper title="Fair">
      <SecurityScoreGauge level={"2"} />
    </StoryWrapper>

    <StoryWrapper title="Good">
      <SecurityScoreGauge level={"3"} />
    </StoryWrapper>

    <StoryWrapper title="Strong">
      <SecurityScoreGauge level={"4"} />
    </StoryWrapper>
  </StoryWrapper>
);

export default SecurityScoreGaugeStories;
