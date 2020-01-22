import React from "react";

import DotsBar from "../DotsBar/DotsBar";
import StoryWrapper from "../StoryWrapper/StoryWrapper";

const DotsBarStories = () => (
  // Unused component
  <StoryWrapper title="DotsBar">
    <StoryWrapper title="Default state">
      <DotsBar length={3} currentStep={1} />
    </StoryWrapper>
  </StoryWrapper>
);

export default DotsBarStories;
